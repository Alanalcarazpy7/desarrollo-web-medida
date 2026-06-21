export const WHATSAPP_NUMBER = "595994295092";

export const whatsappMessages = {
  es: {
    general: "Hola, quiero llevar mi negocio a internet. ¿Me podés orientar?",
    web: "Hola, quiero consultar por una página web para mi negocio.",
    landing: "Hola, quiero consultar por una landing page profesional.",
    catalogo: "Hola, quiero consultar por un catálogo digital para mis productos.",
    sistema: "Hola, quiero cotizar una tienda online o sistema a medida.",
    hero: "Hola, quiero una página web para mi negocio. ¿Me podés pasar más información?",
    promo: "Hola, quiero info sobre la promo lanzamiento de Gs. 550.000 para mi negocio.",
    basica: "Hola, quiero info sobre una web básica para mi negocio.",
    estandar: "Hola, quiero info sobre una web estándar para mi negocio.",
    pro: "Hola, quiero info sobre una web pro para mi empresa.",
    seo: "Hola, quiero mejorar el posicionamiento de mi negocio en Google y Maps.",
    hosting: "Hola, quiero consultar sobre dominio y hosting para mi web.",
    soporte: "Hola, quiero consultar por el soporte web básico para mi sitio."
  },
  en: {
    general: "Hi, I want to take my business online. Can you guide me?",
    web: "Hi, I want to ask about a website for my business.",
    landing: "Hi, I want to ask about a professional landing page.",
    catalogo: "Hi, I want to ask about a digital catalog for my products.",
    sistema: "Hi, I want to quote an online store or custom system.",
    hero: "Hi, I want a website for my business. Can you send me more information?",
    promo: "Hi, I want information about the launch promo of Gs. 550.000 for my business.",
    basica: "Hi, I want information about a basic web for my business.",
    estandar: "Hi, I want information about a standard web for my business.",
    pro: "Hi, I want information about a pro web for my company.",
    seo: "Hi, I want to improve my business positioning in Google and Maps.",
    hosting: "Hi, I want to consult about domain and hosting for my web.",
    soporte: "Hi, I want to consult about basic web support for my site."
  },
};

export function getWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

