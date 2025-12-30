import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Desarrollo Web a Medida | Soluciones Digitales Premium",
  description: "Agencia especializada en desarrollo web personalizado, aplicaciones modernas y soluciones digitales de alto rendimiento. Transformamos ideas en experiencias digitales excepcionales.",
  keywords: ["desarrollo web", "aplicaciones web", "diseño web", "desarrollo a medida", "agencia digital"],
  authors: [{ name: "Desarrollo Web a Medida" }],
  openGraph: {
    title: "Desarrollo Web a Medida | Soluciones Digitales Premium",
    description: "Transformamos ideas en experiencias digitales excepcionales",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
