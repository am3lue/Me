# Project Summary: Francis Masanja (am3lue) Portfolio

## Overview
This project is a personal portfolio website for **Francis Masanja (am3lue)**, a Data Scientist and Embedded Systems Developer based in Tanzania. It showcases his skills, projects, and contact information.

## Technical Stack
*   **Frontend Framework:** Vue.js 3 (loaded via CDN).
*   **Languages:** HTML5, CSS3, JavaScript.
*   **Styling:** Custom CSS with CSS variables for a consistent dark theme (`--bg-primary: #0f172a`), utilizing FontAwesome for icons and Google Fonts (Inter, Fira Code).
*   **Architecture:** Single Page Application (SPA) structure.

## Key Components

### 1. `index.html` (Structure)
*   **Head:** Includes meta tags for SEO, links to FontAwesome, Google Fonts, and `style.css`.
*   **Body:**
    *   **Navigation:** Fixed navbar with smooth scrolling to sections. Mobile-responsive with a hamburger menu.
    *   **Hero Section:** Introduction, role description, and philosophy.
    *   **Skills Section:** Dynamic rendering of skill categories (Software, Hardware, Other Tools).
    *   **Projects Section:** Grid layout displaying featured projects with links to GitHub/Demo.
    *   **Contact Section:** Contact information and a functional-looking (frontend-only) contact form.
    *   **Footer:** Copyright and social links.

### 2. `script.js` (Logic)
*   Initializes a Vue.js application mounted to `#app`.
*   **Data:**
    *   `skills`: Object containing arrays of skills.
    *   `projects`: Array of project objects (title, description, tech stack, links).
    *   `isMenuOpen` / `isScrolled`: State variables for UI reactivity.
*   **Methods:**
    *   `toggleMenu()`: Handles mobile menu visibility.
    *   `getCategoryIcon()`: Returns specific icons for skill categories.
    *   `submitForm()`: Simulates form submission with an alert.
    *   `handleScroll()`: Updates navbar styling on scroll.

### 3. `style.css` (Presentation)
*   **Theming:** Dark mode color palette using CSS variables (`:root`).
*   **Layout:** Flexbox and Grid used extensively for responsive design (Skills grid, Projects grid).
*   **Responsiveness:** Media queries handle mobile layouts (stacking content, toggling navigation).
*   **Effects:** Hover effects on buttons, cards, and links; backdrop blur for the navigation bar.

## Content Highlights
*   **Focus:** IoT, Embedded Robotics, Sustainable Tech.
*   **Featured Projects:** Automated Water Billing System, Solar Irrigation, Metal Detector Door, etc.
