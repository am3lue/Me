# Project Roadmap & Todo List

This document outlines the step-by-step plan to upgrade the portfolio with dynamic GitHub integration, detailed profile pages, and a complete repository showcase.

## Phase 1: Dynamic Data Integration (GitHub API)
*Goal: Automate content updates by fetching data directly from GitHub.*

- [ ] **Step 1: GitHub API Setup**
    - [ ] Create a reusable `fetchGitHubData` function in `script.js`.
    - [ ] Target endpoints: 
        - `https://api.github.com/users/am3lue/repos`
        - `https://api.github.com/users/francis-masanja/repos`
        - `https://api.github.com/users/am3lue/events` (for activity)
    - [ ] Handle merging data from both accounts (`am3lue` & `francis-masanja`).

## Phase 2: "Recent Activity" Section
*Goal: Show "sections in the website" for new repos, changes, and activities.*

- [ ] **Step 1: Activity Feed UI**
    - [ ] Create a new section `<section id="activity">` in `index.html`.
    - [ ] Design a timeline or feed layout in `style.css` to show recent commits, pushes, and stars.
- [ ] **Step 2: Connect Data**
    - [ ] Parse the GitHub Events API response.
    - [ ] Display the last 5-10 activities dynamically using Vue.js (`v-for`).

## Phase 3: Detailed Profile Pages
*Goal: "Make different pages that explain me in detail".*

- [ ] **Step 1: Architecture Change (Multi-View Support)**
    - [ ] Since we are using Vue via CDN, implement a simple "View Switcher" (e.g., `currentView: 'home'` vs `currentView: 'detailed-profile'`).
    - [ ] Alternatively, create separate HTML files (`about.html`, `experience.html`) if SEO/linking is a priority. *Decision: Start with Vue View Switcher for smoother UX.*
- [ ] **Step 2: Detailed "About" Content**
    - [ ] Create a "Detailed Profile" view/component.
    - [ ] **Education Section:** Add timeline for degrees/certifications.
    - [ ] **Experience Section:** Add professional history (linked to LinkedIn style).
- [ ] **Step 3: Navigation Update**
    - [ ] Add links in the main navbar to access these new detailed views.

## Phase 4: Full Repository Showcase
*Goal: "Showcase all of the repos found in those github accounts".*

- [ ] **Step 1: Repository Grid Layout**
    - [ ] Create a "All Repositories" section (or separate view).
    - [ ] Design a compact "Repo Card" showing: Name, Description, Star count, Language, and Last Updated date.
- [ ] **Step 2: Logic Implementation**
    - [ ] Fetch *all* public repos (handle pagination if > 30 repos, though initially 100 per page might suffice).
    - [ ] Filter out forks (optional, depending on preference).
    - [ ] Sort repositories by `updated_at` (newest first).
    - [ ] Render the combined list from `am3lue` and `francis-masanja`.

## Phase 5: Automation & Maintenance
- [ ] **Step 1: Rate Limiting Handling**
    - [ ] Ensure the app handles API rate limits gracefully (display cached/static data if API fails).
- [ ] **Step 2: Continuous Updates**
    - [ ] Since the data is fetched client-side, the site will automatically show the latest info whenever a user visits, fulfilling the "update my portfolio every now and then" requirement without manual code changes.
