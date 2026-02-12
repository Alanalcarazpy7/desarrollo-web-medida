import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solvatech.vercel.app"),
  title: {
    default: "SolvaTech | Agencia de Desarrollo Web & Marketing Digital",
    template: "%s | SolvaTech"
  },
  description: "SolvaTech es tu agencia de desarrollo web y marketing digital en Paraguay. Expertos en páginas web, tiendas online (e-commerce), SEO y software a medida para potenciar tu negocio.",
  keywords: [
    "solvatech",
    "desarrollo web paraguay",
    "diseño web asunción",
    "agencia de marketing digital",
    "crear tienda online paraguay",
    "software a medida",
    "programadores en paraguay",
    "servicios digitales"
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
    title: "SolvaTech | Soluciones Digitales & Desarrollo Web",
    description: "Impulsamos tu negocio con sitios web de alto rendimiento y estrategias de marketing digital efectivas en Paraguay.",
    url: "https://solvatech.vercel.app",
    siteName: "SolvaTech",
    locale: "es_PY",
    type: "website",
  },
  verification: {
    google: "VlBerPqiUySA7idLeMLX8ijEjX8BHYLYKZ5sOHDD6xg",
  },
  twitter: {
    card: "summary_large_image",
    title: "SolvaTech | Agencia Digital Premium",
    description: "Expertos en desarrollo web, e-commerce y posicionamiento SEO.",
    creator: "@alanalcarazpy", // Ajustar si el usuario tiene otro handle
  },
  alternates: {
    canonical: "https://solvatech.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "SolvaTech",
  "image": "https://solvatech.vercel.app/icon.svg",
  "@id": "https://solvatech.vercel.app",
  "url": "https://solvatech.vercel.app",
  "telephone": "+595981000000", // Ejemplo, el usuario debe ajustar
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Asunción",
    "addressLocality": "Asunción",
    "addressRegion": "Asunción",
    "postalCode": "0000",
    "addressCountry": "PY"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -25.2637,
    "longitude": -57.5759
  },
  "sameAs": [
    "https://www.linkedin.com/in/alanalcaraz",
    "https://github.com/alanalcarazpy7"
  ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LanguageProvider>
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
