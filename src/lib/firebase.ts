
// src/lib/firebase.ts

import { initializeApp, getApps, FirebaseApp, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Function to check if the configuration is valid and complete
function isFirebaseConfigValid(config: typeof firebaseConfig): boolean {
  return Object.values(config).every(
    (value) => value && !value.includes('your-') && !value.includes('dummy')
  );
}

export const firebaseConfigStatus = {
  isValid: isFirebaseConfigValid(firebaseConfig),
  config: firebaseConfig,
};

// Initialize Firebase App on the client side only, and only if it hasn't been initialized yet.
const app: FirebaseApp = !getApps().length && firebaseConfigStatus.isValid ? initializeApp(firebaseConfig) : getApp();

// Conditionally export services only if the app is initialized
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (firebaseConfigStatus.isValid) {
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
}

// @ts-ignore - We are handling the uninitialized case in the AuthProvider
export { app, auth, db, storage };
