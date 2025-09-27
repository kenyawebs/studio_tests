
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

/**
 * The configuration object for the Firebase project, sourced from environment variables.
 * @type {{apiKey: string | undefined; authDomain: string | undefined; projectId: string | undefined; storageBucket: string | undefined; messagingSenderId: string | undefined; appId: string | undefined;}}
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Checks if the provided Firebase configuration object contains valid values.
 * It ensures that no placeholder values from the example environment file are being used.
 *
 * @param {typeof firebaseConfig} config - The Firebase configuration object.
 * @returns {boolean} `true` if the configuration is valid, otherwise `false`.
 */
function isFirebaseConfigValid(config: typeof firebaseConfig): boolean {
  return Object.values(config).every(
    (value) => value && !value.includes('your-') && !value.includes('dummy')
  );
}

/**
 * An object that holds the validation status of the Firebase configuration.
 * This is used throughout the app to gracefully handle cases where Firebase is not configured.
 * @type {{isValid: boolean}}
 */
export const firebaseConfigStatus = {
  isValid: isFirebaseConfigValid(firebaseConfig),
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

/**
 * Initializes the Firebase app and its services (Auth, Firestore, Storage).
 * This function ensures that Firebase is only initialized once, preventing errors
 * in environments like Next.js where code can be executed multiple times.
 * It also checks for a valid configuration before attempting to initialize.
 */
export function initializeFirebase() {
    if (firebaseConfigStatus.isValid && !getApps().length) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);
    } else if (getApps().length) {
        app = getApp();
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);
    }
}

export { app, auth, db, storage };
