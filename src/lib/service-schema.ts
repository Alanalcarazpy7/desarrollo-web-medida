const BASE_URL = "https://solvatech.com.py";

export type Faq = { q: string; a: string };

export interface ServiceJsonLdInput {
  /** "es" | "en" (cualquier otro valor cae en "es") */
  lang: string;
  /** Ruta sin locale, empezando con "/". Ej: "/servicios/desarrollo-web-basica" */
  path: string;
  /** Nombre del servicio (suele ser el H1 de la página) */
  name: string;
  /** Descripción corta del servicio */
  description: string;
  /** Etiqueta de la última miga de pan */
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbServices: string;
  /** Preguntas frecuentes de la página, si las hay */
  faqs?: Faq[];
  /** Tipo de servicio para schema.org. Por defecto "Desarrollo web" / "Web development" */
  serviceType?: string;
}

export interface ServiceJsonLdNodes {
  service: Record<string, unknown>;
  breadcrumb: Record<string, unknown>;
  faqPage: Record<string, unknown> | null;
}

/**
 * Genera los nodos JSON-LD (Service + BreadcrumbList + FAQPage) para una
 * página de servicio. Centraliza el formato para que todas las páginas de
 * /servicios expongan datos estructurados consistentes.
 */
export function buildServiceJsonLd(input: ServiceJsonLdInput): ServiceJsonLdNodes {
  const locale = input.lang === "en" ? "en" : "es";
  const url = `${BASE_URL}/${locale}${input.path}`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType || (locale === "en" ? "Web development" : "Desarrollo web"),
    url,
    areaServed: { "@type": "Country", name: "Paraguay" },
    provider: {
      "@type": "Organization",
      name: "SolvaTech",
      url: BASE_URL,
      telephone: "+595994295092",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: input.breadcrumbHome, item: `${BASE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: input.breadcrumbServices,
        item: `${BASE_URL}/${locale}/servicios`,
      },
      { "@type": "ListItem", position: 3, name: input.breadcrumbLabel, item: url },
    ],
  };

  const faqPage =
    input.faqs && input.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: input.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return { service, breadcrumb, faqPage };
}
