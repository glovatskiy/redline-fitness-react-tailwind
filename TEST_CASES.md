
# REDLINE Fitness — Functional Test Cases

**Project:** REDLINE Fitness — Full-Stack Web Application  
**Test Type:** Manual Functional Testing  
**Environment:** Production — Stripe Test Mode  
**Frontend:** React, Vite, Tailwind CSS — Vercel  
**Backend:** Node.js, Express — Render  
**Database:** PostgreSQL — Neon  
**Payments:** Stripe Checkout (Test Mode)

---

## TC-01 — Authentication & Session Management

**Objective:** Verify user authentication, error handling, and session persistence.

| ID | Test Scenario | Expected Result |
|---|---|---|
| AUTH-01 | Log in with valid credentials | Login succeeds; UI reflects authenticated state |
| AUTH-02 | Log in with an incorrect password | Login is rejected; appropriate error appears |
| AUTH-03 | Refresh the page after login | User remains authenticated |
| AUTH-04 | Log out | Session ends; UI returns to logged-out state |
| AUTH-05 | Submit empty login fields | Validation prevents invalid submission |

**Technical coverage:** React state, Express authentication endpoints, HTTP cookies, PostgreSQL-backed sessions.

---

## TC-02 — REST API & Database Integration

**Objective:** Verify that fitness classes are retrieved correctly from PostgreSQL and filtered through the API.

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

**Technical coverage:** Fetch API, asynchronous requests, REST endpoints, Express, Drizzle ORM, PostgreSQL, error handling.

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

**Objective:** Verify basic membership purchasing functionality using Stripe Checkout in test mode.

| ID | Test Scenario | Expected Result |
|---|---|---|
| PAY-01 | Select a membership while logged out | User is prompted to log in |
| PAY-02 | Select a membership while logged in | User is redirected to Stripe Checkout |
| PAY-03 | Complete payment using a valid Stripe test card | Payment succeeds; success page appears |
| PAY-04 | Complete a successful membership purchase | Purchased membership appears in the user account |
| PAY-05 | Refresh the page after purchasing | Purchased membership remains visible |
| PAY-06 | Cancel Stripe Checkout | User can return without completing a purchase |
| PAY-07 | Attempt payment with a declined test card | Payment is declined; no membership is granted |
| PAY-08 | Complete checkout on desktop and mobile browsers | Checkout and membership confirmation work on both platforms |

**Technical coverage:** Stripe Checkout, React state, Express REST API, PostgreSQL order storage, payment confirmation, responsive compatibility.

### Stripe Test Cards

**Successful payment:** `4242 4242 4242 4242`

**Declined payment:** `4000 0000 0000 0002`

Use any future expiration date and a valid three-digit CVC.

**Note:** Stripe operates in test mode. No real payments are collected.

---

## Testing Approach

The selected test cases cover four core features:

1. **Authentication:** Login, error handling, and session persistence.
2. **REST API & Database:** Class retrieval, filtering, and backend integration.
3. **Image Processing:** Client-side image upload, effects, and downloading.
4. **Stripe Checkout:** Membership purchasing, payment confirmation, and basic cross-platform compatibility.

### Testing Techniques

- **Positive testing:** Verify functionality using valid inputs.
- **Negative testing:** Verify validation and error handling.
- **Integration testing:** Verify communication between React, Express, PostgreSQL, and Stripe.
- **Persistence testing:** Verify authentication and membership information after page refresh.
- **Cross-platform testing:** Verify checkout on desktop and mobile browsers.

**Execution status:** Test cases are documented for manual execution. Results should be recorded as Passed, Failed, or Not Run after verification.

---

## Test Coverage Summary

| Test Suite | Test Cases |
|---|---:|
| TC-01 — Authentication | 5 |
| TC-02 — REST API & Database | 8 |
| TC-03 — Image Processing | 7 |
| TC-04 — Stripe Checkout | 8 |
| **Total** | **28** |

---

## Production URLs

**Frontend:** https://redline-fitness-react-tailwind.vercel.app

**API Health:** https://redline-fitness-api.onrender.com/api/health

**Classes API:** https://redline-fitness-api.onrender.com/api/classes

---

## Project Status

**Full-Stack Application — Deployed**

REDLINE Fitness includes:

- Responsive React frontend.
- Express REST API.
- Neon PostgreSQL integration.
- Session-based authentication.
- Database-driven fitness classes.
- Client-side image processing.
- Stripe Checkout in test mode.
- Membership purchase tracking in PostgreSQL.
- Production deployment using Vercel, Render, and Neon.

**This is an educational portfolio project. Stripe is configured for test payments only.**
