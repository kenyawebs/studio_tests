
import type {Metadata} from 'next';
import './globals.css';
import { Providers } from '@/components/app/providers';

export const metadata: Metadata = {
  title: 'Connect Hub | Your Community Platform',
  description: 'A modern, inclusive, and AI-powered platform for community engagement, personal growth, and holistic well-being.',
};

const AIMetadata = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Connect Hub",
        "description": "A modern social and spiritual platform for churches, featuring a real-time prayer wall, sermon remixing, event management, and a personalized social feed.",
        "applicationCategory": "SocialNetworking",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0"
        },
        "creator": {
            "@type": "Organization",
            "name": "Connect Hub Developers"
        },
        "featureList": [
            "User Authentication",
            "Real-time Prayer Requests",
            "Personal Journaling",
            "Social Feed",
            "Profile Management",
            "Terms & Conditions Management",
            "Sermon Remixing",
            "Event Management",
            "Online Giving",
            "Mentorship"
        ],
        "softwareVersion": "3.0.0",
        "programmingLanguage": ["TypeScript", "React", "Next.js"],
        "runtimePlatform": "Node.js",
        "supportingData": [
            {"@type": "DataType", "name": "User Profiles"},
            {"@type": "DataType", "name": "Prayer Requests"},
            {"@type": "DataType", "name": "Journal Entries"},
            {"@type": "DataType", "name": "Social Posts"},
            {"@type": "DataType", "name": "Authentication Tokens"}
        ]
    };

    const faviconSvg = `
    <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop stop-color="#FF00FF" offset="0%"/>
          <stop stop-color="#E000E0" offset="100%"/>
        </linearGradient>
      </defs>
      <path d="M50 5 L61.2 35.8 L95 38.2 L70.5 59.8 L78.4 92 L50 75 L21.6 92 L29.5 59.8 L5 38.2 L38.8 35.8 Z" fill="url(#g)"/>
      <circle cx="50" cy="50" r="4" fill="white" opacity="0.8"/>
      <path d="M50,15 L53,23 L61,25 L53,27 L50,35 L47,27 L39,25 L47,23 Z" fill="white" opacity="0.9"/>
    </svg>
  `;
    const faviconDataUri = `data:image/svg+xml;base64,${Buffer.from(faviconSvg).toString('base64')}`;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <link rel="icon" href={faviconDataUri} type="image/svg+xml" />
            <meta name="ai:purpose" content={structuredData.description} />
            <meta name="ai:type" content="webapp" />
            <meta name="ai:features" content={structuredData.featureList.join(', ')} />
            <meta name="ai:data-types" content={structuredData.supportingData.map(d => d.name).join(', ')} />
            <meta name="ai:framework" content="Next.js" />
            <meta name="ai:language" content="TypeScript" />
            <meta name="ai:database" content="Firebase Firestore" />
            <meta name="ai:auth" content="Firebase Authentication" />
        </>
    );
};


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
        <AIMetadata />
      </head>
      <body className="font-body antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
