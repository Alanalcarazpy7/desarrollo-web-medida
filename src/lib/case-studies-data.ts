export interface CaseStudy {
    id: string;
    slug: string;
    name: string;
    /** Nombre de la persona de contacto, solo si el cliente lo compartió para uso público. */
    clientName?: string;
    businessName: string;
    logo?: string;
    /** Captura o mockup del proyecto. */
    image?: string;
    status: "development" | "published" | "proposal";
    // Solo se muestran públicamente los casos confirmados (visible: true).
    // "proposal" se deja documentado a nivel interno y nunca se renderiza.
    visible: boolean;
    /** Demo pública temporal (hosting gratuito / subdominio de desarrollo). No es el dominio final del cliente. */
    demoUrl?: string;
    /** Sitio oficial y publicado del cliente. */
    projectUrl?: string;
    /** Permiso confirmado para mostrar logo/captura de este proyecto públicamente. */
    hasPermission: boolean;
    tags?: string[];
    translations: {
        es: {
            type: string;
            problem: string;
            solution: string;
        };
        en: {
            type: string;
            problem: string;
            solution: string;
        };
    };
}

export const caseStudiesData: CaseStudy[] = [
    {
        id: "academia-gps",
        slug: "academia-gps",
        name: "Academia GPS / La Trilogía TOL",
        businessName: "Academia GPS",
        logo: "/projects/academia-gps-logo.svg",
        status: "development",
        visible: true,
        demoUrl: "https://www.academiagps.com/",
        hasPermission: true,
        tags: ["Landing de conversión", "Integración WhatsApp", "Integración Pagopar", "Diseño responsive"],
        translations: {
            es: {
                type: "Landing page de venta",
                problem: "Vender una formación online premium con una estructura comercial clara, buena presentación de la oferta y medios de pago.",
                solution: "Landing orientada a conversión: presentación del programa, oferta, manejo de objeciones y botones directos a Pagopar y WhatsApp."
            },
            en: {
                type: "Sales landing page",
                problem: "Sell a premium online training program with a clear commercial structure, a well-presented offer, and payment options.",
                solution: "Conversion-focused landing page: program presentation, offer, objection handling, and direct buttons to Pagopar and WhatsApp."
            }
        }
    },
    {
        id: "morinigo-asociados",
        slug: "morinigo-y-asociados",
        name: "Morinigo y Asociados",
        clientName: "Nelson",
        businessName: "Morinigo y Asociados",
        logo: "/projects/morinigo-logo.png",
        image: "/projects/morinigo-social.png",
        status: "published",
        visible: true,
        projectUrl: "https://www.morinigoyasociados.com.py/",
        hasPermission: true,
        tags: ["Sitio institucional", "Diseño responsive", "Formulario de contacto"],
        translations: {
            es: {
                type: "Web profesional para estudio jurídico",
                problem: "Presencia profesional online para un estudio de auditores y consultores, mostrando sus servicios legales y contables.",
                solution: "Sitio institucional con presentación del estudio, servicios, información de contacto y diseño adaptado a celular."
            },
            en: {
                type: "Professional website for a law firm",
                problem: "Professional online presence for a firm of auditors and consultants, showcasing their legal and accounting services.",
                solution: "Institutional website with firm presentation, services, contact information, and mobile-friendly design."
            }
        }
    },
    {
        id: "gestion-de-residencias",
        slug: "gestion-de-residencias",
        name: "Gestión de Residencias",
        businessName: "Gestión de Residencias",
        logo: "/projects/gestion-de-residencia-logo.png",
        image: "/projects/gestion-de-residencias.png",
        status: "published",
        visible: true,
        projectUrl: "https://www.gestionderesidencias.com.py/",
        hasPermission: true,
        tags: ["Sitio institucional", "Diseño responsive", "Captación de consultas"],
        translations: {
            es: {
                type: "Web para gestoría de residencias",
                problem: "Presentar de forma clara y confiable los servicios de gestión de residencia para extranjeros y facilitar el contacto de nuevos interesados.",
                solution: "Sitio institucional con explicación de servicios, proceso y datos de contacto, con diseño adaptado a celular y foco en generar consultas."
            },
            en: {
                type: "Website for a residence-permit firm",
                problem: "Clearly and reliably present residence-permit services for foreigners and make it easy for new prospects to get in touch.",
                solution: "Institutional website explaining services, process, and contact details, with mobile-friendly design focused on generating enquiries."
            }
        }
    },
    // Propuesta comercial en conversación, cliente aún no confirmado.
    // NO debe mostrarse públicamente como caso de éxito (visible: false).
    {
        id: "los-chilenos",
        slug: "los-chilenos-vehiculos",
        name: "Los Chilenos Vehículos",
        businessName: "Los Chilenos Vehículos",
        status: "proposal",
        visible: false,
        hasPermission: false,
        translations: {
            es: {
                type: "Catálogo web de vehículos",
                problem: "Mostrar el stock de vehículos, modelos y precios con contacto directo por WhatsApp.",
                solution: "Propuesta de catálogo web en conversación, aún no confirmada por el cliente."
            },
            en: {
                type: "Vehicle web catalog",
                problem: "Show vehicle stock, models, and prices with direct WhatsApp contact.",
                solution: "Proposed web catalog under discussion, not yet confirmed by the client."
            }
        }
    }
];
