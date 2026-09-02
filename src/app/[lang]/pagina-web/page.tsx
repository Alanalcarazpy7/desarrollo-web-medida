import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  const title = isEn
    ? "Landing page for your business | SolvaTech"
    : "Landing page para tu negocio | SolvaTech";
  const description = isEn
    ? "A clear, fast landing page that sends people to your WhatsApp. Launch price Gs. 850,000, live in 4 to 7 days. See real work and request a proposal."
    : "Landing page moderna, lista para el celular y con WhatsApp. Precio lanzamiento Gs. 850.000, online en 4 a 7 días. Mirá trabajos reales y pedí tu propuesta.";

  // Landing de campañas: una sola URL canónica (es), sin versión en indexable
  // para no diluir con contenido casi idéntico.
  return {
    title,
    description,
    alternates: {
      canonical: "https://solvatech.com.py/es/pagina-web",
    },
    robots: isEn ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: "https://solvatech.com.py/es/pagina-web",
      siteName: "SolvaTech",
      locale: "es_PY",
      type: "website",
    },
  };
}

export default function Page() {
  return <LandingPage />;
}
