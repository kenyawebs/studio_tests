
'use client';

import { AppShell } from "@/components/app/app-shell";
import { ClientOnly } from '@/components/app/client-only';
import { AuthLoader } from '@/components/app/auth-provider';

// This layout is now a pure Server Component.
// All client-side logic and hooks have been moved to the <AppShell> component.
// This resolves "Failed to load chunk" errors by creating a clear boundary
// between server and client components, which is a best practice in the Next.js App Router.

/**
 * The main layout for the authenticated parts of the application.
 *
 * This component wraps the main content of the application with the `AppShell`,
 * which includes the sidebar, header, and other persistent UI elements.
 * It uses `ClientOnly` to ensure that the `AppShell` and its children are
 * only rendered on the client-side, showing an `AuthLoader` as a fallback
 * during the initial server render or while authentication status is being determined.
 *
 * @param {{children: React.ReactNode}} props - The props for the component.
 * @param {React.ReactNode} props.children - The page content to be rendered within the main layout.
 * @returns {JSX.Element} The main application layout component.
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly fallback={<AuthLoader />}>
        <AppShell>{children}</AppShell>
    </ClientOnly>
  );
}
