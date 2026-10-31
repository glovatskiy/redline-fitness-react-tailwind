
# 🔴 REDLINE Fitness

### TRAIN IN A DIFFERENT LIGHT.

A fully responsive, full-stack fitness studio web application built with **React, JavaScript, Tailwind CSS v4, Node.js, Express, PostgreSQL, and Stripe**.

REDLINE Fitness is a fictional premium boutique fitness studio concept based in Prague, Czech Republic. The project combines cinematic UI design with interactive frontend features, REST API integration, database-driven content, session-based authentication, and Stripe payment integration.

Developed as part of an **AI-Assisted Frontend Development Practicum**, the project evolved from a static HTML/CSS website into a deployed full-stack React application with authenticated membership checkout.

**[🌐 Live Demo](https://redline-fitness-react-tailwind.vercel.app)** | **[💻 GitHub Repository](https://github.com/glovatskiy/redline-fitness-react-tailwind)** | **[🧪 Test Cases](https://github.com/glovatskiy/redline-fitness-react-tailwind/blob/main/TEST_CASES.md)**

---

## 📸 Project Preview

<table>
  <tr>
    <th width="50%">DEFAULT MODE</th>
    <th width="50%">RED ROOM MODE</th>
  </tr>
  <tr>
    <td align="center" valign="top">
      <img src="./client/src/assets/images/redline-fitness.png" alt="REDLINE Fitness — Default Mode" width="100%" />
    </td>
    <td align="center" valign="top">
      <img src="./client/src/assets/images/redline-fitness-redroom-mode.png" alt="REDLINE Fitness — RED ROOM Mode" width="100%" />
    </td>
  </tr>
</table>

<p align="center">
  <em>Two distinct visual experiences. One REDLINE identity.</em>
</p>

---

## ✨ Key Features

### 💳 Stripe Checkout & Membership Purchases

Authenticated users can purchase fitness memberships through **Stripe Checkout in test mode**.

- Membership plans retrieved from the PostgreSQL database.
- Authentication required before initiating checkout.
- Secure Stripe-hosted Checkout page.
- Backend-generated Stripe Checkout Sessions.
- Pending orders created before payment.
- Stripe webhook integration for payment confirmation.
- Webhook signature verification.
- Order status updated after successful payment.
- Membership purchase information stored in PostgreSQL.
- Payment success page with server-side verification.
- Purchased membership displayed in the navigation header.
- Membership information available on desktop and inside the mobile navigation menu.
- Payment flow tested on desktop and iPhone Safari.

**Payment processing uses Stripe's sandbox environment. No real payments are collected.**

### 🔐 Authentication & Session Management

Session-based authentication implemented using React and Express.

- User registration and login.
- Backend authentication endpoints.
- Password hashing.
- Server-side session management.
- PostgreSQL-backed session storage.
- HTTP-only session cookies.
- Persistent authentication after page refresh.
- Logout functionality.
- Authentication state synchronized with the frontend.
- Same-origin API requests through Vercel rewrites in production.
- Safari-compatible session handling without relying on third-party cookies.

### 📅 Database-Driven Training Schedule

Fitness classes are retrieved from a PostgreSQL database through an Express REST API.

- 12 fitness classes stored in Neon PostgreSQL.
- Dynamic class loading using the Fetch API.
- Asynchronous data fetching and React state management.
- TODAY and TOMORROW schedule controls.
- Filtering by training intensity.
- Class information, schedules, and availability indicators.
- Responsive class cards.
- Backend and database integration using Drizzle ORM.

### 🔴 RED ROOM — Signature Theme Switcher

An alternative visual mode that transforms the website's appearance.

- Default dark theme and immersive RED ROOM mode.
- React state-driven theme switching.
- Dynamic backgrounds, accent colors, and surface styling.
- Red glow effects and smooth transitions.
- Consistent theme behavior across components.
- Compact toggle control on mobile devices.

### 📸 FIND YOUR RED — Interactive Photo Experience

A client-side image processing feature using native browser APIs.

- Upload images from a local device.
- Instant preview with a cinematic red-light effect.
- Image processing using the HTML Canvas API.
- Download the processed image as a PNG.
- Remove and replace uploaded images.
- Temporary object URL cleanup using React effects.
- No backend processing or image storage required.

### 📱 Responsive UI & Interactive Components

- Responsive desktop, tablet, and mobile layouts.
- Mobile hamburger navigation with horizontal navigation links.
- Username and purchased membership displayed in the mobile menu.
- Trainer profiles and specializations.
- Membership pricing cards with Stripe Checkout integration.
- Cinematic hero section and animated ticker.
- Reusable React components.
- Dynamic rendering with JavaScript arrays and `.map()`.
- Semantic HTML and accessibility attributes.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript ES6+, Vite |
| Styling | Tailwind CSS v4, CSS3, CSS Grid, Flexbox |
| Backend | Node.js, Express.js |
| Database | PostgreSQL (Neon) |
| ORM | Drizzle ORM |
| Authentication | Express sessions, PostgreSQL session store, HTTP-only cookies, password hashing |
| Payments | Stripe Checkout, Stripe Webhooks (test mode) |
| Browser APIs | Fetch API, Canvas API, File API, Blob API |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Version Control | Git, GitHub |
| API Testing | Postman |
| Test Documentation | Manual functional test cases |

---

## 🏗️ Application Architecture

```text
                 USER / BROWSER
                        |
                        v
                  REACT FRONTEND
                 Vercel Deployment
                        |
                        v
               VERCEL API REWRITES
                /api/* proxy routing
                        |
                        v
                 EXPRESS REST API
                 Render Deployment
                        |
           +------------+------------+
           |                         |
           v                         v
     DRIZZLE ORM                STRIPE API
           |                         |
           v                         v
     NEON POSTGRESQL          STRIPE CHECKOUT
           ^                         |
           |                         |
           +------ STRIPE WEBHOOK <--+
                  Payment confirmation
```

**Frontend:** React handles rendering, user interactions, authentication state, class filtering, membership selection, and client-side image processing.

**Backend:** Express provides REST API endpoints, authentication, session management, Stripe Checkout Session creation, and webhook processing.

**Database:** Neon PostgreSQL stores fitness classes, user accounts, sessions, membership plans, orders, and order items.

**Payments:** Stripe processes sandbox checkout payments. The backend verifies webhook signatures and updates payment records in PostgreSQL.

**API Proxy:** Vercel forwards frontend `/api/*` requests to the Express backend on Render. This allows the browser to make same-origin API requests, improving cookie compatibility with Safari.

### API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Check API availability |
| `/api/classes` | GET | Retrieve fitness classes |
| `/api/auth/me` | GET | Retrieve authenticated user |
| `/api/auth/logout` | POST | End authenticated session |
| `/api/checkout` | POST | Create Stripe Checkout Session |
| `/api/checkout/status` | GET | Verify checkout status for the authenticated user |
| `/api/checkout/my-membership` | GET | Retrieve user's latest paid membership |
| `/api/stripe/webhook` | POST | Receive and verify Stripe payment events |

Registration, login, and membership retrieval are handled through additional Express API routes.

**[API Health Check](https://redline-fitness-api.onrender.com/api/health)** | **[Classes API](https://redline-fitness-api.onrender.com/api/classes)**

---

## 💳 Stripe Payment Flow

The application implements a backend-driven membership purchase workflow.

```text
USER SELECTS MEMBERSHIP
          |
          v
CHECK AUTHENTICATION
          |
          v
POST /api/checkout
          |
          v
CREATE PENDING ORDER
     PostgreSQL
          |
          v
CREATE STRIPE CHECKOUT SESSION
          |
          v
REDIRECT TO STRIPE CHECKOUT
          |
          v
COMPLETE TEST PAYMENT
          |
          +------------------------+
          |                        |
          v                        v
   STRIPE WEBHOOK          CHECKOUT SUCCESS PAGE
          |                        |
          v                        v
VERIFY WEBHOOK SIGNATURE   VERIFY CHECKOUT STATUS
          |
          v
UPDATE ORDER STATUS
     PostgreSQL
          |
          v
USER MEMBERSHIP AVAILABLE
     IN ACCOUNT HEADER
```

### Payment Implementation

1. An authenticated user selects a membership plan.
2. React sends a checkout request to the Express backend.
3. The backend creates a pending order in PostgreSQL.
4. Stripe creates a hosted Checkout Session.
5. The browser redirects to Stripe Checkout.
6. The user completes a sandbox payment.
7. Stripe sends a payment event to the backend webhook.
8. The backend validates the webhook signature and updates the order.
9. The frontend verifies checkout status and retrieves the purchased membership.
10. The membership appears alongside the user's account information.

The Stripe webhook provides the authoritative payment confirmation. The frontend success page does not independently mark orders as paid.

### Stripe Test Mode

Stripe is configured for educational and demonstration purposes.

- Test-mode API credentials.
- Stripe-hosted payment interface.
- Test card transactions.
- Webhook-based payment verification.
- No live charges or real payment processing.

**Example Stripe test card:**

```text
Card number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any valid three digits
```

Use test card details only. Never enter real payment card information for this demo.

---

## 🧪 Testing & Quality Assurance

Functional test cases were prepared to verify the application's original core features: authentication, API/database integration, and client-side image processing.

Additional manual verification was performed for the Stripe membership checkout workflow.

### Test Coverage

| Test Suite | Focus |
|---|---|
| TC-01 — Authentication | Login, invalid credentials, session persistence, logout |
| TC-02 — REST API & Database | Health checks, class retrieval, schedule filtering, error handling |
| TC-03 — Find Your Red | Image uploads, previews, PNG downloads, invalid files |
| Stripe Checkout — Manual Verification | Membership selection, authentication requirement, sandbox payment, payment confirmation |
| Mobile Browser Verification | Safari authentication, session cookies, checkout redirect |

The documented test scenarios cover:

- Positive and negative functional testing.
- Frontend/backend integration.
- API and database communication.
- Session persistence.
- Client-side image processing.
- Input validation and error handling.

Stripe integration was additionally checked through sandbox payments and the deployed application.

**API requests can be tested using Postman**, while frontend functionality can be verified directly in the browser.

Test cases are documented separately, with execution results recorded after verification.

### [📋 View Functional Test Cases — TEST_CASES.md](https://github.com/glovatskiy/redline-fitness-react-tailwind/blob/main/TEST_CASES.md)

---

## 🎨 Design System

The REDLINE visual identity emphasizes intensity, confidence, and minimalism.

### Typography

- **Bebas Neue** — branding, headings, editorial typography.
- **Inter** — body text, navigation, and interface labels.

### Color Palette

| Color | Hex | Purpose |
|---|---|---|
| REDLINE Red | `#C40000` | Primary accent |
| RED ROOM Red | `#FF0000` | Alternative theme |
| Background | `#121212` | Main background |
| Surface | `#1E1E1E` | Cards and surfaces |
| Ivory | `#F5F5F1` | Primary text |
| Muted Gray | `#A0A0A0` | Secondary text |

Tailwind CSS v4 design tokens provide consistent typography and colors throughout the application.

---

## 📂 Project Structure

```text
redline-fitness-react-tailwind/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Trainers.jsx
│   │   │   ├── Classes.jsx
│   │   │   ├── Membership.jsx
│   │   │   ├── AuthModal.jsx
│   │   │   ├── FindYourRed.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vercel.json
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── db/
│   │   └── session.js
│   ├── index.js
│   └── package.json
│
├── TEST_CASES.md
└── README.md
```

*Simplified project structure highlighting the main application files.*

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git
- PostgreSQL database connection (Neon or compatible PostgreSQL)
- Stripe account with test-mode API credentials

### 1. Clone the Repository

```bash
git clone https://github.com/glovatskiy/redline-fitness-react-tailwind.git
cd redline-fitness-react-tailwind
```

### 2. Configure the Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
NODE_ENV=development

STRIPE_SECRET_KEY=your_stripe_test_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_signing_secret
```

Additional checkout configuration may be required depending on the backend's environment settings.

Never commit `.env` files or Stripe secret keys to Git.

Start the backend:

```bash
node index.js
```

The Express API runs locally on:

```text
http://localhost:5001
```

The backend connects to PostgreSQL using the configured database connection.

### 3. Configure the Frontend

Open another terminal:

```bash
cd client
npm install
```

In local development, the frontend uses:

```javascript
const API_URL = import.meta.env.DEV
  ? "http://localhost:5001"
  : "";
```

The local API URL is configured in the React source code. A `VITE_API_URL` environment variable is not required for the current implementation.

Start the frontend:

```bash
npm run dev
```

Open the local Vite URL, typically:

```text
http://localhost:5173
```

### 4. Local Stripe Webhook Testing

Stripe webhook events must reach the backend to confirm payments.

For local development, Stripe CLI can forward test events to the Express server:

```bash
stripe listen --forward-to localhost:5001/api/stripe/webhook
```

Use the webhook signing secret provided by Stripe CLI for your local `STRIPE_WEBHOOK_SECRET`.

The production Stripe webhook must point directly to the Render backend endpoint, not the Vercel frontend.

### 5. Production Build

From the `client/` directory:

```bash
npm run build
```

Vite generates the production build in `dist/`.

---

## ☁️ Deployment

The application is deployed using three cloud services, with Stripe providing payment infrastructure.

| Service | Responsibility |
|---|---|
| Vercel | Hosts React frontend and proxies API requests |
| Render | Hosts Express REST API and Stripe webhook |
| Neon | Hosts PostgreSQL database |
| Stripe | Provides test-mode Checkout and payment events |

### Production Configuration

**Frontend (Vercel)**

The frontend uses same-origin API requests through `client/vercel.json`.

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://redline-fitness-api.onrender.com/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Production requests to `/api/*` are forwarded to the Express backend.

This configuration helps avoid cross-site cookie restrictions in browsers such as Safari.

**Backend (Render)**

Required environment configuration includes:

```env
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
NODE_ENV=production

STRIPE_SECRET_KEY=your_stripe_test_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_signing_secret
```

The backend uses secure HTTP-only cookies in production with `SameSite=Lax`.

**Stripe Webhook**

The production webhook endpoint is:

```text
https://redline-fitness-api.onrender.com/api/stripe/webhook
```

The webhook signing secret must match the configured Stripe endpoint.

**Note:** The Render free-tier backend may take additional time to respond after a period of inactivity.

---

## 💡 Development Process

The project was developed as part of an **AI-Assisted Frontend Development Practicum**.

### 1. Planning & UI/UX

- Defined the REDLINE Fitness concept.
- Designed the visual identity and page structure.
- Explored UI concepts using UX Pilot.
- Planned responsive layouts and interactive features.

### 2. Frontend Development

- Migrated the original HTML/CSS website to React.
- Implemented reusable components with Tailwind CSS.
- Added RED ROOM theme switching.
- Built interactive training schedules.
- Developed the FIND YOUR RED photo processing feature.
- Implemented membership selection and checkout redirects.
- Improved mobile navigation and account information display.

### 3. Backend & Database Integration

- Created an Express REST API.
- Connected the application to Neon PostgreSQL.
- Integrated Drizzle ORM for database access.
- Implemented session-based authentication.
- Connected the React frontend to backend endpoints.
- Added membership, order, and order-item database tables.

### 4. Stripe Payment Integration

- Integrated Stripe Checkout in test mode.
- Implemented backend Checkout Session creation.
- Created pending orders before payment.
- Added a Stripe webhook endpoint.
- Implemented webhook signature verification.
- Connected payment confirmation to PostgreSQL order updates.
- Added checkout success verification and purchased membership display.

### 5. Testing & Refinement

- Prepared structured functional test cases.
- Verified API connectivity and database-backed class retrieval.
- Tested authentication and session persistence.
- Tested Stripe sandbox checkout.
- Verified checkout behavior on desktop and iPhone Safari.
- Reviewed responsive layouts and interactive features.
- Used browser DevTools and Postman for debugging and API inspection.

### 6. Deployment & Version Control

- Managed source code using Git and GitHub.
- Deployed the frontend to Vercel.
- Deployed the backend to Render.
- Configured production environment variables.
- Connected the deployed application to Neon PostgreSQL.
- Configured Vercel API rewrites for same-origin authentication.
- Configured Stripe webhooks for payment confirmation.

### AI-Assisted Development

AI tools supported design exploration, architecture planning, implementation guidance, debugging, code review, and troubleshooting.

The project demonstrates a practical workflow combining frontend fundamentals, full-stack development, payment integration, and AI-assisted engineering.

---

## 🔮 Future Improvements

- [x] Implement membership checkout using Stripe test mode.
- [x] Add payment confirmation through Stripe webhooks.
- [x] Store membership purchases and orders in PostgreSQL.
- [x] Display purchased membership information for authenticated users.
- [x] Improve mobile Safari authentication compatibility.
- [ ] Implement a complete class booking workflow.
- [ ] Add booking management for authenticated users.
- [ ] Add membership renewal and expiration management.
- [ ] Add purchase history and order details to user accounts.
- [ ] Add automated unit and component tests using Vitest and React Testing Library.
- [ ] Add end-to-end tests using Playwright.
- [ ] Expand accessibility testing.
- [ ] Improve performance and image loading.
- [ ] Extend the application with additional account features.

---

## 📌 Project Status

**Full-Stack Application — Deployed**

REDLINE Fitness includes:

- Responsive React frontend.
- Express REST API.
- Neon PostgreSQL integration.
- Session-based authentication.
- Database-driven fitness classes.
- Stripe Checkout integration in test mode.
- Webhook-based payment confirmation.
- PostgreSQL membership and order tracking.
- Purchased membership display in the navigation.
- Interactive theme switching and class filtering.
- Client-side photo processing.
- Documented functional test cases.
- Production deployment using Vercel, Render, and Neon.

**This is an educational and portfolio project.** Stripe Checkout operates exclusively in test mode. No real payments are collected, and a complete class booking workflow has not yet been implemented.

---

## 👨‍💻 Author

**Vladislav Glovatskiy**

Frontend Developer | React · JavaScript · Node.js

[GitHub](https://github.com/glovatskiy)

---

<p align="center">
  <strong>🔴 TRAIN IN A DIFFERENT LIGHT.</strong>
</p>
