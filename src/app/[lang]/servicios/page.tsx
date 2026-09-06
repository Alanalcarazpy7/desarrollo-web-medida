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
    const isEs = lang !== "en";
    const loc = isEs ? "es" : "en";
    const base = "https://solvatech.com.py";

    const services: [string, string][] = [
        ["Desarrollo Web en Paraguay", "/servicios/desarrollo-web-paraguay"],
        [isEs ? "Web Básica" : "Basic Website", "/servicios/desarrollo-web-basica"],
        [isEs ? "Catálogo digital / Menú" : "Digital Catalog / Menu", "/servicios/desarrollo-web-catalogo"],
        [isEs ? "Web Estándar" : "Standard Website", "/servicios/desarrollo-web-estandar"],
        [isEs ? "Web Pro" : "Web Pro", "/servicios/desarrollo-web-pro"],
        [isEs ? "Sistemas a medida" : "Custom systems", "/servicios/sistemas-informaticos-paraguay"],
        [isEs ? "Posicionamiento en Google" : "Google & Maps SEO", "/servicios/posicionamiento-google"],
        [isEs ? "Hosting web administrado" : "Managed web hosting", "/servicios/hosting-web-administrado"],
        [isEs ? "Dominio y configuración" : "Domain & setup", "/servicios/dominio-configuracion-web"],
        [isEs ? "Soporte web básico" : "Basic web support", "/servicios/soporte-web-basico"],
    ];

    const itemListLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: isEs ? "Servicios de SolvaTech" : "SolvaTech services",
        itemListElement: services.map(([name, p], i) => ({
            "@type": "ListItem",
            position: i + 1,
            name,
            url: `${base}/${loc}${p}`,
        })),
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: isEs ? "Inicio" : "Home", item: `${base}/${loc}` },
            { "@type": "ListItem", position: 2, name: isEs ? "Servicios" : "Services", item: `${base}/${loc}/servicios` },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <ServiciosPageContent lang={lang} />
        </>
    );
}
