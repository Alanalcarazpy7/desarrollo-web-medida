import Link from 'next/link';
import './service-content.css';

export default function ServiceDirectory({ lang }: { lang: string }) {
  const es = lang !== 'en';
  const locale = es ? 'es' : 'en';
  const routes = [
    { slug: 'desarrollo-web-basica', es: 'Presentar mi negocio y recibir consultas', en: 'Present my business and receive enquiries', descEs: 'Una oferta concreta y un recorrido breve.', descEn: 'A focused offer and a short journey.' },
    { slug: 'desarrollo-web-estandar', es: 'Explicar varios servicios con detalle', en: 'Explain several services in detail', descEs: 'Páginas propias para preguntas diferentes.', descEn: 'Separate pages for different questions.' },
    { slug: 'desarrollo-web-catalogo', es: 'Mostrar productos y confirmar por WhatsApp', en: 'Show products and confirm on WhatsApp', descEs: 'Elegir primero; acordar disponibilidad y entrega después.', descEn: 'Choose first; agree availability and delivery afterwards.' },
    { slug: 'desarrollo-tiendas-online-paraguay', es: 'Recibir pedidos y cobrar en la web', en: 'Take orders and payments on the website', descEs: 'Carrito, estados y condiciones de entrega definidos.', descEn: 'Defined cart, statuses and fulfilment terms.' },
    { slug: 'sistemas-informaticos-paraguay', es: 'Ordenar una operación interna', en: 'Organise an internal operation', descEs: 'Datos, usuarios, permisos y reglas de trabajo.', descEn: 'Data, users, permissions and operational rules.' },
  ];
  return <section className="service-directory" aria-labelledby="service-directory-title">
    <p className="service-depth-eyebrow">{es ? 'Partí de tu necesidad' : 'Start with your need'}</p>
    <h2 id="service-directory-title">{es ? '¿Qué tiene que resolver tu web?' : 'What should your website solve?'}</h2>
    <p>{es ? 'Los planes organizan el presupuesto. Estas diferencias te ayudan a elegir el alcance antes de comparar precios.' : 'Plans organise the budget. These differences help you choose the scope before comparing prices.'}</p>
    <ul>{routes.map(route => <li key={route.slug}><Link href={`/${locale}/servicios/${route.slug}`}><span>{es ? route.es : route.en}</span><span aria-hidden="true">↗</span></Link><p>{es ? route.descEs : route.descEn}</p></li>)}</ul>
    <p>{es ? '¿Tu web ya existe?' : 'Already have a website?'} <Link href={`/${locale}/servicios/posicionamiento-google`}>{es ? 'Revisar visibilidad' : 'Review visibility'}</Link> · <Link href={`/${locale}/servicios/hosting-web-administrado`}>{es ? 'Administrar el alojamiento' : 'Manage hosting'}</Link> · <Link href={`/${locale}/servicios/soporte-web-basico`}>{es ? 'Actualizar contenido' : 'Update content'}</Link>.</p>
    <Link className="service-depth-action" href={`/${locale}/brief`}>{es ? 'Contar mi proyecto en el brief' : 'Describe my project in the brief'} →</Link>
  </section>;
}
