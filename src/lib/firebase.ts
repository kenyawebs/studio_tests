
// src/lib/firebase.ts - Definitive Fix

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
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

// A function to check if the configuration is valid and complete
function isFirebaseConfigValid(config: typeof firebaseConfig): boolean {
  return Object.values(config).every(
    (value) => value && !value.includes('your-') && !value.includes('dummy')
  );
}

export const firebaseConfigStatus = {
  isValid: isFirebaseConfigValid(firebaseConfig),
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// This function safely initializes Firebase and all its services
// It will only be called on the client-side from the AuthProvider
const initializeFirebase = () => {
    if (!firebaseConfigStatus.isValid) {
        return;
    }

    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }

    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
};

// We call it once here to ensure it's set up for the app's lifecycle
initializeFirebase();

// We export the services directly. The AuthProvider will guard against their use
// if the configuration is invalid.
// @ts-ignore
export { app, auth, db, storage };
