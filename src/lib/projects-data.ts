export interface Project {
    id: string;
    slug: string;
    title: string;
    categoryKey: "ecommerce" | "systems" | "website";
    technologies: string[];
    image: string;
    imageBack?: string;
    objectPosition?: string;
    featured: boolean;
    demoUrl?: string;
    repoUrl?: string;
    accessType: "live" | "image-only" | "private-system";
    translations: {
        es: {
            title: string;
            description: string;
            alt: string;
        };
        en: {
            title: string;
            description: string;
            alt: string;
        };
    };
}

export const projectsData: Project[] = [
    {
        id: "academia-gps",
        slug: "academia-gps",
        title: "Academia GPS",
        categoryKey: "website",
        technologies: ["Landing de conversión", "WhatsApp", "Pagopar"],
        image: "/projects/academia-gps-trilogia-tol.png",
        objectPosition: "left",
        featured: true,
        demoUrl: "https://www.academiagps.com/",
        accessType: "live",
        translations: {
            es: {
                title: "Academia GPS / La Trilogía TOL",
                description: "Landing page de venta para formación online, con manejo de objeciones y botones directos a Pagopar y WhatsApp.",
                alt: "Logo de Academia GPS, landing de venta para formación online"
            },
            en: {
                title: "Academia GPS / La Trilogía TOL",
                description: "Sales landing page for online training, with objection handling and direct buttons to Pagopar and WhatsApp.",
                alt: "Academia GPS logo, sales landing page for online training"
            }
        }
    },
    {
        id: "morinigo-asociados",
        slug: "morinigo-y-asociados",
        title: "Morinigo y Asociados",
        categoryKey: "website",
        technologies: ["Sitio institucional", "Diseño responsive", "Formulario de contacto"],
        image: "/projects/morinigo-y-asociados.png",
        featured: true,
        demoUrl: "https://www.morinigoyasociados.com.py/",
        accessType: "live",
        translations: {
            es: {
                title: "Morinigo y Asociados",
                description: "Web institucional para estudio de auditores y consultores, con presentación de servicios y diseño adaptado a celular.",
                alt: "Morinigo y Asociados, estudio jurídico y contable"
            },
            en: {
                title: "Morinigo y Asociados",
                description: "Institutional website for a firm of auditors and consultants, with services and mobile-friendly design.",
                alt: "Morinigo y Asociados, legal and accounting firm"
            }
        }
    },
    {
        id: "gestion-de-residencias",
        slug: "gestion-de-residencias",
        title: "Gestión de Residencias",
        categoryKey: "website",
        technologies: ["Sitio institucional", "Diseño responsive", "Captación de consultas"],
        image: "/projects/gestion-de-residencias.png",
        featured: true,
        demoUrl: "https://www.gestionderesidencias.com.py/",
        accessType: "live",
        translations: {
            es: {
                title: "Gestión de Residencias",
                description: "Sitio web para una gestoría especializada en trámites de residencia para extranjeros en Paraguay, con presentación de servicios y contacto directo.",
                alt: "Gestión de Residencias, gestoría de trámites de residencia para extranjeros en Paraguay"
            },
            en: {
                title: "Gestión de Residencias",
                description: "Website for a firm specialized in residence permit procedures for foreigners in Paraguay, presenting services and direct contact.",
                alt: "Gestión de Residencias, residence permit management firm for foreigners in Paraguay"
            }
        }
    },
    {
        id: "modashoppy",
        slug: "modashoppy",
        title: "ModaShoppy",
        categoryKey: "ecommerce",
        technologies: ["React", "Supabase", "Zustand"],
        image: "/projects/modashoppy.png",
        featured: true,
        demoUrl: "https://modashoppyy.netlify.app/",
        accessType: "live",
        translations: {
            es: {
                title: "ModaShoppy",
                description: "Plataforma de moda escalable con gestión de stock integrada y experiencia de compra optimizada.",
                alt: "Muestra de ModaShoppy, tienda online de moda"
            },
            en: {
                title: "ModaShoppy",
                description: "Scalable fashion platform with integrated stock management and optimized shopping experience.",
                alt: "Screenshot of ModaShoppy, online fashion store"
            }
        }
    },
    {
        id: "stockpro",
        slug: "stockpro",
        title: "StockPRO",
        categoryKey: "systems",
        technologies: ["React", "Supabase", "Zustand", "TanStack"],
        image: "/projects/stockpro.jpg",
        objectPosition: "left",
        featured: true,
        accessType: "image-only",
        translations: {
            es: {
                title: "StockPRO",
                description: "Gestión de inventarios de alto rendimiento con sincronización en tiempo real y dashboard analítico modular.",
                alt: "Muestra de StockPRO, sistema de control de inventarios"
            },
            en: {
                title: "StockPRO",
                description: "High-performance inventory management with real-time synchronization and modular analytics dashboard.",
                alt: "Screenshot of StockPRO, inventory control system"
            }
        }
    },
    {
        id: "global-exchange",
        slug: "global-exchange",
        title: "Global Exchange",
        categoryKey: "systems",
        technologies: ["Django", "Python", "PostgreSQL", "Docker", "JS"],
        image: "/projects/global-exchange-1.png",
        imageBack: "/projects/global-exchange-2-admin.png",
        featured: true,
        repoUrl: "https://github.com/MertinGIT/Casa-De-Cambios-De-Divisas",
        accessType: "private-system",
        translations: {
            es: {
                title: "Global Exchange",
                description: "Sistema integral para casa de cambios. Gestión de divisas, cálculo de ganancias, reportes y control de usuarios.",
                alt: "Muestra de Global Exchange, sistema de casa de cambios"
            },
            en: {
                title: "Global Exchange",
                description: "Comprehensive system for exchange houses. Currency management, profit calculation, reports, and user control.",
                alt: "Screenshot of Global Exchange, currency exchange system"
            }
        }
    },
    {
        id: "inmobiliaria",
        slug: "gestion-inmobiliaria",
        title: "Gestion Inmobiliaria",
        categoryKey: "website",
        technologies: ["React", "HTML5", "CSS3"],
        image: "/projects/inmobiliaria.jpg",
        featured: false,
        demoUrl: "https://alanalcarazpy7.github.io/gestion-inmobiliaria/",
        accessType: "live",
        translations: {
            es: {
                title: "Gestión Inmobiliaria",
                description: "Plataforma elegante para la gestión y visualización de propiedades con filtrado inteligente y UX fluida.",
                alt: "Muestra de Gestión Inmobiliaria, sitio de propiedades"
            },
            en: {
                title: "Real Estate Management",
                description: "Elegant platform for property management and visualization with intelligent filtering and fluid UX.",
                alt: "Screenshot of Real Estate Management, property website"
            }
        }
    },
    {
        id: "amsterdam",
        slug: "amsterdam-bar",
        title: "Amsterdam Bar",
        categoryKey: "website",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        image: "/projects/amsterdam.png",
        featured: false,
        demoUrl: "https://amsterdam-resto-barpy.netlify.app/",
        accessType: "live",
        translations: {
            es: {
                title: "Amsterdam Bar",
                description: "Menú digital interactivo y presencia online sofisticada diseñada para elevar la experiencia gastronómica.",
                alt: "Muestra de Amsterdam Bar, menú digital y web de resto-bar"
            },
            en: {
                title: "Amsterdam Bar",
                description: "Interactive digital menu and sophisticated online presence designed to elevate the dining experience.",
                alt: "Screenshot of Amsterdam Bar, digital menu and website"
            }
        }
    },
    {
        id: "electromaster",
        slug: "electro-master",
        title: "Electro-Master",
        categoryKey: "ecommerce",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        image: "/projects/electromaster.png",
        featured: false,
        repoUrl: "https://github.com/Alanalcarazpy7/tienda-ecommerce",
        accessType: "image-only",
        translations: {
            es: {
                title: "Electro-Master",
                description: "E-commerce de tecnología optimizado para conversiones con catálogo dinámico y diseño de alto impacto.",
                alt: "Muestra de Electro-Master, tienda online de tecnología"
            },
            en: {
                title: "Electro-Master",
                description: "Technology e-commerce optimized for conversions with dynamic catalog and high-impact design.",
                alt: "Screenshot of Electro-Master, technology e-commerce store"
            }
        }
    },
    {
        id: "foodluck",
        slug: "foodluck-resto",
        title: "Foodluck Resto",
        categoryKey: "website",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        image: "/projects/foodluck.png",
        featured: false,
        demoUrl: "https://alanalcarazpy7.github.io/restaurante-de-comida/",
        accessType: "live",
        translations: {
            es: {
                title: "Foodluck Resto",
                description: "Landing page gastronómica premium enfocada en el impacto visual y la reserva directa de clientes.",
                alt: "Muestra de Foodluck Resto, sitio web gastronómico"
            },
            en: {
                title: "Foodluck Resto",
                description: "Premium gastronomic landing page focused on visual impact and direct customer reservation.",
                alt: "Screenshot of Foodluck Resto, restaurant landing page"
            }
        }
    },
    {
        id: "vasospy",
        slug: "vasospy",
        title: "VasosPy",
        categoryKey: "ecommerce",
        technologies: ["React", "Zustand", "Firebase", "CSS3"],
        image: "/projects/VasosPy-termos.png",
        featured: true,
        demoUrl: "https://vasos-py-demo.vercel.app/",
        accessType: "live",
        translations: {
            es: {
                title: "VasosPy",
                description: "Catálogo digital interactivo para venta de termos y vasos personalizados, con integración directa a pedidos por WhatsApp.",
                alt: "Muestra de VasosPy, catálogo de termos y vasos personalizados"
            },
            en: {
                title: "VasosPy",
                description: "Interactive digital catalog for selling custom thermoses and cups, with direct integration for WhatsApp ordering.",
                alt: "Screenshot of VasosPy, custom tumblers and thermoses catalog"
            }
        }
    },
    {
        id: "bar-san-roque",
        slug: "bar-san-roque",
        title: "Bar San Roque",
        categoryKey: "website",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        image: "/projects/bar-san-roque.png",
        featured: false,
        demoUrl: "https://bar-san-roque-demo.vercel.app/",
        accessType: "live",
        translations: {
            es: {
                title: "Bar San Roque",
                description: "Presencia web moderna y elegante para bar histórico, destacando menú digital interactivo, historia y reservas.",
                alt: "Muestra de Bar San Roque, sitio web de restaurante"
            },
            en: {
                title: "Bar San Roque",
                description: "Modern and elegant web presence for a historic bar, highlighting an interactive digital menu, history, and reservations.",
                alt: "Screenshot of Bar San Roque, restaurant website"
            }
        }
    },
    {
        id: "barberia-master-barber",
        slug: "barberia-master-barber",
        title: "Barbería Master Barber",
        categoryKey: "website",
        technologies: ["React", "TailwindCSS", "Framer Motion"],
        image: "/projects/barberia-master-barber.png",
        featured: true,
        demoUrl: "https://master-barber-vip.vercel.app/",
        accessType: "live",
        translations: {
            es: {
                title: "Barbería Master Barber",
                description: "Sitio web premium para barbería con visualización de servicios, staff y agendamiento de turnos optimizado.",
                alt: "Muestra de Barbería Master Barber, sitio web con agenda"
            },
            en: {
                title: "Master Barber Shop",
                description: "Premium barber shop website with service showcases, staff profiles, and optimized appointment scheduling.",
                alt: "Screenshot of Master Barber Shop, barber website with booking"
            }
        }
    },
    {
        id: "reservas-casa-quinta",
        slug: "reservas-casa-quinta",
        title: "Reservas Casa Quinta",
        categoryKey: "systems",
        technologies: ["React", "Node.js", "MongoDB", "TailwindCSS"],
        image: "/projects/reservas-casa-quinta.png",
        featured: true,
        accessType: "private-system",
        translations: {
            es: {
                title: "Reservas Casa Quinta",
                description: "Sistema de reservas y calendario para alquiler de casa quinta vacacional, facilitando la gestión de fechas y señas.",
                alt: "Muestra de Reservas Casa Quinta, sistema de reservas"
            },
            en: {
                title: "Vacation House Booking",
                description: "Booking system and calendar for vacation house rentals, facilitating date management and deposits.",
                alt: "Screenshot of Vacation House Booking, reservation calendar system"
            }
        }
    },
    {
        id: "sistema-imprenta-express",
        slug: "sistema-imprenta-express",
        title: "Sistema Imprenta Express",
        categoryKey: "systems",
        technologies: ["React", "NestJS", "PostgreSQL", "TailwindCSS"],
        image: "/projects/sistema-imprenta-express.png",
        featured: true,
        accessType: "private-system",
        translations: {
            es: {
                title: "Sistema Imprenta Express",
                description: "Sistema administrativo privado para imprenta. Control de pedidos, estados de producción, clientes y facturación interna.",
                alt: "Muestra de Sistema Imprenta Express, panel de producción"
            },
            en: {
                title: "Imprenta Express System",
                description: "Private administration system for a printing press. Order tracking, production states, clients, and internal invoicing.",
                alt: "Screenshot of Imprenta Express System, internal production dashboard"
            }
        }
    }
];
