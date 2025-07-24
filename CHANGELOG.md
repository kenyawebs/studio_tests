# Connect Hub 3.0 - Changelog

This document tracks all major feature updates and architectural changes for the Connect Hub project.

---

## [3.0.7] - Pre-Launch Finalization - [Current Date]
### ✨ New Features
- **Meme Center Activated**: Introduced the new "Meme Center" page, accessible from the main sidebar. It features a TikTok-style vertical scrolling feed for text-based memes, complete with functional category filtering.
- **Project Documentation Overhaul**: Performed a full-project cleanup of all documentation (`README.md`, `ROADMAP.md`) and user-facing text to align with the final "Fishing Net" strategy and prepare for the official launch on the `spiritual-connect.com` domain.
- **Created Email Setup Guide**: Added a new `EMAIL_SETUP.md` file to document the DNS records and configuration steps required for setting up Zoho Mail.

### 🛠️ Bug Fixes & Architectural Improvements
- **Isolated Critical Map Bug**: To ensure a stable launch, the crashing Leaflet map component has been temporarily removed from the UI on the Events and Volunteering pages. A new, detailed `TODO.md` file has been created to document this specific issue for resolution by a senior developer or advanced AI.
- **Preserved Project Roadmap**: The original `TODO.md` has been renamed to `ROADMAP.md` to preserve the long-term vision for the project.

---

## [3.0.6] - Admin Dashboard & Testing Finalization - [Current Date]
### ✨ New Features
- **Admin Dashboard Activated**: The `/admin` page is now a functional, secure dashboard. Admins can view a list of all users fetched from Firestore.
- **Secure Admin Actions**: Implemented confirmation dialogs for critical admin actions like "Make Admin" and "Disable User" to prevent accidental clicks.
- **Enhanced User Table**: The user list now includes badges to show whether a user has accepted the terms and conditions.
- **Robust E2E Test Suite**: Completed the Playwright test suite to cover all core user journeys: signup, login, posting to feeds, and updating profiles.
- **Functional CI/CD Pipeline**: The GitHub Actions workflow is now fully configured to run the complete E2E test suite on every pull request.

### 🛠️ Bug Fixes & Architectural Improvements
- **Resolved Dialog Accessibility Error**: Fixed a critical accessibility issue across all `Dialog` components by ensuring each `DialogContent` has a corresponding `DialogTitle`.
- **Fixed Giving Page Crash**: Resolved a `ReferenceError` on the Giving page by correctly importing the `Badge` component.
- **Stabilized Tab Components**: Refactored tab state management on pages like "Giving" to prevent flickering and unnecessary re-renders.
- **Project-wide Consistency**: Performed a full-project cleanup to align all page metadata, AI prompts, and documentation (`README.md`, `TODO.md`) with the final "Fishing Net" strategy and application features.

---

## [3.0.5] - Giving & Well-being Activation - [Current Date]
### ✨ New Features
- **Investor & Partnership Portal**: The "Giving" page now includes a dedicated "Invest & Partner" tab, outlining investment tiers, revenue models, and partnership opportunities, transforming it into a comprehensive funding platform.
- **Well-being Hub Activated**: The Well-being page is now fully interactive. Users can view provider profiles in a dialog and access a functional "Call a Helpline" feature with global and regional emergency numbers.
- **Enhanced Giving Flow**: The "Give" button now triggers a confirmation toast, and the "Download Statement" button provides a mock document, making the feature feel more complete.

---
... (Previous changelog entries)
