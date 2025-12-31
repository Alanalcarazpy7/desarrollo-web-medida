import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alandev.com.py"),
  title: {
    default: "Alan Dev | Desarrollo Web a Medida & Software de Alto Rendimiento",
    template: "%s | Alan Dev"
  },
  description: "Desarrollador full-stack especializado en soluciones digitales premium. Creación de software a medida, e-commerce escalables y sistemas de gestión de alto impacto.",
  keywords: [
    "desarrollo web paraguay",
    "programador freelance",
    "software a medida",
    "aplicaciones web modernas",
    "next.js developer",
    "diseño web premium",
    "alan dev",
    "sistemas de gestion"
  ],
  authors: [{ name: "Alan Alcaraz", url: "https://alandev.com.py" }],
  creator: "Alan Alcaraz",
  publisher: "Alan Alcaraz",
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
    title: "Alan Dev | Desarrollo Web a Medida",
    description: "Transformo tus ideas en experiencias digitales excepcionales con tecnología de vanguardia.",
    url: "https://alandev.com.py",
    siteName: "Alan Dev Portfolio",
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alan Dev | Desarrollador de Software Premium",
    description: "Especialista en desarrollo de software a medida y alto rendimiento.",
    creator: "@alanalcarazpy", // Ajustar si el usuario tiene otro handle
  },
  alternates: {
    canonical: "https://alandev.com.py",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Alan Dev",
  "image": "https://alandev.com.py/icon.png", // Ajustar si hay un logo real
  "@id": "https://alandev.com.py",
  "url": "https://alandev.com.py",
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
      </body>
    </html>
  );
}
