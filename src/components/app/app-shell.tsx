
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/app/header";
import { SidebarNav } from "@/components/app/sidebar-nav";
import { useAuth } from "@/hooks/use-auth";
import { AuthLoader } from "@/components/app/auth-provider";
import { useToast } from '@/hooks/use-toast';
import { getUserProfile } from '@/lib/firestore';
import ErrorBoundary from '@/components/app/error-boundary';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { updateUserProfile } from '@/lib/firestore';

/**
 * The main application shell component.
 *
 * This component acts as the primary layout for the authenticated application,
 * wrapping the page content with a sidebar, header, and global providers.
 * It is responsible for handling critical cross-cutting concerns:
 * - **Authentication Guarding**: It ensures that only authenticated users can
 *   access protected routes, redirecting to `/login` if necessary.
 * - **Admin Route Protection**: It checks for administrative privileges and
 *   redirects non-admin users away from `/admin` routes.
 * - **Terms of Service Enforcement**: It verifies if a user has accepted the
 *   latest terms and displays a modal to enforce acceptance if they have not.
 *
 * @param {{children: React.ReactNode}} props - The props for the component.
 * @param {React.ReactNode} props.children - The page content to be rendered within the shell.
 * @returns {JSX.Element} The application shell component.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading, authReady, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isAcceptingTerms, setIsAcceptingTerms] = useState(false);

  useEffect(() => {
    if (!authReady) {
      return;
    }

    if (!user) {
      if (pathname !== '/login' && pathname !== '/signup' && pathname !== '/forgot-password') {
        router.push('/login');
      }
      return;
    }

    // Check for terms acceptance only once after auth is ready and user is available
    getUserProfile(user.uid).then(profile => {
      // A profile might not exist immediately after social signup, so check for `profile`
      if (profile && !profile.termsAccepted) {
        setShowTermsModal(true);
      }
    }).catch(error => {
        console.error("Failed to check user profile for terms acceptance:", error);
    });
    
    if (pathname.startsWith('/admin') && !isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You do not have permission to view this page.",
      });
      router.push('/dashboard');
    }
  }, [user, authReady, isAdmin, pathname, router, toast]);

  const handleAcceptTerms = async () => {
    if (!user) return;
    setIsAcceptingTerms(true);
    try {
      await updateUserProfile(user.uid, { termsAccepted: true });
      toast({
        title: "Welcome to Connect Hub!",
        description: "Thank you for accepting our terms.",
      });
      setShowTermsModal(false);
    } catch (error) {
      console.error("Failed to update profile for terms acceptance:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not save your acceptance. Please try again." });
    } finally {
      setIsAcceptingTerms(false);
    }
  };

  if (!authReady) {
    return <AuthLoader />;
  }
  
  // If user is not logged in, but on a public auth page, let it render
  if (!user && (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password')) {
     return <>{children}</>;
  }

  // If auth is ready, but there's no user, show loader while redirecting
  if (!user) {
    return <AuthLoader />;
  }

  // This check ensures that if a non-admin somehow lands on the admin route,
  // we don't render anything before the redirect in useEffect kicks in.
  if (pathname.startsWith('/admin') && !isAdmin) {
      return <AuthLoader />;
  }
  
  return (
    <>
      <SidebarProvider>
        <Sidebar collapsible="icon" variant="floating">
          <SidebarNav />
        </Sidebar>
        <SidebarInset>
          <ErrorBoundary>
            <div className="flex flex-col h-screen">
              <Header />
              <main className="flex-1 overflow-y-auto bg-secondary/50 p-4 md:p-6 lg:p-8">
                {children}
              </main>
            </div>
          </ErrorBoundary>
        </SidebarInset>
      </SidebarProvider>
      <Dialog open={showTermsModal} onOpenChange={setShowTermsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Connect Hub!</DialogTitle>
            <DialogDescription>
              To continue, please review and accept our updated terms of service and privacy policy.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm">
            By clicking &quot;I Agree,&quot; you confirm you&apos;ve read and agree to our:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <Link href="/legal/terms" target="_blank" className="text-primary underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" target="_blank" className="text-primary underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <DialogFooter>
            <Button onClick={handleAcceptTerms} disabled={isAcceptingTerms}>
              {isAcceptingTerms ? 'Saving...' : 'I Agree and Continue'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
