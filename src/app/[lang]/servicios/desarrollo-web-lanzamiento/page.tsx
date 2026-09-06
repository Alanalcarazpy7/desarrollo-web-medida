import type { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

const BASE_URL = "https://solvatech.com.py";

/**
 * "Promo Lanzamiento" se unificó con la Web Básica: es la misma web de
 * entrada, solo que presentada como oferta. Esta ruta ahora redirige a la
 * página de la Web Básica para no tener dos páginas casi iguales.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const loc = lang === "en" ? "en" : "es";
  return {
    alternates: { canonical: `${BASE_URL}/${loc}/servicios/desarrollo-web-basica` },
    robots: { index: false, follow: true },
  };
}

export default async function PromoLanzamientoRedirect({ params }: Props) {
  const { lang } = await params;
  const loc = lang === "en" ? "en" : "es";
  redirect(`/${loc}/servicios/desarrollo-web-basica`);
}
