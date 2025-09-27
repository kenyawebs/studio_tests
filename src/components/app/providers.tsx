"use client";

import { AuthProvider } from "@/components/app/auth-provider";
import { Toaster } from "@/components/ui/toaster";

/**
 * A component that wraps the entire application with essential global providers.
 *
 * This component ensures that all its children have access to necessary contexts
 * and global components, such as the authentication state from `AuthProvider`
 * and the notification system from `Toaster`. It serves as the root provider
 * for the application's client-side logic.
 *
 * @param {{children: React.ReactNode}} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the providers.
 * @returns {JSX.Element} The providers-wrapped application.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
