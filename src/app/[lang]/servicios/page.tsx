import { Metadata } from "next";
import ServiciosPageContent from "@/components/ServiciosPageContent";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const baseUrl = "https://solvatech.com.py";
    const path = "/servicios";
    const isEs = lang === 'es';

    const title = isEs
      ? "Servicios Digitales | Páginas Web, Catálogos y Sistemas | SolvaTech"
      : "Digital Services | Web Development & Custom Software | SolvaTech";

    const description = isEs
      ? "Diseñamos páginas web, catálogos digitales y sistemas para negocios en Paraguay. Soluciones profesionales con botón a WhatsApp, diseño responsive y presencia online."
      : "We design websites, digital catalogs, and custom systems for businesses. Professional solutions with WhatsApp integration, responsive design, and local SEO.";

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/${lang}${path}`,
            languages: {
                'es': `${baseUrl}/es${path}`,
                'es-PY': `${baseUrl}/es${path}`,
                'en': `${baseUrl}/en${path}`,
                'x-default': `${baseUrl}/es${path}`,
            }
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/${lang}${path}`,
            locale: isEs ? "es_PY" : "en_US",
            type: "website",
        }
    };
}

export default async function ServiciosGeneralPage({ params }: Props) {
    const { lang } = await params;
    return <ServiciosPageContent lang={lang} />;
}
