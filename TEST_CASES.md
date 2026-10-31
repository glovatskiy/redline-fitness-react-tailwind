
# REDLINE Fitness — Functional Test Cases

**Project:** REDLINE Fitness — Full-Stack Web Application  
**Test Type:** Manual Functional, Integration, Security & Compatibility Testing  
**Environment:** Production Deployment — Stripe Test Mode  
**Frontend:** React, Vite, Tailwind CSS — Vercel  
**Backend:** Node.js, Express — Render  
**Database:** PostgreSQL — Neon  
**Payment Integration:** Stripe Checkout & Webhooks  

---

## TC-01 — Authentication & Session Management

**Objective:** Verify user authentication, registration, error handling, and session persistence.

| ID | Test Scenario | Expected Result |
|---|---|---|
| AUTH-01 | Log in with valid credentials | Login succeeds; UI reflects authenticated state |
| AUTH-02 | Log in with an incorrect password | Login is rejected; appropriate error appears |
| AUTH-03 | Refresh the page after login | User remains authenticated |
| AUTH-04 | Log out | Session ends; UI returns to logged-out state |
| AUTH-05 | Submit empty login fields | Validation prevents invalid submission |
| AUTH-06 | Register with valid user information | Account is created successfully |
| AUTH-07 | Attempt registration with an existing account | Duplicate registration is rejected |
| AUTH-08 | Access an authenticated endpoint without login | Backend returns HTTP 401 |
| AUTH-09 | Log in and navigate between pages | Authentication state remains consistent |

**Technical coverage:** React state, Express authentication endpoints, password hashing, HTTP-only cookies, PostgreSQL-backed sessions, authentication middleware.

---

## TC-02 — REST API & Database Integration

**Objective:** Verify that fitness classes are retrieved correctly from PostgreSQL and filtered through the frontend.

| ID | Test Scenario | Expected Result |
|---|---|---|
| API-01 | Send GET request to `/api/health` | HTTP 200; API status is `ok` |
| API-02 | Send GET request to `/api/classes` | HTTP 200; JSON containing 12 fitness classes |
| API-03 | Load class schedule on the website | Classes appear correctly |
| API-04 | Filter classes by MON | Only Monday classes appear |
| API-05 | Filter classes by TUE | Only Tuesday classes appear |
| API-06 | Filter by intensity | Only matching classes appear |
| API-07 | Filter by day and intensity together | Results satisfy both filters |
| API-08 | Simulate an unavailable API | User-friendly error message appears |
| API-09 | Refresh the class schedule page | Classes are retrieved again successfully |
| API-10 | Access classes through the Vercel API proxy | Request succeeds using the frontend domain |

**Technical coverage:** Fetch API, asynchronous requests, REST endpoints, Express, Drizzle ORM, PostgreSQL, React state management, error handling, Vercel rewrites.

---

## TC-03 — Find Your Red: Image Processing

**Objective:** Verify client-side image upload, visual effects, downloading, and cleanup.

| ID | Test Scenario | Expected Result |
|---|---|---|
| IMG-01 | Upload a valid JPG image | Image preview appears with red effect |
| IMG-02 | Upload a valid PNG image | Image preview appears with red effect |
| IMG-03 | Download the processed image | PNG file downloads successfully |
| IMG-04 | Open the downloaded image | Red filter is applied to the image |
| IMG-05 | Remove uploaded image | Preview disappears; upload interface resets |
| IMG-06 | Upload another image after removal | New image is displayed correctly |
| IMG-07 | Attempt to upload an unsupported file type | File is rejected by validation |

**Technical coverage:** React `useState`, `useRef`, `useEffect`, File API, Canvas API, Blob API, CSS gradients, object URL cleanup.

---

## TC-04 — Stripe Checkout & Membership Purchases

**Objective:** Verify authenticated membership purchases, Stripe Checkout integration, payment confirmation, and error handling.

**Environment:** Production deployment with Stripe Test Mode.

| ID | Test Scenario | Expected Result |
|---|---|---|
| PAY-01 | Select a membership while logged out | Checkout is blocked; user is prompted to log in |
| PAY-02 | Select a membership while logged in | Stripe Checkout Session is created |
| PAY-03 | Click SELECT PLAN | Browser redirects to Stripe-hosted Checkout |
| PAY-04 | Complete payment using a valid Stripe test card | Payment succeeds; user returns to the success page |
| PAY-05 | Complete payment and wait for webhook confirmation | Order status changes from pending to paid in PostgreSQL |
| PAY-06 | Complete a successful membership purchase | Purchased membership appears in the user account header |
| PAY-07 | Refresh the page after purchasing | Purchased membership remains associated with the user |
| PAY-08 | Cancel Stripe Checkout | No completed purchase is recorded |
| PAY-09 | Attempt payment using a declined Stripe test card | Payment is declined; no paid membership is granted |
| PAY-10 | Attempt checkout with an invalid membership ID | Backend rejects the request |
| PAY-11 | Access checkout status without authentication | Backend rejects the request |
| PAY-12 | Attempt to access another user's checkout session | Backend rejects unauthorized access |

**Technical coverage:** Stripe Checkout API, authenticated Express endpoints, Stripe webhooks, webhook signature verification, PostgreSQL orders and order items, payment status validation, React state management.

### Stripe Test Cards

**Successful payment:**

- Card number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any valid three digits

**Declined payment:**

- Card number: `4000 0000 0000 0002`
- Expiration: Any future date
- CVC: Any valid three digits

**Important:** Stripe is configured in test mode. No real payments are collected.

---

## TC-05 — Mobile Navigation & Safari Compatibility

