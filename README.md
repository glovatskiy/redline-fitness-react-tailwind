# 🔴 REDLINE Fitness

### TRAIN IN A DIFFERENT LIGHT.

A premium, fully responsive fitness studio website built with **React, JavaScript, Tailwind CSS v4, and Vite**.

REDLINE Fitness is a fictional boutique fitness studio concept based in Prague, Czech Republic. The project combines bold typography, cinematic imagery, immersive interactions, and a distinctive dark visual identity to deliver a modern fitness experience.

This version rebuilds the original HTML/CSS website using a component-based React architecture, Tailwind CSS, and interactive features powered by React hooks.

**[🌐 Original Live Demo](https://glovatskiy.github.io/redline-fitness-react-tailwind/)** | **[💻 React GitHub Repository](https://github.com/glovatskiy/redline-fitness-react-tailwind)**

---

## 📸 Project Preview

<table>
  <tr>
    <th width="50%">DEFAULT MODE</th>
    <th width="50%">RED ROOM MODE</th>
  </tr>
  <tr>
    <td align="center" valign="top">
      <img
        src="./assets/images/redline-fitness.png"
        alt="REDLINE Fitness React website — Default Mode"
        width="100%"
      />
    </td>
    <td align="center" valign="top">
      <img
        src="./assets/images/redline-fitness-redroom-mode.png"
        alt="REDLINE Fitness React website — RED ROOM Mode"
        width="100%"
      />
    </td>
  </tr>
</table>

<p align="center">
  <em>Two distinct visual experiences. One REDLINE identity.</em>
</p>

---

## ✨ Features

### 🔴 RED ROOM — Signature Theme Switcher

One of REDLINE Fitness's signature features is **RED ROOM**, an immersive alternative visual mode that transforms the website's atmosphere.

- Switch between the default dark theme and RED ROOM.
- Theme switching implemented using React `useState`.
- Dynamic background, surface, and accent color changes.
- Red glow effects and atmospheric styling.
- Smooth visual transitions using Tailwind CSS.
- Conditional styling based on React props.
- Consistent theme behavior across all components.

Unlike the original implementation, which used CSS-driven theme management, this React version manages the theme through application state.

### 📸 FIND YOUR RED — Interactive Photo Experience

An interactive feature that allows visitors to create their own REDLINE-inspired images.

- Upload photos directly from the user's device.
- Preview uploaded images instantly.
- Apply a cinematic red-light effect.
- Download processed images as PNG files.
- Remove uploaded photos and start again.
- Image processing using the HTML Canvas API.
- React `useState`, `useRef`, and `useEffect` hooks.
- Automatic cleanup of temporary image URLs.
- Responsive interface with RED ROOM support.

All image processing happens directly in the browser without requiring a backend.

### 📱 Fully Responsive Design

The website provides a consistent experience across desktop, tablet, and mobile devices.

- Mobile-first styling with Tailwind CSS v4.
- Responsive typography and spacing.
- CSS Grid and Flexbox layouts.
- Interactive hamburger navigation on mobile.
- Responsive training cards and membership pricing.
- Adaptive image layouts.
- Responsive navigation and footer.
- Optimized layouts for different viewport sizes.

### 🏋️ Trainer Showcase

A dedicated section introducing the REDLINE coaching team.

- Three trainer profiles.
- Professional photography.
- Training specializations.
- Individual biographies.
- Responsive trainer cards.
- Grayscale-to-color hover effects.
- Smooth image scaling animations.
- RED ROOM visual overlays.
- Dynamic rendering using JavaScript arrays and `.map()`.

### 📅 Interactive Training Schedule

A class schedule that allows visitors to explore available training sessions.

- Training sessions displayed as individual cards.
- Class names, times, and intensity levels.
- Interactive TODAY and TOMORROW controls.
- Intensity filtering:
  - ALL
  - BEGINNER
  - INTERMEDIATE
  - INTENSE
- Dynamic filtering using React state.
- Available spots and fully booked indicators.
- Booking and waitlist entry points.
- Active filter indicators with visual feedback.
- RED ROOM styling and glowing selected controls.
- Responsive schedule grid.

The schedule uses React `useState` and JavaScript `.filter()` to update the displayed classes without reloading the page.

**Note:** Class availability is demonstration data. Booking and waitlist actions do not currently connect to a backend.

### 💳 Membership Plans

Three membership options designed for different training needs.

| Membership | Price | Description |
|---|---|---|
| **DROP IN** | $35/class | Single-class access without commitment |
| **REDLINE 8** | $180/month | Eight classes per month with additional benefits |
| **UNLIMITED** | $285/month | Unlimited training access with premium benefits |

Additional features:

- Highlighted MOST POPULAR membership.
- Transparent pricing and benefits.
- Responsive pricing cards.
- Dynamic rendering using React `.map()`.
- Conditional styling for featured memberships.
- Interactive button hover effects.
- RED ROOM theme integration.

**Note:** Membership buttons are currently UI demonstrations and do not process payments.

### 🎨 Cinematic Visual Design

REDLINE Fitness uses a high-impact visual language inspired by premium boutique fitness studios.

- Full-width cinematic hero background.
- Oversized editorial typography.
- Bebas Neue and Inter font pairing.
- Black, charcoal, ivory, and red color palette.
- Animated training-discipline ticker.
- High-contrast buttons and interactive elements.
- Hover effects and transitions.
- Custom Tailwind design tokens.
- RED ROOM glow effects.
- Responsive visual hierarchy.

### ⚛️ React Architecture

The website is organized into reusable React components.

- Component-based application structure.
- Functional React components.
- Props for sharing data between components.
- React hooks for interactive functionality.
- Dynamic rendering using `.map()`.
- Conditional rendering and styling.
- Event handling.
- State-driven UI updates.
- Data-driven trainer, class, and membership sections.
- Separation of application components and assets.

### 🌐 Additional Features

- Semantic HTML5 structure.
- Descriptive image alternative text.
- Accessibility attributes for interactive elements.
- Smooth navigation between page sections.
- Custom SVG icons.
- Google Fonts integration.
- Font Awesome social media icons.
- Vite development environment.
- Git and GitHub version control.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React** | Component-based frontend architecture |
| **JavaScript (ES6+)** | Application logic and interactivity |
| **Tailwind CSS v4** | Utility-first styling and responsive design |
| **Vite** | Development server and production builds |
| **HTML5** | Semantic website structure |
| **CSS3** | Custom animations and browser styling |
| **React Hooks** | State management, DOM references, and effects |
| **Canvas API** | Client-side image processing and downloads |
| **CSS Grid** | Responsive layouts |
| **Flexbox** | Flexible interface components |
| **Google Fonts** | Bebas Neue and Inter |
| **Font Awesome** | Interface and social media icons |
| **Git** | Version control |
| **GitHub** | Repository hosting |

### React Hooks Used

| Hook | Purpose |
|---|---|
| `useState` | RED ROOM theme, schedule filtering, photo uploads |
| `useRef` | Accessing the Canvas element |
| `useEffect` | Cleaning up temporary image URLs |

---

## 🎨 Design System

The REDLINE visual identity emphasizes **intensity, confidence, and minimalism**.

### Typography

**Bebas Neue**

- Main headings
- Branding
- Editorial statements
- Prominent UI elements

**Inter**

- Body text
- Descriptions
- Supporting content
- Interface labels

### Color Palette

| Color | Hex | Usage |
|---|---|---|
| REDLINE Red | `#C40000` | Primary brand accent |
| RED ROOM Red | `#FF0000` | Alternative theme accent |
| Background | `#121212` | Main dark backgrounds |
| Surface | `#1E1E1E` | Cards and secondary surfaces |
| Ivory | `#F5F5F1` | Primary text |
| Muted Gray | `#A0A0A0` | Secondary text |

### Tailwind CSS v4 Theme Configuration

The project uses Tailwind CSS v4's CSS-first configuration approach.

Custom design tokens are defined using `@theme`:

```css
@import "tailwindcss";

@theme {
  --font-heading: "Bebas Neue", sans-serif;
  --font-body: "Inter", sans-serif;

  --color-brand-red: #c40000;
  --color-brand-background: #121212;
  --color-brand-surface: #1e1e1e;
  --color-brand-text: #f5f5f1;
  --color-brand-muted: #a0a0a0;
}
```

These tokens establish consistent typography and colors across the application.

### Design Principles

- Strong visual hierarchy.
- Oversized editorial typography.
- Minimal distractions.
- High-contrast interactions.
- Consistent spacing and alignment.
- Reusable design patterns.
- Responsive layouts.
- Cohesive visual identity.

---

## 📂 Project Structure

```text
redline-fitness-react-tailwind/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── hero-img.webp
│   │       ├── marcus-thorne-trainer.webp
│   │       ├── elena-rossi-trainer.webp
│   │       ├── david-chen-trainer.webp
│   │       ├── find-your-red.webp
│   │       ├── redline-fitness.png
│   │       └── redline-fitness-redroom-mode.png
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Ticker.jsx
│   │   ├── Trainers.jsx
│   │   ├── Classes.jsx
│   │   ├── Editorial.jsx
│   │   ├── Membership.jsx
│   │   ├── FindYourRed.jsx
│   │   └── Footer.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/glovatskiy/redline-fitness-react-tailwind.git
```

### 2. Navigate to the project

```bash
cd redline-fitness-react-tailwind
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

Usually:

```text
http://localhost:5173/
```

### 5. Create a production build

```bash
npm run build
```

Vite generates an optimized production build in the `dist/` directory.

### 6. Preview the production build

```bash
npm run preview
```

---

## 💡 Development Process

This project was developed as part of an **AI-Assisted Frontend Development Practicum**.

The development process followed a structured workflow combining UI/UX design, frontend implementation, testing, and AI-assisted development.

### 1. Planning

- Defined the REDLINE Fitness concept.
- Established the website's structure and content.
- Identified the main sections and user interactions.
- Planned the signature RED ROOM experience.
- Planned the migration from HTML/CSS to React and Tailwind CSS.

### 2. UI/UX Design

- Explored visual concepts using UX Pilot.
- Developed desktop, tablet, and mobile layouts.
- Established typography, colors, and spacing.
- Designed the website's visual hierarchy.
- Maintained the original REDLINE visual identity during the React rebuild.

### 3. Frontend Implementation

- Rebuilt the website using React and Tailwind CSS v4.
- Organized the application into reusable components.
- Implemented responsive layouts using Tailwind utilities.
- Developed RED ROOM theme switching using React state.
- Implemented interactive schedule filtering.
- Created data-driven trainer and membership components.
- Developed photo-upload and image-processing functionality.
- Implemented mobile navigation and interactive UI elements.

### 4. Testing and Refinement

- Tested responsive layouts across different screen sizes.
- Checked navigation and interactive elements.
- Refined typography, spacing, and visual consistency.
- Reviewed the website's appearance in different theme modes.
- Tested schedule filtering and theme switching.
- Tested photo uploads, previews, and downloads.

### 5. Version Control

- Managed source code using Git and GitHub.
- Organized development into individual components.
- Created descriptive commits for completed features.
- Maintained a separate repository for the React implementation.

### AI-Assisted Development

AI tools supported the development workflow through:

- Design exploration and UI/UX planning.
- React component architecture.
- Implementation guidance.
- Tailwind CSS styling.
- Responsive layout refinement.
- Debugging and troubleshooting.
- Code review and improvement suggestions.

The project demonstrates a practical workflow combining frontend development fundamentals with modern React technologies and AI-assisted tools.

---

## 🔮 Future Improvements

- [ ] Add React Router for dedicated application pages.
- [ ] Implement a functional class-booking system.
- [ ] Create booking forms with validation.
- [ ] Add booking confirmation pages.
- [ ] Persist bookings using localStorage.
- [ ] Connect class bookings to a backend.
- [ ] Implement membership checkout.
- [ ] Add automated tests using Vitest and React Testing Library.
- [ ] Add end-to-end tests using Playwright.
- [ ] Expand accessibility testing.
- [ ] Improve performance and image loading.
- [ ] Deploy the React application to GitHub Pages.

---

## 📌 Project Status

**Frontend Implementation Complete — Portfolio Project**

REDLINE Fitness is a fictional fitness studio created for educational and portfolio purposes.

The React application includes responsive layouts, interactive schedule filtering, RED ROOM theme switching, and client-side photo processing.

Booking and membership features are demonstrations rather than live commercial services.

---

## 👨‍💻 Author

**Vladislav Glovatskiy**

Frontend Developer | React & JavaScript

[GitHub](https://github.com/glovatskiy)

---

<p align="center">
  <strong>🔴 TRAIN IN A DIFFERENT LIGHT.</strong>
</p>