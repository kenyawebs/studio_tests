# Connect Hub: Phased Cloud Migration & Expansion Strategy

This document outlines the definitive, multi-phase strategic plan for launching the Connect Hub platform, securing its foundation, and architecting its future expansion by leveraging advanced Google Cloud services.

---

## Phase 1: Launch & Harden (Immediate Priority)

This phase focuses on getting the stable web application live on Firebase Hosting and ensuring it is secure and robust.

| Task                          | Status    | Description                                                                                                                                                                                                    |
| :---------------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Deploy Web Application**        | **Active**  | Resolve any environment configuration issues (`.env.local`) and deploy the current stable version of the web app to `spiritual-connect.com` via Firebase Hosting.                                                 |
| **Enable Firebase App Check**     | Pending   | In the Firebase Console, enable App Check for the web app using the reCAPTCHA Enterprise provider. Start in monitoring-only mode, then enforce for Firestore and Cloud Functions to prevent billing fraud.   |
| **Strengthen Firestore Rules**    | Pending   | Enhance `firestore.rules` with data validation to ensure data integrity (e.g., users can only edit their own profiles, submitted data has the correct type).                                                  |
| **Restrict API Keys**             | Pending   | In the Google Cloud Console, restrict the web app's API key. Add HTTP referrer restrictions for your domain and specify which Firebase services the key can access.                                        |

---

## Phase 2: Architect for Scale (Foundation for Growth)

This phase restructures the codebase for long-term maintainability and prepares for the addition of a mobile app and advanced backend services.

| Task                          | Status    | Description                                                                                                                                                                                                    |
| :---------------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Initialize Monorepo**           | Pending   | Create a new monorepo using a tool like Nx. This will centralize all project code (web, future mobile, shared libraries) into a single repository for efficient management.                                    |
| **Migrate Web Application**       | Pending   | Move the existing Next.js web application code into the `apps/web-app` directory within the new monorepo. This is a one-time setup that enables code sharing and streamlined development.                   |

### Recommended Monorepo Structure:
```
/connect-hub-monorepo/
├── apps/
│   ├── web-app/              <-- Your existing website code
│   └── android-app/          <-- Future Android app code
├── libs/
│   └── shared-types/         <-- Future shared code (e.g., data models)
└── firebase.json             <-- Firebase configuration
```

---

## Phase 3: Cloud Service Migration & Enhancement (Leveraging Your New Infrastructure)

With a secure foundation and scalable architecture in place, this phase focuses on migrating key features to your powerful new Google Cloud services.

| Task                                 | Status    | Description                                                                                                                                                                                                     |
| :----------------------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Upgrade to High-Performance AI**       | **Active**  | Migrate existing AI logic from the simple Genkit setup to dedicated, high-performance Cloud Functions that call the **Vertex AI** Gemini API directly. Configure "minimum instances" to eliminate cold-start lag. |
| **Fix and Upgrade Maps**             | Pending   | Replace the broken Leaflet map with a robust **Google Maps Platform** integration on the Events and Volunteering pages, using the API key you've enabled.                                                       |
| **Develop Native Android App**           | Pending   | Begin development of the native Android app inside the monorepo, connecting it to the same Firebase backend for a seamless, real-time cross-platform user experience.                                        |
| **Implement Data Analytics Pipeline**  | Future    | Set up a data pipeline that exports Firestore data to **BigQuery**. This will enable powerful analytics, user behavior insights, and dashboards that don't impact live database performance.                   |
| **Implement Advanced Social Features**   | Future    | Build out foundational community features from the roadmap, such as a full commenting system on posts and a "follow" system for users, leveraging the scalable backend.                                     |

---

## Phase 4: Advanced AI & Automation (The Vision)

This phase leverages the full power of your cloud infrastructure to build the unique, transformative features of Connect Hub.

| Task                               | Status    | Description                                                                                                                                                                                                     |
| :--------------------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Build the Cultural Intelligence Engine** | Future    | Develop a sophisticated AI service on **Cloud Run** that analyzes content for cultural nuances, language patterns, and spiritual terminology, providing insights for content adaptation and user connection. |
| **Automated Content Moderation**     | Future    | Create a Cloud Function triggered by new posts that uses the **Cloud Vision API** and **Natural Language API** to automatically flag potentially inappropriate content for human review.                     |
| **Personalized Growth Plans**        | Future    | Leverage **Vertex AI** and **BigQuery** analytics to generate personalized spiritual growth plans, suggesting relevant content, mentors, and events to users based on their journey.                           |

