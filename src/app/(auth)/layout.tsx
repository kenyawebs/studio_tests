import { Sparkles } from "lucide-react";

/**
 * The layout for authentication pages.
 *
 * This component provides a consistent layout for pages like login, signup,
 * and forgot password. It centers the content vertically and horizontally
 * and displays the application logo.
 *
 * @param {{children: React.ReactNode}} props - The props for the component.
 * @param {React.ReactNode} props.children - The content of the specific auth page to be rendered.
 * @returns {JSX.Element} The authentication layout component.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
                <div className="bg-primary p-3 rounded-xl">
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h1 className="text-3xl font-bold text-primary">Connect Hub</h1>
            </div>
        </div>
        {children}
      </div>
    </div>
  );
}
