# 🔴 REDLINE Fitness

### TRAIN IN A DIFFERENT LIGHT.

A fully responsive, full-stack fitness studio web application built with **React, JavaScript, Tailwind CSS v4, Node.js, Express, and PostgreSQL**.

REDLINE Fitness is a fictional premium boutique fitness studio concept based in Prague, Czech Republic. The project combines cinematic UI design with interactive frontend features, REST API integration, database-driven content, and session-based authentication.

Developed as part of an **AI-Assisted Frontend Development Practicum**, the project evolved from a static HTML/CSS website into a deployed full-stack React application.

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

### 🔐 Authentication & Session Management

Session-based authentication implemented using React and Express.

- User registration and login.
- Backend authentication endpoints.
- Password hashing.
- Server-side session management.
- HTTP-only session cookies.
- Persistent authentication after page refresh.
- Logout functionality.
- Authentication state synchronized with the frontend.
- Production cross-origin cookie configuration.

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
- Mobile navigation menu.
- Trainer profiles and specializations.
- Membership pricing cards.
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
| Authentication | Express sessions, HTTP cookies, password hashing |
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
                 HTTP Requests
                        |
                        v
               EXPRESS REST API
              Render Deployment
                        |
                   Drizzle ORM
                        |
                        v
                NEON POSTGRESQL
```

**Frontend:** React handles rendering, user interactions, authentication state, class filtering, and client-side image processing.

**Backend:** Express provides REST API endpoints, authentication, and session management.

**Database:** Neon PostgreSQL stores application data, including fitness classes and authentication-related records.

### API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Check API availability |
| `/api/classes` | GET | Retrieve fitness classes |

Authentication is handled through additional Express API routes.

**[API Health Check](https://redline-fitness-api.onrender.com/api/health)** | **[Classes API](https://redline-fitness-api.onrender.com/api/classes)**

---

## 🧪 Testing & Quality Assurance

Functional test cases were prepared to verify the application's three core features: authentication, API/database integration, and client-side image processing.

### Test Coverage

| Test Suite | Focus |
|---|---|
| TC-01 — Authentication | Login, invalid credentials, session persistence, logout |
| TC-02 — REST API & Database | Health checks, class retrieval, schedule filtering, error handling |
| TC-03 — Find Your Red | Image uploads, previews, PNG downloads, invalid files |

The documented test scenarios cover:

- Positive and negative functional testing.
- Frontend/backend integration.
- API and database communication.
- Session persistence.
- Client-side image processing.
- Input validation and error handling.

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
│   │   │   ├── FindYourRed.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── db/
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
```

Start the backend:

```bash
node index.js
```

The Express API runs locally and connects to PostgreSQL using the configured database connection.

### 3. Configure the Frontend

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:3000
```

Adjust the URL if your backend uses a different local port.

Start the frontend:

```bash
npm run dev
```

Open the local Vite URL, typically:

`http://localhost:5173`

### 4. Production Build

From the `client/` directory:

```bash
npm run build
```

Vite generates the production build in `dist/`.

---

## ☁️ Deployment

The application is deployed using three cloud services.

| Service | Responsibility |
|---|---|
| Vercel | Hosts the React frontend |
| Render | Hosts the Express REST API |
| Neon | Hosts the PostgreSQL database |

### Production Configuration

**Frontend (Vercel)**

```env
VITE_API_URL=https://redline-fitness-api.onrender.com
```

**Backend (Render)**

```env
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
NODE_ENV=production
```

The backend is configured to accept requests from the deployed frontend and support session cookies across the two domains.

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

### 3. Backend & Database Integration

- Created an Express REST API.
- Connected the application to Neon PostgreSQL.
- Integrated Drizzle ORM for database access.
- Implemented session-based authentication.
- Connected the React frontend to backend endpoints.

### 4. Testing & Refinement

- Prepared structured functional test cases.
- Verified API connectivity and database-backed class retrieval.
- Tested authentication and session persistence.
- Reviewed responsive layouts and interactive features.
- Used browser DevTools and Postman for debugging and API inspection.

### 5. Deployment & Version Control

- Managed source code using Git and GitHub.
- Deployed the frontend to Vercel.
- Deployed the backend to Render.
- Configured production environment variables.
- Connected the deployed application to Neon PostgreSQL.

### AI-Assisted Development

AI tools supported design exploration, architecture planning, implementation guidance, debugging, code review, and troubleshooting.

The project demonstrates a practical workflow combining frontend fundamentals, full-stack development, and AI-assisted engineering.

---

## 🔮 Future Improvements

- [ ] Implement a complete class booking workflow.
- [ ] Add booking management for authenticated users.
- [ ] Implement membership checkout.
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
- Interactive theme switching and class filtering.
- Client-side photo processing.
- Documented functional test cases.
- Production deployment using Vercel, Render, and Neon.

This is an educational and portfolio project. Booking and membership checkout are not production payment services.

---

## 👨‍💻 Author

**Vladislav Glovatskiy**

Frontend Developer | React · JavaScript · Node.js

[GitHub](https://github.com/glovatskiy)

---

<p align="center">
  <strong>🔴 TRAIN IN A DIFFERENT LIGHT.</strong>
</p>