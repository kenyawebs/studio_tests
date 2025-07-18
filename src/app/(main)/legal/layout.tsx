
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
