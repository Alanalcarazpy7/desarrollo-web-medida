import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceDetailContent from '@/components/ServiceDetailContent';
import ServiceJsonLd from '@/components/ServiceJsonLd';
import { buildServiceJsonLd } from '@/lib/service-schema';
import { localized, serviceDetails } from '@/lib/service-details';

type Props = { params: Promise<{ lang: string }> };
const slug = 'desarrollo-tiendas-online-paraguay';
const base = 'https://solvatech.com.py';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== 'es' && lang !== 'en') notFound();
  const title = lang === 'es' ? 'Desarrollo de Tiendas Online en Paraguay' : 'Online Store Development in Paraguay';
  const description = lang === 'es'
    ? 'Tiendas online con catálogo, carrito y gestión de pedidos. Definimos cobros, stock y entrega para tu negocio en Paraguay. Cotización según alcance.'
    : 'Online stores with catalogue, cart and order management. Define payments, inventory and delivery for your business in Paraguay. Quoted by scope.';
  const path = `/servicios/${slug}`;
  return { title, description,
    alternates: { canonical: `${base}/${lang}${path}`, languages: { es: `${base}/es${path}`, 'es-PY': `${base}/es${path}`, en: `${base}/en${path}`, 'x-default': `${base}/es${path}` } },
    openGraph: { title, description, url: `${base}/${lang}${path}`, type: 'website', locale: lang === 'es' ? 'es_PY' : 'en_US', images: [{ url: `${base}/projects/VasosPy-termos.png`, width: 2533, height: 1288 }] },
  };
}

export default async function OnlineStorePage({ params }: Props) {
  const { lang } = await params;
  if (lang !== 'es' && lang !== 'en') notFound();
  const es = lang === 'es';
  const content = serviceDetails[slug];
  const schema = buildServiceJsonLd({ lang, path: `/servicios/${slug}`, name: localized(content.name, lang), description: localized(content.intro, lang), breadcrumbHome: es ? 'Inicio' : 'Home', breadcrumbServices: es ? 'Servicios' : 'Services', breadcrumbLabel: es ? 'Tiendas online' : 'Online stores', serviceType: es ? 'Desarrollo de comercio electrónico' : 'E-commerce development' });
  return <main className="store-service-page">
    <ServiceJsonLd nodes={schema} /><Navbar />
    <div className="store-service-container">
      <nav className="store-service-breadcrumb" aria-label={es ? 'Ruta de navegación' : 'Breadcrumb'}><Link href={`/${lang}`}>{es ? 'Inicio' : 'Home'}</Link><span aria-hidden="true">/</span><Link href={`/${lang}/servicios`}>{es ? 'Servicios' : 'Services'}</Link><span aria-hidden="true">/</span><span>{es ? 'Tiendas online' : 'Online stores'}</span></nav>
      <header className="store-service-intro"><p className="service-depth-eyebrow">{es ? 'Comercio electrónico · Paraguay' : 'E-commerce · Paraguay'}</p><h1>{es ? 'Tu tienda online, preparada para gestionar pedidos.' : 'Your online store, built to handle orders.'}</h1><p>{es ? 'Productos, carrito y cobros con un recorrido que también funciona para quien prepara y entrega cada pedido.' : 'Products, cart and payments in a journey that also works for the people preparing and fulfilling each order.'}</p><div className="store-service-actions"><Link className="service-depth-action" href={`/${lang}/brief`}>{es ? 'Contar mi proyecto' : 'Describe my project'} →</Link><a href="#service-scope">{es ? 'Revisar el alcance' : 'Review the scope'} ↓</a></div><small>{es ? 'Cotización según productos, integraciones y operación. Precio y plazo definidos antes de empezar.' : 'Quoted according to products, integrations and operations. Price and timeline agreed before starting.'}</small></header>
      <ServiceDetailContent slug={slug} lang={lang} />
    </div><Footer />
  </main>;
}
