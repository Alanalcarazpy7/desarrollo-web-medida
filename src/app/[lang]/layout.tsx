import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/context/LanguageContext";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solvatech.vercel.app"),
  title: {
    default: "Desarrollo Web en Paraguay | SolvaTech",
    template: "%s | SolvaTech"
  },
  description: "Creamos páginas web, landing pages y sistemas a medida en Paraguay. Sitios rápidos, modernos y optimizados para Google. Pedí tu presupuesto.",
  keywords: [
    "desarrollo web paraguay",
    "diseño web asunción",
    "agencia de software paraguay",
    "crear pagina web paraguay",
    "sistemas informaticos asuncion",
    "software a medida paraguay",
    "programadores en paraguay",
    "landing page economica paraguay"
  ],
  authors: [{ name: "Alan Alcaraz", url: "https://solvatech.vercel.app" }],
  creator: "Alan Alcaraz",
  publisher: "Alan Alcaraz",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' }
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' }
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Desarrollo Web en Paraguay | SolvaTech",
    description: "Creamos páginas web, landing pages y sistemas a medida en Paraguay. Sitios rápidos, modernos y optimizados para Google. Pedí tu presupuesto.",
    url: "https://solvatech.vercel.app",
    siteName: "SolvaTech",
    locale: "es_PY",
    type: "website",
    images: [
      {
        url: 'https://solvatech.vercel.app/solvetech-logo.png',
        width: 1200,
        height: 630,
        alt: 'SolvaTech - Desarrollo Web y Software a Medida',
      }
    ],
  },
  verification: {
    google: [
      "VlBerPqiUySA7idLeMLX8ijEjX8BHYLYKZ5sOHDD6xg",
      "IiVINjdVr64eGi07S4Gt8P4FHQEsqYvbZQPMS7lufNo",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo Web en Paraguay | SolvaTech",
    description: "Creamos páginas web, landing pages y sistemas a medida en Paraguay. Sitios rápidos, modernos y optimizados para Google. Pedí tu presupuesto.",
    creator: "@alanalcarazpy", // Ajustar si el usuario tiene otro handle
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "SolvaTech",
  "description": "Agencia de desarrollo de software a medida y diseño web en Paraguay.",
  "image": "https://solvatech.vercel.app/icon.png",
  "logo": "https://solvatech.vercel.app/solvetech-logo.png",
  "@id": "https://solvatech.vercel.app",
  "url": "https://solvatech.vercel.app",
  "telephone": "+595982880043",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Asunción",
    "addressLocality": "Asunción",
    "addressRegion": "Capital",
    "postalCode": "1209",
    "addressCountry": "PY"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -25.2637,
    "longitude": -57.5759
  },
  "sameAs": [
    "https://www.linkedin.com/in/alanalcaraz",
    "https://github.com/alanalcarazpy7",
    "https://www.instagram.com/alandev_py/"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+595982880043",
    "contactType": "Customer Service",
    "areaServed": "PY",
    "availableLanguage": ["es", "en"]
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  }
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang || "es"}>
      <body className={inter.className}>
        <LanguageProvider initialLang={(lang as "es" | "en") || "es"}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
          <SpeedInsights />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
