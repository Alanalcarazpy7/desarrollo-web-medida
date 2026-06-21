import Navbar from "@/components/Navbar";
import BackgroundParticles from "@/components/BackgroundParticles";
import ScrollProgress from "@/components/ScrollProgress";
import HomeClient from "@/components/HomeClient";
import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: true });

import { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = "https://solvatech.com.py";

  const isEs = lang === 'es';

  const title = isEs 
    ? "Desarrollo Web en Paraguay | Páginas Web y Sistemas a Medida | SolvaTech"
    : "Custom Web Development & Software Agency | SolvaTech";
  
  const description = isEs
    ? "Agencia de desarrollo web en Paraguay (Asunción, Areguá y todo el país). Creamos páginas web, landing pages y software a medida. ¡Aumentá tus ventas hoy!"
    : "Premium web development and custom software solutions. We build high-performance websites, landing pages, and web apps for global businesses.";
    
  const keywords = isEs
    ? ["desarrollo web en paraguay", "paginas web paraguay", "landing page paraguay", "desarrollo web aregua", "diseño web asuncion", "software a medida paraguay", "agencia de software paraguay"]
    : ["custom web development", "software agency", "high performance websites", "custom web apps", "landing page design", "nextjs developers"];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}`,
      siteName: "SolvaTech",
      locale: isEs ? "es_PY" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        es: `${baseUrl}/es`,
        "es-PY": `${baseUrl}/es`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/es`,
      },
    },
  };
}

export default function Home() {
  return (
    <main className="relative">
      <BackgroundParticles />
      <ScrollProgress />
      <Navbar />
      <HomeClient />
      <WhatsAppButton />
    </main>
  );
}