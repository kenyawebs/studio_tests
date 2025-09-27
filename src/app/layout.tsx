
import type {Metadata} from 'next';
import './globals.css';
import { Providers } from '@/components/app/providers';

export const metadata: Metadata = {
  title: 'Connect Hub | Your Community Platform',
  description: 'A modern, inclusive, and AI-powered platform for community engagement, personal growth, and holistic well-being.',
};

/**
 * The root layout for the entire application.
 *
 * This component wraps all pages and provides the basic HTML structure,
 * including the `<html>` and `<body>` tags. It also sets up global fonts
 * and wraps the application in the `Providers` component.
 *
 * @param {Readonly<{children: React.ReactNode}>} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
