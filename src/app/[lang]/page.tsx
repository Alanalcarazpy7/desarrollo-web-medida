import Navbar from "@/components/Navbar";
import BackgroundParticles from "@/components/BackgroundParticles";
import ScrollProgress from "@/components/ScrollProgress";
import HomeClient from "@/components/HomeClient";

import { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = "https://solvatech.com.py";

  const isEs = lang === 'es';

  // OJO SEO: el término de cabecera "Desarrollo Web en Paraguay" lo trabaja
  // /servicios/desarrollo-web-paraguay, que es la página principal para la
  // búsqueda general. Antes la home usaba EXACTAMENTE el mismo title y las dos
  // competían por la misma query. Acá el title arranca por la marca y agrupa
  // la oferta; la home sigue siendo relevante para Paraguay sin canibalizar.
  const title = isEs
    ? "SolvaTech | Páginas Web, Tiendas Online y Sistemas a Medida en Paraguay"
    : "Custom Web Development & Software Agency";

  const description = isEs
    ? "Estudio paraguayo de páginas web, landing pages, catálogos y software a medida. Trabajás directo con quien desarrolla, sin intermediarios. Pedí tu presupuesto."
    : "Premium web development and custom software solutions. We build high-performance websites, landing pages, and web apps for global businesses.";

  const keywords = isEs
    ? ["solvatech", "paginas web paraguay", "tienda online paraguay", "catalogo digital paraguay", "software a medida paraguay", "agencia de software paraguay"]
    : ["custom web development", "software agency", "high performance websites", "custom web apps", "landing page design", "nextjs developers"];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${title} | SolvaTech`,
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
    </main>
  );
}