import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));
const BackgroundParticles = dynamic(() => import("@/components/BackgroundParticles"));
import ServiceCard from "@/components/ServiceCard";
import CTAButton from "@/components/CTAButton";

type Props = {
  params: Promise<{ lang: string }>;
};

const BASE_URL = "https://solvatech.com.py";
const PATH = "/servicios/desarrollo-web-paraguay";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === "es";

  const title = isEs
    ? "Desarrollo Web en Paraguay | Páginas Web y Sistemas a Medida"
    : "Web Development in Paraguay | Websites & Custom Systems";

  const description = isEs
    ? "Estudio de desarrollo web en Paraguay. Páginas web, landing pages, catálogos, tiendas online y sistemas a medida para negocios de Asunción, Central, Areguá y todo el país. Dominio, hosting y WhatsApp incluidos. Pedí tu presupuesto."
    : "Web development studio in Paraguay. Websites, landing pages, catalogs, online stores and custom systems for businesses in Asunción and across the country. Domain, hosting and WhatsApp included. Request a quote.";

  const keywords = isEs
    ? [
        "desarrollo web paraguay",
        "diseño web paraguay",
        "crear pagina web paraguay",
        "cuanto cuesta una pagina web en paraguay",
        "landing page paraguay",
        "tienda online paraguay",
        "sistemas a medida paraguay",
        "desarrollo web asuncion",
        "desarrollo web aregua",
      ]
    : [
        "web development paraguay",
        "web design paraguay",
        "landing page paraguay",
        "ecommerce paraguay",
        "custom software paraguay",
      ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE_URL}/${lang}${PATH}`,
      languages: {
        es: `${BASE_URL}/es${PATH}`,
        "es-PY": `${BASE_URL}/es${PATH}`,
        en: `${BASE_URL}/en${PATH}`,
        "x-default": `${BASE_URL}/es${PATH}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}${PATH}`,
      siteName: "SolvaTech",
      locale: isEs ? "es_PY" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

type ProjectType = { title: string; desc: string; href?: string; hrefLabel?: string };
type Section = {
  h2: string;
  paras: string[];
  list?: string[];
  links?: { label: string; href: string }[];
};

const CONTENT = {
  es: {
    breadcrumb: { home: "Inicio", services: "Servicios", current: "Desarrollo Web en Paraguay" },
    h1: "Desarrollo Web en Paraguay",
    subtitle:
      "Páginas web, landing pages y sistemas a medida para negocios de Asunción, Central, Areguá y todo el país.",
    intro: [
      "SolvaTech es un estudio de desarrollo web en Paraguay. Trabajás directo con el desarrollador, sin intermediarios ni tercerización. Hacemos páginas y sistemas para peluquerías, gimnasios, estudios contables, comercios, profesionales independientes y empresas que quieren dejar de depender solo de Instagram.",
      "Cada proyecto se entrega con dominio, hosting y WhatsApp configurados, listo para recibir consultas. Y está pensado para el mercado local: precios en guaraníes, pedidos por WhatsApp, dominios .com.py y medios de pago paraguayos.",
    ],
    typesTitle: "¿Qué tipo de proyecto necesitás?",
    types: [
      {
        title: "Landing page",
        desc: "Una sola página, enfocada en promocionar un servicio, una oferta o un curso y llevar a la gente a tu WhatsApp. Es la opción más rápida y económica para empezar.",
        href: "/es/pagina-web",
        hrefLabel: "Ver la promo de lanzamiento",
      },
      {
        title: "Página web para tu negocio",
        desc: "Varias secciones: inicio, servicios, sobre vos, contacto y ubicación. Ideal para transmitir seriedad y que un cliente encuentre todo en un solo lugar.",
      },
      {
        title: "Catálogo digital",
        desc: "Mostrás tus productos con fotos, categorías y precios en guaraníes, con botón de pedido por WhatsApp. Sin comisiones por venta.",
      },
      {
        title: "Tienda online (e-commerce)",
        desc: "Carrito, control de stock y cobros online para vender las 24 horas en todo Paraguay.",
      },
      {
        title: "Sistema a medida",
        desc: "Reservas, control de stock, clientes, pedidos o el proceso que tu negocio necesite ordenar y automatizar.",
      },
    ] as ProjectType[],
    sections: [
      {
        h2: "La parte técnica, resuelta",
        paras: [
          "No tenés que entender de dominios, servidores ni certificados. De todo eso nos encargamos nosotros y te entregamos la web funcionando.",
        ],
        list: [
          "Registro de tu dominio .com o .com.py ante NIC-PY, o transferencia si ya tenés uno.",
          "Hosting configurado y monitoreado. Según el plan, los primeros meses van incluidos.",
          "Certificado SSL y HTTPS: el candado de seguridad que esperan tus clientes.",
          "Correo con tu dominio, del tipo info@tunegocio.com.py, en lugar de una casilla de Gmail.",
          "Alta en Google Search Console y Google Analytics para medir cuánta gente te visita.",
          "Optimización de velocidad e imágenes para que cargue rápido incluso con datos móviles.",
        ],
      },
      {
        h2: "Pensado para vender en Paraguay",
        paras: [
          "Una web que funciona acá no es una plantilla traducida. Adaptamos cada proyecto a cómo se compra y se vende en el país.",
        ],
        list: [
          "WhatsApp Business: botón flotante y enlaces que abren el chat con un mensaje ya escrito. Es donde se cierran la mayoría de las ventas locales.",
          "Medios de pago locales: integración con Pagopar, Bancard, Tigo Money, Billetera Personal o transferencia bancaria, según el proyecto.",
          "Precios en guaraníes y textos en el español que se habla acá.",
          "Ubicación con Google Maps, que además ayuda a que te encuentren en búsquedas cercanas.",
          "Preparada para conectarse con facturación electrónica cuando lo necesites.",
        ],
      },
      {
        h2: "Cómo trabajamos",
        paras: [
          "Un proceso corto y ordenado. Sabés qué se hace, cuánto cuesta y cuándo está listo antes de empezar.",
          "El pago es 50% para arrancar y 50% al entregar.",
        ],
        list: [
          "Consulta: nos contás de tu negocio, qué ofrecés y qué querés lograr.",
          "Propuesta: te enviamos alcance, precio cerrado y fecha de entrega.",
          "Diseño: preparamos la propuesta visual adaptada a tu marca.",
          "Desarrollo: construimos la web, responsive y optimizada.",
          "Publicación: sale online con dominio y todo configurado, y queda con soporte.",
        ],
      },
      {
        h2: "¿Cuánto cuesta una página web en Paraguay?",
        paras: [
          'Depende del tipo de proyecto, pero siempre te pasamos el número cerrado antes de empezar. No trabajamos con "después vemos".',
          "Aparte van el dominio, que es un pago anual, y el hosting mensual, que incluye mantenimiento y los cambios de cada mes.",
        ],
        list: [
          "Landing page: desde Gs. 850.000, pago único.",
          "Página web de varias secciones: presupuesto según cantidad de secciones y contenido.",
          "Catálogo digital o tienda online: según cantidad de productos e integraciones de pago.",
          "Sistema a medida: se cotiza según el alcance.",
        ],
        links: [
          { label: "Ver todos los planes", href: "/es/servicios" },
          { label: "Ver proyectos reales", href: "/es/proyectos" },
          { label: "Landing en oferta", href: "/es/pagina-web" },
        ],
      },
      {
        h2: "Que te encuentren en Google",
        paras: [
          "Construimos cada web con una base técnica pensada para SEO: títulos y metadescripciones bien armados, datos estructurados, sitemap, URLs limpias y buena velocidad de carga.",
          'Desde el primer día aparecés cuando te buscan por el nombre de tu negocio. Posicionar para búsquedas más competidas, como "desarrollo web en Paraguay", lleva meses y trabajo continuo: Perfil de Empresa de Google, reseñas de clientes, contenido útil y enlaces desde otros sitios.',
          "Te explicamos el plan y, si querés, lo llevamos adelante mes a mes.",
        ],
        links: [
          {
            label: "Por qué tu negocio necesita una web profesional",
            href: "/es/blog/importancia-web-profesional-2026",
          },
          { label: "Más artículos en el blog", href: "/es/blog" },
        ],
      },
    ] as Section[],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Trabajan con clientes de todo el país?",
        a: "Sí. Todo el proceso es online, por WhatsApp, llamadas y videollamadas. Trabajamos con negocios de Asunción, Central, Areguá, el interior y también con paraguayos en el exterior.",
      },
      {
        q: "¿Necesito tener el contenido listo?",
        a: "No. Vos nos pasás la información básica de tu negocio y las fotos que tengas; nosotros redactamos los textos y armamos la estructura.",
      },
      {
        q: "¿La página queda a mi nombre?",
        a: "Sí. El dominio se registra a tu nombre y te entregamos todos los accesos. La web es tuya.",
      },
      {
        q: "¿Puedo empezar con algo chico y agrandarlo después?",
        a: "Es lo más común. Se arranca con una landing o una web simple y se le suman secciones, catálogo o tienda cuando el negocio lo pide, sin rehacer todo.",
      },
      {
        q: "¿Cuánto tarda?",
        a: "Una landing, de 4 a 7 días hábiles. Una web de varias secciones, de 1 a 3 semanas. Un sistema a medida depende del alcance.",
      },
      {
        q: "¿Hacen mantenimiento?",
        a: "Sí. Con el hosting mensual se incluyen los cambios y mejoras del mes: textos, precios, fotos y ajustes.",
      },
      {
        q: "¿Y si ya tengo una web?",
        a: "La revisamos y te decimos con honestidad si conviene mejorarla o rehacerla, y por qué.",
      },
    ],
    ctaText: "Contanos tu proyecto",
    ctaSecondary: "Ver la promo de lanzamiento",
    listedLabel: "Enlaces útiles:",
  },
  en: {
    breadcrumb: { home: "Home", services: "Services", current: "Web Development in Paraguay" },
    h1: "Web Development in Paraguay",
    subtitle:
      "Websites, landing pages and custom systems for businesses in Asunción, Central, Areguá and across the country.",
    intro: [
      "SolvaTech is a web development studio in Paraguay. You work directly with the developer, with no middlemen and no outsourcing. We build sites and systems for salons, gyms, accounting firms, shops, independent professionals and companies that want to stop depending only on Instagram.",
      "Every project is delivered with domain, hosting and WhatsApp already set up, ready to receive enquiries. And it is built for the local market: prices in guaraníes, WhatsApp orders, .com.py domains and Paraguayan payment methods.",
    ],
    typesTitle: "What kind of project do you need?",
    types: [
      {
        title: "Landing page",
        desc: "A single page focused on promoting a service, an offer or a course and sending people to your WhatsApp. It is the fastest and most affordable way to start.",
        href: "/en/pagina-web",
        hrefLabel: "See the launch offer",
      },
      {
        title: "Business website",
        desc: "Several sections: home, services, about, contact and location. Ideal to convey trust and let a client find everything in one place.",
      },
      {
        title: "Digital catalog",
        desc: "Show your products with photos, categories and prices, with a WhatsApp order button. No per-sale commissions.",
      },
      {
        title: "Online store (e-commerce)",
        desc: "Cart, stock control and online payments to sell 24/7 across Paraguay.",
      },
      {
        title: "Custom system",
        desc: "Bookings, stock control, clients, orders or whatever process your business needs to organize and automate.",
      },
    ] as ProjectType[],
    sections: [
      {
        h2: "The technical side, handled",
        paras: [
          "You do not need to understand domains, servers or certificates. We take care of all of that and hand you a working website.",
        ],
        list: [
          "Registration of your .com or .com.py domain with NIC-PY, or transfer if you already have one.",
          "Hosting set up and monitored. Depending on the plan, the first months are included.",
          "SSL certificate and HTTPS: the security padlock your clients expect.",
          "Email on your own domain, like info@yourbusiness.com.py, instead of a Gmail address.",
          "Setup in Google Search Console and Google Analytics to measure your traffic.",
          "Speed and image optimization so it loads fast even on mobile data.",
        ],
      },
      {
        h2: "Built to sell in Paraguay",
        paras: [
          "A site that works here is not a translated template. We adapt every project to how people buy and sell in the country.",
        ],
        list: [
          "WhatsApp Business: a floating button and links that open the chat with a pre-written message. That is where most local sales close.",
          "Local payment methods: integration with Pagopar, Bancard, Tigo Money, Billetera Personal or bank transfer, depending on the project.",
          "Prices in guaraníes and copy in the Spanish spoken here.",
          "Location with Google Maps, which also helps you show up in nearby searches.",
          "Ready to connect with electronic invoicing when you need it.",
        ],
      },
      {
        h2: "How we work",
        paras: [
          "A short, orderly process. You know what will be done, how much it costs and when it will be ready before we start.",
          "Payment is 50% to begin and 50% on delivery.",
        ],
        list: [
          "Consultation: you tell us about your business, what you offer and what you want to achieve.",
          "Proposal: we send scope, a closed price and a delivery date.",
          "Design: we prepare the visual proposal adapted to your brand.",
          "Development: we build the site, responsive and optimized.",
          "Launch: it goes live with domain and everything configured, and stays with support.",
        ],
      },
      {
        h2: "How much does a website cost in Paraguay?",
        paras: [
          'It depends on the type of project, but we always give you the closed number before starting. We do not work with "we will see later".',
          "Domain (an annual payment) and monthly hosting are separate. Hosting includes maintenance and the changes you need each month.",
        ],
        list: [
          "Landing page: from Gs. 850,000, one-time payment.",
          "Multi-section website: quoted by number of sections and content.",
          "Digital catalog or online store: by number of products and payment integrations.",
          "Custom system: quoted by scope.",
        ],
        links: [
          { label: "See all plans", href: "/en/servicios" },
          { label: "See real projects", href: "/en/projects" },
          { label: "Launch offer", href: "/en/pagina-web" },
        ],
      },
      {
        h2: "Getting found on Google",
        paras: [
          "We build every site on a technical base made for SEO: well-crafted titles and meta descriptions, structured data, sitemap, clean URLs and good loading speed.",
          'From day one you appear when people search for your business name. Ranking for more competitive searches like "web development in Paraguay" takes months and ongoing work: Google Business Profile, client reviews, useful content and links from other sites.',
          "We explain the plan and, if you want, we run it month by month.",
        ],
        links: [
          {
            label: "Why your business needs a professional website",
            href: "/en/blog/importancia-web-profesional-2026",
          },
          { label: "More articles on the blog", href: "/en/blog" },
        ],
      },
    ] as Section[],
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "Do you work with clients across the country?",
        a: "Yes. The whole process is online, over WhatsApp, calls and video calls. We work with businesses in Asunción, Central, Areguá, the interior and also with Paraguayans abroad.",
      },
      {
        q: "Do I need to have the content ready?",
        a: "No. You give us the basic information about your business and whatever photos you have; we write the copy and build the structure.",
      },
      {
        q: "Is the website mine?",
        a: "Yes. The domain is registered in your name and we hand you all the access. The site is yours.",
      },
      {
        q: "Can I start small and grow later?",
        a: "That is the most common path. You start with a landing or a simple site and add sections, a catalog or a store when the business needs it, without redoing everything.",
      },
      {
        q: "How long does it take?",
        a: "A landing, 4 to 7 business days. A multi-section site, 1 to 3 weeks. A custom system depends on scope.",
      },
      {
        q: "Do you do maintenance?",
        a: "Yes. Monthly hosting includes that month's changes and improvements: text, prices, photos and adjustments.",
      },
      {
        q: "What if I already have a website?",
        a: "We review it and tell you honestly whether it is better to improve it or rebuild it, and why.",
      },
    ],
    ctaText: "Tell us about your project",
    ctaSecondary: "See the launch offer",
    listedLabel: "Useful links:",
  },
} as const;

export default async function DesarrolloWebParaguayPage({ params }: Props) {
  const { lang } = await params;
  const isEs = lang !== "en";
  const c = isEs ? CONTENT.es : CONTENT.en;
  const url = `${BASE_URL}/${isEs ? "es" : "en"}${PATH}`;

  const theme = {
    bg: "#000000",
    accent: "#00d9ff",
    accentDark: "#0099cc",
    textMain: "#ffffff",
    textSide: "#9ca3af",
    cardBg: "#0a0a0a",
    border: "#1f2937",
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.h1,
    serviceType: isEs ? "Desarrollo web" : "Web development",
    url,
    description: c.subtitle,
    provider: {
      "@type": "Organization",
      name: "SolvaTech",
      url: BASE_URL,
      telephone: "+595994295092",
    },
    areaServed: { "@type": "Country", name: "Paraguay" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${BASE_URL}/${isEs ? "es" : "en"}/pagina-web`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: c.typesTitle,
      itemListElement: c.types.map((t) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: t.title, description: t.desc },
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.breadcrumb.home, item: `${BASE_URL}/${isEs ? "es" : "en"}` },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumb.services,
        item: `${BASE_URL}/${isEs ? "es" : "en"}/servicios`,
      },
      { "@type": "ListItem", position: 3, name: c.breadcrumb.current, item: url },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const h2Style: React.CSSProperties = {
    fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
    fontWeight: 800,
    color: theme.textMain,
    marginBottom: "16px",
    lineHeight: 1.2,
  };
  const pStyle: React.CSSProperties = {
    fontSize: "1.0625rem",
    lineHeight: 1.7,
    color: "#c3cad4",
    marginBottom: "14px",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: theme.bg,
        color: theme.textMain,
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <BackgroundParticles />
      <Navbar />

      <article
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "820px",
          margin: "0 auto",
          padding: "140px 24px 80px",
        }}
      >
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            fontSize: "0.85rem",
            color: theme.textSide,
            marginBottom: "28px",
          }}
        >
          <Link href={`/${isEs ? "es" : "en"}`} style={{ color: theme.textSide, textDecoration: "none" }}>
            {c.breadcrumb.home}
          </Link>
          <span aria-hidden>›</span>
          <Link
            href={`/${isEs ? "es" : "en"}/servicios`}
            style={{ color: theme.textSide, textDecoration: "none" }}
          >
            {c.breadcrumb.services}
          </Link>
          <span aria-hidden>›</span>
          <span style={{ color: theme.accent }}>{c.breadcrumb.current}</span>
        </nav>

        <header style={{ marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "18px",
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {c.h1}
          </h1>
          <p style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)", fontWeight: 600, color: "#d1d5db", lineHeight: 1.4 }}>
            {c.subtitle}
          </p>
        </header>

        <section style={{ marginBottom: "48px" }}>
          {c.intro.map((p, i) => (
            <p key={i} style={pStyle}>
              {p}
            </p>
          ))}
        </section>

        <section style={{ marginBottom: "48px" }}>
          <h2 style={h2Style}>{c.typesTitle}</h2>
          <div style={{ display: "grid", gap: "16px", marginTop: "8px" }}>
            {c.types.map((t) => (
              <ServiceCard key={t.title} accent={theme.accent} border={theme.border} cardBg={theme.cardBg}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px", color: theme.accent }}>
                  {t.title}
                </h3>
                <p style={{ color: "#9ca3af", lineHeight: 1.6, fontSize: "0.98rem" }}>{t.desc}</p>
                {t.href ? (
                  <Link
                    href={t.href}
                    style={{
                      display: "inline-block",
                      marginTop: "12px",
                      color: theme.accent,
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                    }}
                  >
                    {t.hrefLabel} →
                  </Link>
                ) : null}
              </ServiceCard>
            ))}
          </div>
        </section>

        {c.sections.map((s) => (
          <section key={s.h2} style={{ marginBottom: "48px" }}>
            <h2 style={h2Style}>{s.h2}</h2>
            {s.paras.map((p, i) => (
              <p key={i} style={pStyle}>
                {p}
              </p>
            ))}
            {s.list ? (
              <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0", display: "grid", gap: "12px" }}>
                {s.list.map((li, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "10px",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      color: "#c3cad4",
                    }}
                  >
                    <span style={{ color: theme.accent, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {s.links ? (
              <p style={{ marginTop: "18px", fontSize: "0.95rem", color: theme.textSide }}>
                {c.listedLabel}{" "}
                {s.links.map((l, i) => (
                  <span key={l.href}>
                    <Link href={l.href} style={{ color: theme.accent, textDecoration: "none", fontWeight: 600 }}>
                      {l.label}
                    </Link>
                    {i < s.links!.length - 1 ? " · " : ""}
                  </span>
                ))}
              </p>
            ) : null}
          </section>
        ))}

        <section style={{ marginBottom: "48px" }}>
          <h2 style={h2Style}>{c.faqTitle}</h2>
          <div style={{ display: "grid", gap: "12px", marginTop: "8px" }}>
            {c.faqs.map((f) => (
              <div
                key={f.q}
                style={{
                  background: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: "12px",
                  padding: "20px 22px",
                }}
              >
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: theme.textMain, marginBottom: "8px" }}>
                  {f.q}
                </h3>
                <p style={{ fontSize: "0.98rem", lineHeight: 1.65, color: "#9ca3af", margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            textAlign: "center",
            borderTop: `1px solid ${theme.border}`,
            paddingTop: "40px",
          }}
        >
          <CTAButton
            whatsappMessage={
              isEs
                ? "Hola, quiero consultar por un proyecto de desarrollo web para mi negocio en Paraguay."
                : "Hi, I want to ask about a web development project for my business in Paraguay."
            }
            accent={theme.accent}
            withShadow
            eventName="click_cta_desarrollo_web_paraguay"
          >
            {c.ctaText}
          </CTAButton>
          <div style={{ marginTop: "18px" }}>
            <Link
              href={`/${isEs ? "es" : "en"}/pagina-web`}
              style={{ color: theme.accent, textDecoration: "none", fontWeight: 600, fontSize: "0.95rem" }}
            >
              {c.ctaSecondary} →
            </Link>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
