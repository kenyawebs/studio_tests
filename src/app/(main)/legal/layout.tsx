
/**
 * The layout for legal pages.
 *
 * This component provides a consistent layout for legal documents such
 * as the Terms of Service and Privacy Policy. It centers the content
 * within a container and provides a subtle background color.
 *
 * @param {{children: React.ReactNode}} props - The props for the component.
 * @param {React.ReactNode} props.children - The content of the specific legal page to be rendered.
 * @returns {JSX.Element} The legal layout component.
 */
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-secondary/50">
        <div className="min-h-screen container mx-auto py-8">
            {children}
        </div>
    </div>
  );
}
