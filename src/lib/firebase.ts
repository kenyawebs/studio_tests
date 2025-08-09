
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

// Function to check if the configuration is valid
function isFirebaseConfigValid(config: typeof firebaseConfig): boolean {
  return Object.values(config).every(
    (value) => value && !value.includes('dummy-key') && !value.startsWith('your-')
  );
}

export const firebaseConfigStatus = {
  isValid: isFirebaseConfigValid(firebaseConfig),
  config: firebaseConfig,
};

let app: FirebaseApp | null = null;
if (firebaseConfigStatus.isValid) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
}

let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (app) {
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
}

// @ts-ignore
export { app, auth, db, storage };
