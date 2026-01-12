import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solvatech.vercel.app"),
  title: {
    default: "SolveTech | Ingeniería de Software & Consultoría Digital",
    template: "%s | SolveTech"
  },
  description: "Consultoría de software y desarrollo web de élite. Especialistas en desarrollar tu página web, sistemas a medida, e-commerce escalables y arquitectura digital bajo la marca SolveTech.",
  keywords: [
    "solvetech",
    "software a medida",
    "desarrollar mi página web",
    "crear sitio web profesional",
    "desarrollo web premium",
    "next.js paraguay",
    "ingeniería de software",
    "sistemas de gestión paraguay"
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
    title: "SolveTech | Soluciones Tecnológicas de Élite",
    description: "Transformamos negocios con infraestructura digital de vanguardia y desarrollo de software a medida.",
    url: "https://alandev.com.py",
    siteName: "SolveTech",
    locale: "es_PY",
    type: "website",
  },
  verification: {
    google: "VlBerPqiUySA7idLeMLX8ijEjX8BHYLYKZ5sOHDD6xg",
  },
  twitter: {
    card: "summary_large_image",
    title: "SolveTech | Ingeniería de Software Premium",
    description: "Expertos en consultoría tecnológica y desarrollo de sistemas escalables.",
    creator: "@alanalcarazpy", // Ajustar si el usuario tiene otro handle
  },
  alternates: {
    canonical: "https://solvatech.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "SolveTech",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
