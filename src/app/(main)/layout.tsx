import { AppShell } from "@/components/app/app-shell";

// This layout is now a pure Server Component.
// All client-side logic and hooks have been moved to the <AppShell> component.
// This resolves "Failed to load chunk" errors by creating a clear boundary
// between server and client components, which is a best practice in the Next.js App Router.

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
