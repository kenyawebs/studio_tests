
"use client";

import React, { useState, useEffect } from "react";
import type { User } from "firebase/auth";
import { auth, firebaseConfigStatus, initializeFirebase } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Sparkles, AlertTriangle } from "lucide-react";
import { AuthContext } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOnly } from "./client-only";

/**
 * Renders a full-page error and setup guide when Firebase is not configured.
 *
 * This component is displayed as a fallback when the application detects that
 * the necessary Firebase environment variables are missing. It provides clear,
 * step-by-step instructions for the developer to create a Firebase project,
 * obtain the configuration keys, and set them up correctly in a `.env.local` file.
 *
 * @returns {JSX.Element} The Firebase configuration guide component.
 */
const FirebaseNotConfigured = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-secondary/50 p-4">
             <Card className="w-full max-w-lg border-destructive bg-destructive/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-destructive">
                        <AlertTriangle className="h-6 w-6" /> Action Required: Configure Firebase
                    </CardTitle>
                    <CardDescription className="text-destructive/90">
                        This application cannot run until you connect it to your Firebase project.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <p className="font-semibold">Please follow these steps:</p>
                    <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
                        <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="font-bold underline text-primary">Firebase Console</a> and create a new project.</li>
                        <li>In your project, go to Project Settings and add a <strong>Web</strong> application.</li>
                        <li>Firebase will provide a `firebaseConfig` object. You will need these keys.</li>
                        <li>In this code editor, create a new file in the root directory named <strong><code>.env.local</code></strong>.</li>
                        <li>Copy the contents of <strong><code>.env.example</code></strong> or the block below into your new <strong><code>.env.local</code></strong> file.</li>
                        <li>Replace the placeholder values in `.env.local` with your actual credentials from Firebase.</li>
                    </ol>
                    <pre className="bg-background/50 p-4 rounded-md text-xs whitespace-pre-wrap">
{`NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key-here"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"`}
                    </pre>
                    <p className="pt-2 font-semibold">After saving the <code>.env.local</code> file, the app will automatically restart.</p>
                </CardContent>
             </Card>
        </div>
    );
};

/**
 * Provides authentication state to its children components.
 *
 * This component wraps the application and manages the user's authentication
 * state using Firebase Authentication. It listens for changes in the auth state,
 * sets the current user, and determines if the user has administrative privileges
 * by checking their ID token claims. The provided context includes the user object,
 * loading states, and admin status.
 *
 * @param {{children: React.ReactNode}} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components that need access to the auth context.
 * @returns {JSX.Element} The authentication context provider.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!firebaseConfigStatus.isValid) {
      setLoading(false);
      setAuthReady(true);
      return;
    }

    initializeFirebase();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const tokenResult = await user.getIdTokenResult();
        setIsAdmin(!!tokenResult.claims.admin);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  if (!firebaseConfigStatus.isValid) {
    return <FirebaseNotConfigured />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, authReady, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Renders a full-screen, animated loading indicator.
 *
 * This component is used as a placeholder throughout the application,
 * particularly during initial load, authentication checks, and page
 * transitions. It provides a visually engaging experience to the user,
 * indicating that background processes are running.
 *
 * @returns {JSX.Element} The authentication loader component.
 */
export const AuthLoader = () => {
    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 bg-gradient-pan bg-400%" />
            <div className="relative z-10 flex flex-col items-center gap-4 text-center animate-fade-in-scale">
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30">
                        <Sparkles className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                    <h1 className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white drop-shadow-lg">
                        Connect Hub
                    </h1>
                </div>
                <p className="text-white/80 drop-shadow-md mt-2 animate-pulse">Loading Your Community...</p>
            </div>
        </div>
    );
};
