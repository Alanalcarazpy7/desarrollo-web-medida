export interface Testimonial {
    id: string;
    /** Nombre de la persona de contacto, solo si el cliente lo compartió para uso público. */
    clientName?: string;
    businessName: string;
    projectName: string;
    /** Cargo o rol del cliente dentro del negocio, si se conoce. */
    role?: string;
    projectType: string;
    projectUrl?: string;
    status: "development" | "published" | "proposal";
    logo?: string;
    screenshot?: string;
    /** Iniciales para avatar abstracto cuando no hay foto autorizada. */
    initials: string;
    testimonialType: "text" | "video";
    videoUrl?: string;
    testimonialText?: string;
    // hasPermission: true unicamente cuando el cliente autorizo explicitamente
    // publicar su testimonio/nombre. Mientras sea false, se muestra un
    // placeholder etico ("pendiente de aprobacion"), nunca una frase inventada.
    hasPermission: boolean;
    isApproved: boolean;
    /** Se muestra en el bloque principal destacado de la sección. */
    featured: boolean;
    /**
     * Calificación real (1-5) que el cliente dio explícitamente. NO poner un
     * valor "de relleno": si no hay una calificación real confirmada, se deja
     * undefined y la card simplemente no muestra estrellas.
     */
    rating?: number;
    /**
     * true SOLO en sampleTestimonialsData (abajo). Marca contenido ficticio
     * usado para maquetar el diseño mientras no hay suficientes testimonios
     * reales. Nunca poner true en un registro real.
     */
    isSample?: boolean;
}

export const testimonialsData: Testimonial[] = [
    {
        id: "morinigo-asociados",
        clientName: "Nelson",
        businessName: "Morinigo y Asociados",
        projectName: "Web institucional",
        role: "Auditores y consultores de empresas",
        projectType: "Web institucional",
        projectUrl: "https://www.morinigoyasociados.com.py/",
        status: "published",
        logo: "/projects/morinigo-logo.png",
        screenshot: "/projects/morinigo-social.png",
        initials: "N",
        testimonialType: "text",
        testimonialText: "Buscábamos un diseño serio pero moderno, y la verdad que captaron la idea al toque. Nos armaron una web impecable que transmite exactamente la confianza que nuestros clientes necesitan. Súper profesionales en todo el proceso.",
        hasPermission: true,
        isApproved: true,
        featured: true,
        rating: 5
    },
    {
        id: "gestion-de-residencias",
        businessName: "Gestión de Residencias",
        projectName: "Web institucional",
        role: "Gestión de residencia para extranjeros",
        projectType: "Web institucional",
        projectUrl: "https://www.gestionderesidencias.com.py/",
        status: "published",
        logo: "/projects/gestion-de-residencia-logo.png",
        screenshot: "/projects/gestion-de-residencias.png",
        initials: "GR",
        testimonialType: "text",
        // Texto provisorio cargado con autorización del dueño de SolvaTech
        // (el cliente aprobó publicar testimonio). Reemplazar por las
        // palabras textuales del cliente cuando las envíe.
        testimonialText: "Queríamos algo serio y fácil de entender para clientes del exterior. Quedó claro, rápido y empezaron a llegar más consultas.",
        hasPermission: true,
        isApproved: true,
        featured: false,
        rating: 5
    },
    {
        id: "academia-gps",
        businessName: "Academia GPS / La Trilogía TOL",
        projectName: "Landing page de venta",
        projectType: "Landing page de venta",
        projectUrl: "https://www.academiagps.com/",
        status: "published",
        logo: "/projects/academia-gps-logo.svg",
        screenshot: "/videos/academia-gps-poster.jpg",
        initials: "GPS",
        testimonialText: "Excelente trabajo en el desarrollo de la página promocional. El diseño es limpio, ordenado y facilita una navegación ágil para los interesados. Una propuesta estética impecable que representa muy bien el nivel de nuestros cursos.",
        testimonialType: "video",
        videoUrl: "/videos/academia-gps.mp4",
        hasPermission: true,
        isApproved: true,
        featured: false,
        rating: 5
    }
];

/**
 * Testimonios FICTICIOS de prueba, pedidos explícitamente por el cliente
 * (SolvaTech) para maquetar cómo se ve la sección de texto con más tarjetas
 * y estrellas mientras solo hay 2 casos reales confirmados. Nombres y
 * negocios inventados, sin relación con personas o empresas reales.
 *
 * IMPORTANTE: esto es contenido de relleno para revisión de diseño, NO debe
 * quedar así en el sitio publicado a usuarios reales. Antes de un deploy a
 * producción con tráfico real, quitar este array de donde se use (o
 * reemplazarlo por testimonios reales confirmados).
 */
export const sampleTestimonialsData: Testimonial[] = [
    {
        id: "sample-barberia-central",
        clientName: "Laura Gómez",
        businessName: "Barbería Central",
        projectName: "Landing page",
        role: "Dueña",
        projectType: "Landing page",
        status: "published",
        initials: "LG",
        testimonialType: "text",
        testimonialText: "Desde que tenemos la página las reservas por WhatsApp se duplicaron. Se ve profesional y carga rápido incluso con poco internet.",
        hasPermission: true,
        isApproved: true,
        featured: false,
        rating: 5,
        isSample: true
    },
    {
        id: "sample-veterinaria-san-francisco",
        clientName: "Marcos Duarte",
        businessName: "Veterinaria San Francisco",
        projectName: "Sitio web institucional",
        role: "Veterinario",
        projectType: "Sitio institucional",
        status: "published",
        initials: "MD",
        testimonialType: "text",
        testimonialText: "El proceso fue rápido y sin vueltas. Me explicaron todo en criollo, sin tecnicismos, y el resultado final superó lo que imaginaba.",
        hasPermission: true,
        isApproved: true,
        featured: false,
        rating: 5,
        isSample: true
    },
    {
        id: "sample-fitzone",
        clientName: "Camila Ríos",
        businessName: "FitZone Gimnasio",
        projectName: "Landing page de venta",
        role: "Encargada",
        projectType: "Landing page",
        status: "published",
        initials: "CR",
        testimonialType: "text",
        testimonialText: "Nos armaron una página que realmente vende los planes. Los clientes nuevos ya llegan preguntando por las promos que ven ahí.",
        hasPermission: true,
        isApproved: true,
        featured: false,
        rating: 4,
        isSample: true
    },
    {
        id: "sample-sabores-del-chaco",
        clientName: "Diego Benítez",
        businessName: "Sabores del Chaco",
        projectName: "Web con pedidos",
        role: "Dueño",
        projectType: "Web + pedidos",
        status: "published",
        initials: "DB",
        testimonialType: "text",
        testimonialText: "Buena comunicación en todo momento y entregaron antes de lo pactado. El diseño quedó acorde a lo que buscábamos para el local.",
        hasPermission: true,
        isApproved: true,
        featured: false,
        rating: 5,
        isSample: true
    },
    {
        id: "sample-bella-casa",
        clientName: "Valentina Cáceres",
        businessName: "Bella Casa Inmobiliaria",
        projectName: "Sitio institucional",
        role: "Agente inmobiliaria",
        projectType: "Sitio institucional",
        status: "published",
        initials: "VC",
        testimonialType: "text",
        testimonialText: "Muy atentos a los detalles y abiertos a los cambios que pedimos en el camino. Quedamos muy conformes con el resultado final.",
        hasPermission: true,
        isApproved: true,
        featured: false,
        rating: 5,
        isSample: true
    }
];
