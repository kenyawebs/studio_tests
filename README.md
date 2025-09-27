# Connect Hub: The Modern Community Platform

Connect Hub is a modern, inclusive, and AI-powered platform designed for community engagement, personal growth, and holistic well-being. Built on a robust, scalable tech stack, it provides a positive and secure online experience for users from all backgrounds.

Our core philosophy is the **"Fishing Net" strategy**: creating a welcoming environment that focuses on universal human themes of connection, purpose, service, and personal development, while providing deeper spiritual resources for those who seek them.

---

## ✨ Key Features

-   **🫂 Community Engagement**: A dynamic social feed for sharing life milestones, a community wall for mutual support, and a comprehensive events hub.
-   **🌱 Personal Growth**: An AI-assisted personal journal, a life mentoring network, and a "Wisdom Texts" section for exploring ancient wisdom.
-   **❤️ Community Impact**: A volunteer board to find and post service opportunities, and a secure giving platform to support the community's mission.
-   **🧠 Holistic Well-being**: A dedicated hub with resources for mental and spiritual health, including access to professional providers and AI-powered guidance.
-   **🎨 Creative Tools**: A "Sermon Remix" studio and a "Meme Center" for creating and sharing content.

---

## 🚀 Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI**: [React](https://react.dev/), [ShadCN UI](https://ui.shadcn.com/), and [Tailwind CSS](https://tailwindcss.com/)
-   **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication, Firestore, Storage)
-   **Generative AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
-   **Testing**: [Playwright](https://playwright.dev/) for End-to-End testing

---

## 📂 Project Structure

A high-level overview of the project's structure:

```
.
├── src/
│   ├── ai/          # Genkit AI flows and configuration
│   ├── app/         # Next.js App Router, pages, and layouts
│   ├── components/  # Reusable React components
│   │   ├── app/     # Components specific to application features
│   │   └── ui/      # Generic UI components (design system)
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Core libraries and utilities (Firebase, utils)
│   └── services/    # Services for interacting with external APIs
├── public/        # Static assets
└── ...            # Config files, etc.
```

---

## ⚙️ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   `npm` or `yarn`
-   [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/connect-hub.git
cd connect-hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  In your project, go to **Project Settings** > **General** and add a **Web** application.
3.  Firebase will provide a `firebaseConfig` object. You will need these credentials for the next step.
4.  Enable the following Firebase services:
    *   **Authentication**: Enable the Email/Password, Google, and Facebook sign-in methods.
    *   **Firestore Database**: Create a new database.
    *   **Storage**: Create a new storage bucket.
5.  Navigate to the **Rules** tab for both Firestore and Storage and paste the contents of `firestore.rules` and `storage.rules` from the repository, respectively. Publish the rules.

### 4. Set Up Environment Variables

1.  Create a new file named `.env.local` in the root of the project.
2.  Copy the contents of `.env.example` into your new `.env.local` file.
3.  Fill in the `NEXT_PUBLIC_FIREBASE_*` variables with the credentials from your Firebase project.
4.  Obtain a **Google Maps API Key** from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/credentials) and add it to `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

### 5. Set Up Google AI (Genkit)

1.  In your Google Cloud project (the same one as Firebase), ensure the **Vertex AI API** is enabled.
2.  Authenticate your local environment with the Google Cloud SDK:
    ```bash
    gcloud auth application-default login
    ```
    This command will open a browser window for you to log in and grant permissions.

### 6. Run the Development Server

Once all setup is complete, you can run the development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:3000`.

---

## 🧪 Running Tests

This project uses Playwright for end-to-end testing.

1.  **Install Playwright browsers**:
    ```bash
    npx playwright install
    ```
2.  **Run the tests**:
    ```bash
    npm run test:e2e
    ```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix (`git checkout -b feature/my-new-feature`).
3.  **Make your changes.** Please adhere to the existing code style and conventions.
4.  **Add documentation** for any new components or functions using JSDoc, following the style used throughout the repository.
5.  **Commit your changes** (`git commit -m 'Add some feature'`).
6.  **Push to the branch** (`git push origin feature/my-new-feature`).
7.  **Create a new Pull Request.**

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.