# Connect Hub: Development Roadmap

This document tracks our development roadmap. We have a stable, feature-rich application ready for user testing. The next priorities focus on scaling the platform and deepening user engagement.

---

## 🚀 **Immediate Development Priorities**

### **1. Performance & Scalability: Implement Pagination (High Priority)**
-   **What:** Refactor the Social Feed and Community Wall to use pagination or "infinite scroll". Instead of loading all documents, fetch a limited number (e.g., 10) initially and load more as the user scrolls.
-   **Why:** This is a **critical architectural improvement** to ensure the app remains fast, responsive, and cost-effective as the amount of content grows. It's the most important step before a wider public launch.

### **2. Deepen AI Integration: Conversational AI**
-   **What:** Enhance the AI interactions. For features like the "Life Wisdom AI" and the "Well-being Hub" assistants, clicking the button should open a dedicated, interactive chat modal where users can have a proper back-and-forth conversation with the AI.
-   **Why:** This elevates our AI from a simple suggestion tool to a genuine "guidance system," which is a core part of the app's unique value.

### **3. Enhance Community Features: Comments & Following**
-   **What:**
    -   Implement a full commenting system on the Testimony Feed.
    -   Build a "follow" system allowing users to connect with each other, which will enable a personalized "Following" feed in the future.
-   **Why:** These are foundational social features that are essential for building a vibrant, long-term community.

### **4. Comprehensive E2E Testing (Ongoing)**
-   **What:** Continue to expand the Playwright test suite to cover all newly activated features, including the Giving flow, event creation, volunteering, and interactions with AI modals.
-   **Why:** To guarantee application stability and catch regressions as we add more complex features.

---
## 🚧 **Technical Debt & Issues**

### **1. Address "Firebase: Error (auth/popup-blocked)"**
-   **What:** Investigate and fix the client-side error "Firebase: Error (auth/popup-blocked)" which prevents popup-based authentication methods (like Google Sign-In) from working for some users.
-   **Why:** This is a critical blocker for user authentication and signup using popular methods.
-   **Solutions:**
    -   Instruct users to allow popups for the site in their browser settings and check browser extensions (like ad blockers).
    -   Implement a redirect-based authentication flow as an alternative to the popup flow. Firebase Authentication supports redirect-based flows.
    -   Consider offering alternative authentication methods that do not rely on popups (e.g., email/password).
-   **Related:** Note that during recent troubleshooting, attempts were made to use the AI's `natural_language_write_file` tool to modify the CI workflow file (`.github/workflows/ci.yml`), but the tool experienced issues. The necessary changes to adapt the CI to use standard npm commands after cleaning up the incorrect monorepo setup were performed manually.

---

## 🌟 **Future Feature Wishlist (Post-Priorities)**

This section contains exciting new features to consider after the immediate priorities are addressed.

### **Richer Content & Social Interaction**
-   **Live Streaming**: Integrate functionality to live stream sermons and community events.
-   **Video & Carousel Posts**: Allow users to upload short video clips and multi-image posts.
-   **Direct Messaging**: Implement a private, one-to-one chat system.

### **Community & Family Features**
-   **Dedicated Group Tabs**: Create dedicated sections for a user's home church or interest groups, with specific announcements and member lists.
-   **Family Profiles**: Allow creating profiles for family units and features for connecting relatives.

### **Advanced AI & Matching**
-   **Prayer Matching Engine**: Implement the backend logic to intelligently match users for prayer partnerships based on shared experiences.
-   **AI-Powered Mentorship Matching**: Fulfill the vision of automatically suggesting mentors to mentees based on their profiles.

### **Global South & Monetization**
-   **Regional Payment Gateways**: Integrate M-Pesa, Flutterwave, and other regional payment systems into the Giving page.
-   **E-commerce Store**: Build an integrated store for selling spiritual resources.
-   **Push Notifications**: Implement push notifications for key events, announcements, and social interactions.
