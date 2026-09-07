/**
 * Contenido ampliado de las fichas de proyecto.
 *
 * Va aparte de projects-data.ts para que sumar un caso sea escribir texto y
 * nada más, sin tocar la estructura de datos del portfolio.
 *
 * ================== REGLAS DE CONTENIDO ==================
 *
 * 1. `situation` y `approach` describen QUÉ necesitaba el negocio y QUÉ se
 *    construyó. Son hechos del proyecto, en lenguaje de cliente: nada de
 *    nombres de lenguajes, frameworks ni jerga técnica.
 *
 * 2. `result` es OPCIONAL y va ÚNICAMENTE con datos que el cliente confirmó
 *    ("ahora recibo el doble de consultas", "dejamos de pagar comisión").
 *    Si no hay un dato real confirmado, se deja sin definir y la sección
 *    simplemente no aparece. NO se inventan métricas: una cifra inventada en
 *    un caso de éxito es lo más caro que se puede publicar.
 *
 * 3. Un proyecto sin entrada acá igual tiene su ficha: se muestra con la
 *    descripción y las etiquetas que ya están en projects-data.
 */

export interface ProjectCase {
    /** Qué necesitaba el negocio antes de empezar. */
    situation: { es: string; en: string };
    /** Qué se construyó, en lenguaje llano. */
    approach: { es: string[]; en: string[] };
    /** Solo con datos confirmados por el cliente. Sin esto, no se renderiza. */
    result?: { es: string; en: string };
}

export const projectCases: Record<string, ProjectCase> = {
    "academia-gps": {
        situation: {
            es: "Academia GPS vende formación online para profesionales de la salud que quieren dirigir su propia clínica. El programa se explicaba por mensajes y llamadas, así que cada interesado llegaba con las mismas dudas: qué incluye, cuánto dura, cuánto cuesta y cómo se paga. Hacía falta un solo lugar que respondiera todo eso y dejara a la persona lista para inscribirse.",
            en: "Academia GPS sells online training for healthcare professionals who want to run their own clinic. The programme was explained through messages and calls, so every prospect arrived with the same doubts: what it includes, how long it lasts, what it costs and how to pay. They needed one place that answered all of it and left the person ready to enrol.",
        },
        approach: {
            es: [
                "Una sola página larga, ordenada como una conversación de venta: primero a quién le sirve, después qué aprende, después el precio y recién al final el botón de pago.",
                "Las objeciones más frecuentes contestadas de antemano, para que la persona no tenga que preguntar por privado.",
                "Video de presentación de la fundadora, que es lo que más confianza genera en una formación.",
                "Botón de pago directo por Pagopar y botón de WhatsApp para quien todavía prefiere hablar antes de decidir.",
                "Pensada primero para el celular, que es desde donde llega casi todo el tráfico de redes.",
            ],
            en: [
                "A single long page, structured like a sales conversation: who it is for, then what you learn, then the price, and only at the end the payment button.",
                "The most common objections answered up front, so people do not have to ask in private messages.",
                "An introduction video from the founder, which is what builds the most trust in a training programme.",
                "A direct Pagopar payment button and a WhatsApp button for those who still prefer to talk first.",
                "Built mobile first, since almost all the traffic arrives from social media.",
            ],
        },
    },

    "morinigo-y-asociados": {
        situation: {
            es: "Morinigo & Asociados es un estudio de auditores y consultores que trabaja con empresas y contribuyentes. En ese rubro la decisión se toma por confianza: el cliente potencial busca el nombre del estudio antes de llamar, y lo que encuentra tiene que transmitir trayectoria y seriedad. No tener sitio propio jugaba en contra frente a estudios más chicos pero mejor presentados.",
            en: "Morinigo & Asociados is a firm of auditors and consultants working with companies and taxpayers. In this field the decision is made on trust: a prospective client searches for the firm's name before calling, and what they find has to convey track record and seriousness. Not having their own site worked against them versus smaller but better presented firms.",
        },
        approach: {
            es: [
                "Sitio institucional con una página por área: contabilidad, tributación, auditoría, consultoría y asesoramiento legal.",
                "Cada servicio explicado en sus propias palabras, sin copiar textos genéricos que se ven en cualquier estudio.",
                "Sección de trayectoria, que en este rubro es el argumento de venta más fuerte.",
                "Formulario de contacto y solicitud de asesoramiento, para que la consulta llegue ordenada y no como un mensaje suelto.",
                "Diseño sobrio y adaptado al celular, con la información de contacto siempre a mano.",
            ],
            en: [
                "An institutional site with a page per area: accounting, tax, audit, consulting and legal advice.",
                "Each service explained in their own words, not generic copy you see on any firm's site.",
                "A track record section, which in this field is the strongest selling point.",
                "A contact and advisory request form, so enquiries arrive organised instead of as loose messages.",
                "A restrained, mobile-friendly design with contact details always within reach.",
            ],
        },
    },

    "gestion-de-residencias": {
        situation: {
            es: "Gestión de Residencias acompaña a extranjeros que quieren tramitar su residencia y su cédula en Paraguay. Es un trámite que la gente investiga con dudas y desde afuera del país, muchas veces en otro idioma y sin saber en quién confiar. La web tenía que explicar el proceso completo y despejar el miedo de mandar documentos a alguien que no se conoce.",
            en: "Gestión de Residencias helps foreigners apply for residency and an ID card in Paraguay. It is a process people research full of doubts and from outside the country, often in another language and without knowing who to trust. The site had to explain the whole process and remove the fear of sending documents to someone you have never met.",
        },
        approach: {
            es: [
                "El trámite explicado paso a paso, con qué hace el cliente y qué hace la gestoría en cada etapa.",
                "Mensaje del fundador en video, para poner una cara detrás del servicio.",
                "Evaluación gratuita del caso como primer paso, que baja mucho la barrera para escribir.",
                "Secciones separadas para residencia y para cédula, porque son consultas distintas.",
                "Botón de contacto siempre visible y sitio preparado para visitas desde el exterior.",
            ],
            en: [
                "The process explained step by step, showing what the client does and what the agency does at each stage.",
                "A video message from the founder, to put a face behind the service.",
                "A free case assessment as the first step, which greatly lowers the barrier to reaching out.",
                "Separate sections for residency and for the ID card, because they are different enquiries.",
                "A always-visible contact button and a site prepared for visitors from abroad.",
            ],
        },
    },
};

export function getProjectCase(slug: string): ProjectCase | undefined {
    return projectCases[slug];
}
