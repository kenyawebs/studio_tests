
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
      <rect width="100" height="100" rx="20" fill="#FF00FF"/>
      <path d="M50 30 L55 45 L70 50 L55 55 L50 70 L45 55 L30 50 L45 45 Z" fill="white" opacity="0.9"/>
      <path d="M75 25 L78 33 L85 36 L78 39 L75 47 L72 39 L65 36 L72 33 Z" fill="white" opacity="0.7"/>
      <path d="M25 60 L28 65 L33 67 L28 69 L25 74 L22 69 L17 67 L22 65 Z" fill="white" opacity="0.6"/>
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
