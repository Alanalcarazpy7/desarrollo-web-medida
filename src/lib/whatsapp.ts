export const WHATSAPP_NUMBER = "595994295092";

export const whatsappMessages = {
  es: {
    general: "Hola, quiero llevar mi negocio a internet. ¿Me podés orientar?",
    web: "Hola, quiero consultar por una página web para mi negocio.",
    landing: "Hola, quiero consultar por una landing page profesional.",
    catalogo: "Hola, quiero consultar por un catálogo digital para mis productos.",
    sistema: "Hola, quiero cotizar una tienda online o sistema a medida.",
    hero: "Hola, quiero una página web para mi negocio. ¿Me podés pasar más información?"
  },
  en: {
    general: "Hi, I want to take my business online. Can you guide me?",
    web: "Hi, I want to ask about a website for my business.",
    landing: "Hi, I want to ask about a professional landing page.",
    catalogo: "Hi, I want to ask about a digital catalog for my products.",
    sistema: "Hi, I want to quote an online store or custom system.",
    hero: "Hi, I want a website for my business. Can you send me more information?"
  },
};

export function getWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
