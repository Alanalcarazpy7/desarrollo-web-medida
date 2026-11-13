type Visual = {
  src: string;
  width: number;
  height: number;
  es: string;
  en: string;
  href?: string;
};

const structure: Visual = { src: '/blog/estructura-web.svg', width: 1200, height: 630,
  es: 'Un recorrido claro responde qué ofrecés, qué evidencia lo respalda y cómo dar el siguiente paso. Esquema ilustrativo.',
  en: 'A clear journey explains the offer, supporting evidence and next step. Illustrative diagram.' };
const payment: Visual = { src: '/blog/pedido-confirmado.svg', width: 1200, height: 630,
  es: 'Pedido, cobro y entrega son estados diferentes. La confirmación del proveedor debe verificarse antes de automatizar una entrega.',
  en: 'Order, payment and fulfilment are separate states. Verify the provider confirmation before automatic delivery.' };
const domain: Visual = { src: '/blog/dominio-hosting-correo.svg', width: 1200, height: 630,
  es: 'El dominio conecta servicios distintos: web y correo. Conservar los registros y accesos evita perder uno al trasladar el otro.',
  en: 'A domain connects separate website and email services. Preserve records and access when migrating either.' };
const quote: Visual = { src: '/blog/presupuesto-web.svg', width: 1200, height: 630,
  es: 'Compará entregables, accesos y condiciones de soporte, además del precio. La lista debe formar parte de la propuesta.',
  en: 'Compare deliverables, access and support terms as well as price. Put the checklist in the proposal.' };
const morinigo: Visual = { src: '/projects/morinigo-y-asociados.png', width: 2161, height: 1288,
  es: 'Referencia real: sitio institucional de Morinigo y Asociados. Presentación de servicios y contacto; no representa una medición de ventas.',
  en: 'Real reference: the Morinigo y Asociados institutional site. Services and contact, not a claim of measured sales.', href: 'morinigo-y-asociados' };
const academia: Visual = { src: '/projects/academia-gps-trilogia-tol.png', width: 2089, height: 1236,
  es: 'Referencia real: landing de Academia GPS para presentar una formación. Los medios de pago de un caso histórico deben verificarse antes de reutilizarlos.',
  en: 'Real reference: the Academia GPS course landing. Recheck payment availability before reusing a historical implementation.', href: 'academia-gps' };
const catalogue: Visual = { src: '/projects/VasosPy-termos.png', width: 2533, height: 1288,
  es: 'Muestra visual de VasosPy: productos organizados antes de consultar. Es una referencia de interfaz, no un resultado comercial medido.',
  en: 'VasosPy visual sample: organised products before enquiry. An interface reference, not a measured commercial result.', href: 'vasospy' };

const visuals: Record<string, Visual[]> = {
  'link-de-pago-o-pasarela-paraguay': [payment, academia],
  'medios-de-pago-online-paraguay': [payment, catalogue],
  'presupuesto-diseno-web-paraguay-que-incluir': [quote, morinigo],
  'catalogo-whatsapp-o-tienda-online-paraguay': [catalogue, payment],
  'dominio-hosting-correo-empresa-paraguay': [domain, quote],
  'registrar-dominio-com-py-paraguay': [domain],
  'cuanto-cuesta-pagina-web-paraguay': [quote, morinigo],
  'landing-page-vs-sitio-web': [academia, morinigo],
  'importancia-web-profesional-2026': [morinigo, structure],
  'guia-seo-local-paraguay': [{ src: '/blog/rastreo-indexacion.svg', width: 1200, height: 630,
    es: 'Descubrimiento, rastreo e indexación son etapas diferentes. Estar en el sitemap no asegura la inclusión en resultados.',
    en: 'Discovery, crawling and indexing differ. A sitemap entry does not guarantee inclusion in search results.' }],
  'importancia-velocidad-web': [structure],
  'tendencias-ecommerce-2026': [catalogue],
  'inteligencia-artificial-negocios': [{ src: '/projects/stockpro.jpg', width: 1915, height: 947,
    es: 'Muestra de un panel de inventario: ordenar datos es un paso previo a automatizar procesos. La captura no acredita funciones de IA.',
    en: 'Inventory dashboard sample: organised data comes before process automation. The screenshot does not demonstrate AI features.', href: 'stockpro' }],
  'pagina-web-para-gimnasios-paraguay': [structure],
  'pagina-web-para-peluquerias-barberias-paraguay': [{ src: '/projects/barberia-master-barber.png', width: 2227, height: 1300,
    es: 'Muestra de diseño para barbería: servicios y contacto visibles. Revisá el caso para conocer el alcance de la referencia.',
    en: 'Barbershop design sample with visible services and contact. See the case for the reference scope.', href: 'barberia-master-barber' }],
  'menu-digital-qr-restaurantes-paraguay': [{ src: '/projects/bar-san-roque.png', width: 2266, height: 1297,
    es: 'Referencia de menú gastronómico del portfolio. Una carta ordenada facilita elegir antes de preguntar.',
    en: 'Restaurant menu reference from the portfolio. An organised menu helps visitors choose before asking.', href: 'bar-san-roque' }],
};

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

/** Adds contextual illustrations to trusted article HTML, entirely on server. */
export function addArticleVisuals(content: string, slug: string, lang: 'es' | 'en') {
  const selected = visuals[slug] || [];
  const headings = [...content.matchAll(/<h2\b/gi)];
  if (!headings.length) return content;
  const inserts = selected.map((visual, i) => {
    const point = i === 0 ? 1 : Math.max(2, Math.floor(headings.length / 2));
    const at = headings[Math.min(point, headings.length - 1)].index!;
    const caption = escapeHtml(visual[lang]);
    const src = visual.src.endsWith('.svg') ? visual.src
      : `/_next/image?url=${encodeURIComponent(visual.src)}&w=1200&q=75`;
    const link = visual.href
      ? ` <a href="/${lang}/${lang === 'es' ? 'proyectos' : 'projects'}/${visual.href}">${lang === 'es' ? 'Ver el caso' : 'View the case'} →</a>` : '';
    return { at, html: `<figure class="article-reference"><img src="${src}" alt="${caption}" width="${visual.width}" height="${visual.height}" loading="lazy" decoding="async" /><figcaption>${caption}${link}</figcaption></figure>` };
  }).sort((a, b) => b.at - a.at);
  return inserts.reduce((html, entry) => html.slice(0, entry.at) + entry.html + html.slice(entry.at), content);
}
