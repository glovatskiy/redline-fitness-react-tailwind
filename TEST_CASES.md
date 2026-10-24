# REDLINE Fitness — Functional Test Cases

**Project:** REDLINE Fitness — Full-Stack Web Application  
**Test Type:** Manual Functional Testing  
**Environment:** Production  
**Frontend:** React, Vite, Tailwind CSS — Vercel  
**Backend:** Node.js, Express — Render  
**Database:** PostgreSQL — Neon

## TC-01 — Authentication & Session Management

**Objective:** Verify user authentication, error handling, and session persistence.

| ID      | Test Scenario                     | Expected Result                                 |
| ------- | --------------------------------- | ----------------------------------------------- |
| AUTH-01 | Log in with valid credentials     | Login succeeds; UI reflects authenticated state |
| AUTH-02 | Log in with an incorrect password | Login is rejected; appropriate error appears    |
| AUTH-03 | Refresh the page after login      | User remains authenticated                      |
| AUTH-04 | Log out                           | Session ends; UI returns to logged-out state    |
| AUTH-05 | Submit empty login fields         | Validation prevents invalid submission          |

**Technical coverage:** React state, Express authentication endpoints, HTTP cookies, PostgreSQL-backed sessions.

## TC-02 — REST API & Database Integration

**Objective:** Verify that fitness classes are retrieved correctly from PostgreSQL and filtered through the API.

| ID     | Test Scenario                        | Expected Result                              |
| ------ | ------------------------------------ | -------------------------------------------- |
| API-01 | Send GET request to `/api/health`    | HTTP 200; API status is `ok`                 |
| API-02 | Send GET request to `/api/classes`   | HTTP 200; JSON containing 12 fitness classes |
| API-03 | Load class schedule on the website   | Classes appear correctly                     |
| API-04 | Filter classes by MON                | Only Monday classes appear                   |
| API-05 | Filter classes by TUE                | Only Tuesday classes appear                  |
| API-06 | Filter by intensity                  | Only matching classes appear                 |
| API-07 | Filter by day and intensity together | Results satisfy both filters                 |
| API-08 | Simulate an unavailable API          | User-friendly error message appears          |

**Technical coverage:** Fetch API, asynchronous requests, REST endpoints, Express query parameters, Drizzle ORM, PostgreSQL, error handling.

## TC-03 — Find Your Red: Image Processing

**Objective:** Verify client-side image upload, visual effects, downloading, and cleanup.

| ID     | Test Scenario                              | Expected Result                             |
| ------ | ------------------------------------------ | ------------------------------------------- |
| IMG-01 | Upload a valid JPG image                   | Image preview appears with red effect       |
| IMG-02 | Upload a valid PNG image                   | Image preview appears with red effect       |
| IMG-03 | Download the processed image               | PNG file downloads successfully             |
| IMG-04 | Open the downloaded image                  | Red filter is applied to the image          |
| IMG-05 | Remove uploaded image                      | Preview disappears; upload interface resets |
| IMG-06 | Upload another image after removal         | New image is displayed correctly            |
| IMG-07 | Attempt to upload an unsupported file type | File is rejected by validation              |

**Technical coverage:** React `useState`, `useRef`, `useEffect`, File API, Canvas API, Blob API, CSS gradients, object URL cleanup.

## Testing Approach

The selected test cases cover three critical areas:

- **Positive testing:** Verify that features work with valid inputs.
- **Negative testing:** Verify validation and error handling with invalid inputs.
- **Integration testing:** Verify communication between React, Express, and PostgreSQL.
- **Persistence testing:** Verify authentication state after page reload.
- **Client-side testing:** Verify browser-based image processing without backend involvement.

**Execution status:** Test cases are documented for manual execution. Results should be recorded as Passed, Failed, or Not Run after verification.

## Production URLs

**Frontend:** https://redline-fitness-react-tailwind.vercel.app

**API Health:** https://redline-fitness-api.onrender.com/api/health

**Classes API:** https://redline-fitness-api.onrender.com/api/classes
