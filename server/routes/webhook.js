const express = require("express");
const Stripe = require("stripe");
const { eq, and } = require("drizzle-orm");

const { db } = require("../db");
const { orders } = require("../db/schema");

const router = express.Router();

// STRIPE-CHECKOUT: Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// STRIPE-CHECKOUT: Receive and verify payment events
router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["stripe-signature"];

    let event;

    try {
      // Verify that the event genuinely came from Stripe
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (error) {
      console.error("Stripe webhook verification failed:", error.message);
      return res.status(400).send("Invalid webhook signature");
    }

    try {
      // STRIPE-CHECKOUT: Process successful payments only
      if (
        event.type === "checkout.session.completed" ||
        event.type === "checkout.session.async_payment_succeeded"
      ) {
        const session = event.data.object;

        if (session.payment_status !== "paid") {
          return res.json({ received: true });
        }

        const orderId = Number(session.metadata?.orderId);

        if (!Number.isSafeInteger(orderId) || orderId <= 0) {
          console.error("Invalid order ID in Stripe session");
          return res.status(400).json({ error: "Invalid order ID" });
        }

        // STRIPE-CHECKOUT: Confirm session and payment details
        // match the original order before marking it paid.
        const [order] = await db
          .select()
          .from(orders)
          .where(eq(orders.id, orderId))
          .limit(1);

        if (!order) {
          console.error("Stripe webhook: order not found", orderId);
          return res.status(400).json({ error: "Order not found" });
        }

        if (
          order.stripeSessionId !== session.id ||
          order.totalCents !== session.amount_total ||
          order.currency.toLowerCase() !== session.currency?.toLowerCase() ||
          String(order.userId) !== session.metadata?.userId ||
          session.mode !== "payment"
        ) {
          console.error("Stripe webhook: payment details mismatch", orderId);
          return res.status(400).json({
            error: "Payment details mismatch",
          });
        }

        // STRIPE-CHECKOUT: Idempotent update
        // Duplicate webhook events cannot pay the order twice.
        await db
          .update(orders)
          .set({
            status: "paid",
            paidAt: new Date(),
          })
          .where(and(eq(orders.id, orderId), eq(orders.status, "pending")));

        console.log(`Stripe payment confirmed for order ${orderId}`);
      }

      return res.json({ received: true });
    } catch (error) {
      console.error("Stripe webhook processing failed:", error);
      return res.status(500).json({
        error: "Webhook processing failed",
      });
    }
  },
);

module.exports = router;
