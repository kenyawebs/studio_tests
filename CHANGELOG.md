# Connect Hub 3.0 - Changelog

This document tracks all major feature updates and architectural changes for the Connect Hub project.

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

## [3.0.4] - The Fishing Net Retrofit - [Current Date]

### ✨ New Features & Strategic Pivot
- **"Fishing Net" Strategy Implemented**: Executed a major strategic pivot to make the application more inclusive and welcoming to a broader audience.
- **Universal Language**: Replaced overtly religious jargon with universal terminology focused on personal growth, life wisdom, and community.
- **Feature Renaming**:
  - Faith Reels → **Life Stories**
  - Prayer Wall → **Community Wall**
  - Bible Page → **Wisdom Texts**
- **Inclusive AI Prompts**: Rewrote AI prompts to be more compassionate and adaptable to users from any background.
- **Universal Reactions**: Updated reaction system on "Life Stories" to be more universal (Inspiring, Encouraging, Hopeful, Life-Changing).

---

## [3.0.3] - Core Feature Activation - [Current Date]

### ✨ New Features

- **Mentorship Page Activated**: Implemented the foundational Mentorship page. Users can now browse a list of available mentors and apply to become a mentor.
- **AI Assistants Activated**: Enabled AI features on the Journal and Wisdom Texts pages to provide users with thoughtful prompts and answers.

### 🛠️ Bug Fixes & Architectural Improvements

- **Performance Overhaul on Community Wall**: Refactored data fetching on the Community Wall to use efficient pagination, significantly improving page load times.
- **Auth Persistence Fix**: Corrected "Remember Me" logic on the Login page.
- **Legal Page Fix**: Resolved a critical hydration error by creating a dedicated layout for legal pages.

---
... (Previous changelog entries)