**Objective:** Verify responsive navigation, account information display, and authentication compatibility on mobile browsers.

| ID | Test Scenario | Expected Result |
|---|---|---|
| MOB-01 | Open website on iPhone Safari | Website displays correctly without horizontal overflow |
| MOB-02 | Open hamburger menu | Navigation menu expands |
| MOB-03 | Inspect navigation links | TRAINERS, CLASSES, and MEMBERSHIP appear in one horizontal row |
| MOB-04 | Select a navigation link | Browser navigates to the correct section; menu closes |
| MOB-05 | Inspect RED ROOM toggle | Toggle is visible without its text label on mobile |
| MOB-06 | Activate RED ROOM toggle | Website switches to RED ROOM mode |
| MOB-07 | Open menu while authenticated | Username is displayed |
| MOB-08 | Open menu after purchasing membership | Purchased membership appears below username |
| MOB-09 | Open menu without authentication | User information is replaced with a login prompt |
| MOB-10 | Log in using iPhone Safari | Authentication succeeds |
| MOB-11 | Refresh Safari after login | User remains authenticated |
| MOB-12 | Select membership in Safari while logged in | Stripe Checkout opens successfully |
| MOB-13 | Log out using Safari | Session ends and UI reflects logged-out state |

**Technical coverage:** Responsive Tailwind CSS, React state, mobile navigation, session cookies, Vercel API proxy, Safari compatibility.

---

## TC-06 — Stripe Webhook & Payment Security

**Objective:** Verify that membership purchases are confirmed securely by the backend rather than trusting the frontend.

| ID | Test Scenario | Expected Result |
|---|---|---|
| SEC-01 | Send webhook with a valid Stripe signature | Webhook is accepted and processed |
| SEC-02 | Send webhook with an invalid signature | Backend rejects the request |
| SEC-03 | Complete a successful Stripe test payment | Corresponding order is marked paid |
| SEC-04 | Open success URL without a verified payment | No paid membership is granted |
| SEC-05 | Send duplicate successful payment webhook | Order remains consistent; no duplicate fulfillment |
| SEC-06 | Request another user's membership information | Backend does not expose another user's purchase |
| SEC-07 | Inspect frontend source and network requests | Stripe secret API key is not exposed to the browser |

**Technical coverage:** Stripe webhook signature verification, payment authorization, session validation, database consistency, backend payment verification, secret management.

---

## Testing Approach

The selected test cases cover six critical areas:

1. **Authentication & Session Management:** Verify registration, login, logout, and persistent authentication.
2. **REST API & Database Integration:** Verify backend communication, PostgreSQL data retrieval, and filtering.
3. **Client-Side Image Processing:** Verify browser-based image upload, processing, and downloading.
4. **Stripe Checkout & Membership Purchases:** Verify the complete membership payment workflow using Stripe Test Mode.
5. **Mobile Navigation & Safari Compatibility:** Verify responsive navigation, account information, and mobile authentication.
6. **Payment Security & Webhooks:** Verify payment confirmation, authorization, webhook signatures, and data integrity.

### Testing Techniques

- **Positive testing:** Verify that features work with valid inputs.
- **Negative testing:** Verify validation and error handling with invalid inputs.
- **Integration testing:** Verify communication between React, Express, PostgreSQL, and Stripe.
- **Persistence testing:** Verify authentication and purchased membership information after page reload.
- **Client-side testing:** Verify browser-based image processing without backend involvement.
- **Payment testing:** Verify successful, declined, and cancelled sandbox transactions.
- **Security testing:** Verify authentication requirements, payment authorization, and webhook signature validation.
- **Cross-browser testing:** Verify functionality on desktop browsers and iPhone Safari.
- **Responsive testing:** Verify mobile layouts, navigation, and interactive controls.

### Test Execution Status

Test cases are documented for manual execution.

Each test should be assigned one of the following statuses after execution:

| Status | Description |
|---|---|
| Passed | Actual result matches the expected result |
| Failed | Actual result differs from the expected result |
| Blocked | Test cannot be executed due to an external dependency or issue |
| Not Run | Test has not yet been executed |

Tests must not be marked as Passed until their expected results have been verified.

---

## Test Coverage Summary

| Test Suite | Number of Test Cases |
|---|---:|
| TC-01 — Authentication & Session Management | 9 |
| TC-02 — REST API & Database Integration | 10 |
| TC-03 — Find Your Red: Image Processing | 7 |
| TC-04 — Stripe Checkout & Membership Purchases | 12 |
| TC-05 — Mobile Navigation & Safari Compatibility | 13 |
| TC-06 — Stripe Webhook & Payment Security | 7 |
| **Total** | **58** |

---

## Production URLs

**Frontend:**  
https://redline-fitness-react-tailwind.vercel.app

**API Health:**  
https://redline-fitness-api.onrender.com/api/health

**Classes API:**  
https://redline-fitness-api.onrender.com/api/classes

**Stripe Webhook Endpoint:**  
`https://redline-fitness-api.onrender.com/api/stripe/webhook`

The Stripe webhook endpoint is intended for Stripe-generated requests, not direct browser navigation.

---

## Project Status

**Full-Stack Application — Deployed**

The application includes:

- React frontend with responsive navigation.
- Express REST API.
- Neon PostgreSQL database.
- Session-based user authentication.
- Database-driven fitness classes.
- Client-side image processing.
- Stripe Checkout integration in test mode.
- Webhook-based payment confirmation.
- PostgreSQL membership and order tracking.
- Mobile Safari authentication compatibility.

**Note:** REDLINE Fitness is an educational portfolio project. Stripe Checkout operates exclusively in test mode, and no real payments are collected.
