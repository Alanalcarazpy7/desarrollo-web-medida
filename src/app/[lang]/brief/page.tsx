import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBriefFormUrl } from '@/lib/brief-config';
import { getWhatsAppLink } from '@/lib/whatsapp';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'es' ? 'Contanos tu proyecto' : 'Tell us about your project',
    description: lang === 'es' ? 'Prepará el alcance de tu web o sistema con el brief de SolvaTech.' : 'Prepare your website or software project brief with SolvaTech.',
    alternates: { canonical: `https://solvatech.com.py/${lang}/brief` },
    // Useful to share directly. It does not compete with commercial SEO pages.
    robots: { index: false, follow: true },
  };
}

export default async function BriefPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== 'es' && lang !== 'en') notFound();
  const es = lang === 'es';
  const formUrl = getBriefFormUrl();
  return <main className="brief-page">
    <header className="brief-header"><Link href={`/${lang}`}><Image src="/icon.png" alt="SolvaTech" width={52} height={52} /><span>SolvaTech</span></Link><span>{es ? 'Brief de proyecto' : 'Project brief'}</span></header>
    <div className="brief-layout">
      <section>
        <p className="brief-eyebrow">{es ? 'Empecemos por tu negocio' : 'Start with your business'}</p>
        <h1>{es ? 'Contame qué necesitás. Pensemos el alcance.' : 'Tell us what you need. Let’s define the scope.'}</h1>
        <p className="brief-lead">{es ? 'Unas preguntas sobre tu negocio, las funciones y el plazo para preparar una propuesta con contexto.' : 'A few questions about your business, features and timing help us prepare a relevant proposal.'}</p>
        <ol className="brief-steps"><li>{es ? 'Tu negocio y cómo contactarte' : 'Your business and contact details'}</li><li>{es ? 'Qué debería hacer tu web o sistema' : 'What your website or system should do'}</li><li>{es ? 'Materiales, presupuesto y plazo' : 'Content, budget and timing'}</li></ol>
        <p className="brief-small">{es ? 'Aproximadamente 4–6 minutos · Sin compromiso de contratación' : 'About 4–6 minutes · No commitment to purchase'}</p>
      </section>
      <section className="brief-panel" aria-labelledby="brief-next">
        <span className="brief-panel-label">{es ? 'De la idea a una propuesta' : 'From an idea to a proposal'}</span>
        <h2 id="brief-next">{es ? 'Toda la información, en un solo lugar.' : 'The important details, together.'}</h2>
        <p>{es ? 'Al enviar el formulario de Google, tus respuestas quedan guardadas y SolvaTech recibe un aviso para revisar tu proyecto.' : 'Submitting the Google Form saves your answers and notifies SolvaTech to review your project. The form is in Spanish.'}</p>
        {formUrl ? <a className="brief-primary" href={formUrl} target="_blank" rel="noopener noreferrer">{es ? 'Completar mi brief en Google Forms ↗' : 'Complete my brief in Google Forms ↗'}</a>
          : <div className="brief-pending" role="status"><strong>{es ? 'El formulario online todavía no está habilitado.' : 'The online form is not enabled yet.'}</strong><p>{es ? 'Podés adelantar tu idea por WhatsApp mientras se activa.' : 'You can describe your idea through WhatsApp while it is being activated.'}</p></div>}
        <a className="brief-secondary" href={getWhatsAppLink(es ? 'Hola, quiero preparar un brief para mi proyecto. Mi negocio es: ' : 'Hi, I would like to prepare a brief for my project. My business is: ')} target="_blank" rel="noopener noreferrer">{es ? 'Consultar primero por WhatsApp' : 'Ask first on WhatsApp'}</a>
        <p className="brief-small">{es ? 'No incluyas contraseñas ni documentos de clientes.' : 'Do not include passwords or customer documents.'} <Link href={`/${lang}/politica-de-privacidad`}>{es ? 'Privacidad' : 'Privacy'}</Link></p>
      </section>
    </div>
    <footer className="brief-footer">SolvaTech · {es ? 'Desarrollo web y sistemas en Paraguay' : 'Web development and software in Paraguay'}<Link href={es ? '/es/proyectos' : '/en/projects'}>{es ? 'Ver nuestros trabajos' : 'See our work'}</Link></footer>
  </main>;
}
