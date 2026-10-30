const express = require("express");
const Stripe = require("stripe");
const { eq } = require("drizzle-orm");

const { db } = require("../db");
const { memberships, orders, orderItems } = require("../db/schema");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/checkout
router.post("/", async (req, res) => {
  try {
    // Only authenticated users can purchase memberships.
    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Please log in to purchase a membership",
      });
    }

    const { membershipId } = req.body || {};

    if (!Number.isInteger(membershipId) || membershipId <= 0) {
      return res.status(400).json({
        error: "A valid membershipId is required",
      });
    }

    // Always retrieve the actual price from the database.
    const [membership] = await db
      .select()
      .from(memberships)
      .where(eq(memberships.id, membershipId))
      .limit(1);

    if (!membership) {
      return res.status(404).json({
        error: "Membership not found",
      });
    }

    // Create a pending order linked to the logged-in user.
    const [order] = await db
      .insert(orders)
      .values({
        userId,
        status: "pending",
        totalCents: membership.priceCents,
        currency: membership.currency,
      })
      .returning({ id: orders.id });

    // Record the purchased membership and its price.
    await db.insert(orderItems).values({
      orderId: order.id,
      membershipId: membership.id,
      name: membership.name,
      quantity: 1,
      unitPriceCents: membership.priceCents,
    });

    const frontendUrl = (
      process.env.FRONTEND_URL || "http://localhost:5173"
    ).replace(/\/$/, "");

    // Stripe hosts the payment form.
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: String(order.id),
      metadata: {
        orderId: String(order.id),
        userId: String(userId),
      },
      line_items: [
        {
          price_data: {
            currency: membership.currency,
            unit_amount: membership.priceCents,
            product_data: {
              name: membership.name,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${frontendUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/#membership`,
    });

    // Associate the Stripe session with our pending order.
    await db
      .update(orders)
      .set({ stripeSessionId: checkoutSession.id })
      .where(eq(orders.id, order.id));

    res.json({
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Checkout creation failed:", error);
    res.status(500).json({
      error: "Could not start checkout",
    });
  }
});

module.exports = router;
