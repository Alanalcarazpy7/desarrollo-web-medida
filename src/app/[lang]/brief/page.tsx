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
    <header className="brief-header">
      <Link className="brief-brand" href={`/${lang}`} aria-label={es ? 'SolvaTech · Ir al inicio' : 'SolvaTech · Home'}>
        <Image src="/icon.png" alt="" width={46} height={46} priority />
        <span>Solva<span>Tech</span><small>{es ? 'Desarrollo web a medida' : 'Custom web development'}</small></span>
      </Link>
      <span className="brief-header-label">{es ? 'De tu idea a una propuesta' : 'From your idea to a proposal'}</span>
    </header>
    <div className="brief-layout">
      <section className="brief-intro" aria-labelledby="brief-title">
        <p className="brief-eyebrow">{es ? 'El próximo paso' : 'The next step'}</p>
        <h1 id="brief-title">{es ? <>Contanos tu <span>proyecto.</span></> : <>Tell us about your <span>project.</span></>}</h1>
        <p className="brief-lead">{es ? 'Unas preguntas sobre tu negocio y lo que necesitás. Con eso puedo preparar una propuesta pensada para vos.' : 'A few questions about your business and what you need help me prepare a proposal that fits.'}</p>
        <p className="brief-intro-signature">{es ? 'Lo reviso personalmente.' : 'I review it personally.'}<span>Alan · SolvaTech</span></p>
      </section>
      <section className="brief-panel" aria-labelledby="brief-next">
        <div className="brief-document-heading">
          <svg aria-hidden="true" width="26" height="30" viewBox="0 0 26 30" fill="none"><path d="M5 1h10l7 7v19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" /><path d="M15 1v8h7M8 15h9M8 20h9" stroke="currentColor" strokeWidth="1.5" /></svg>
          <h2 id="brief-next">{es ? 'Formulario del proyecto' : 'Project form'}</h2>
        </div>
        <div className="brief-form-meta"><span>{es ? '4–6 minutos aprox.' : 'About 4–6 minutes'}</span><span>{es ? 'Sin compromiso' : 'No obligation'}</span></div>
        {formUrl ? <>
          <a className="brief-primary" href={formUrl} aria-describedby="brief-form-note">
            {es ? 'Abrir formulario' : 'Open the form'}
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <p className="brief-form-note" id="brief-form-note">{es ? 'Se abre Google Forms en esta misma pestaña para que puedas completarlo.' : 'Opens Google Forms in this tab. The form is in Spanish.'}</p>
        </> : <div className="brief-pending" role="status"><strong>{es ? 'El formulario todavía no está disponible.' : 'The form is not available yet.'}</strong><p>{es ? 'Podés contarme tu idea por WhatsApp.' : 'You can describe your idea on WhatsApp.'}</p></div>}
        <div className="brief-form-reassurance">
          <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <p>{es ? 'Al enviarlo, tus respuestas quedan guardadas para revisar tu proyecto y seguir la conversación.' : 'Submitting saves your answers so I can review your project and continue our conversation.'}</p>
        </div>
      </section>
    </div>
    <section className="brief-after" aria-labelledby="brief-after-title">
      <h2 id="brief-after-title">{es ? '¿Y después?' : 'What happens next?'}</h2>
      <ol className="brief-steps">
        <li><h3>{es ? 'Contás tu idea' : 'Describe your idea'}</h3><p>{es ? 'Tu negocio, lo que necesitás y el presupuesto que tenés previsto.' : 'Your business, what you need and your indicative budget.'}</p></li>
        <li><h3>{es ? 'Reviso el proyecto' : 'I review the project'}</h3><p>{es ? 'Leo tus respuestas y evalúo qué solución tiene sentido para vos.' : 'I read your answers and assess which approach fits your needs.'}</p></li>
        <li><h3>{es ? 'Seguimos conversando' : 'We continue the conversation'}</h3><p>{es ? 'Te contacto por el canal que elegiste para aclarar detalles y preparar la propuesta.' : 'I contact you through your preferred channel to clarify details and prepare a proposal.'}</p></li>
      </ol>
    </section>
    <div className="brief-help"><p>{es ? '¿Tenés una duda antes de completar?' : 'Have a question before completing the form?'}</p><a href={getWhatsAppLink(es ? 'Hola, tengo una duda antes de completar el formulario de mi proyecto: ' : 'Hi, I have a question before completing the project form: ')}>{es ? 'Escribime por WhatsApp' : 'Ask me on WhatsApp'} ↗</a></div>
    <footer className="brief-footer"><span>© SolvaTech · Paraguay</span><Link href={`/${lang}/politica-de-privacidad`}>{es ? 'Privacidad y uso de tus datos' : 'Privacy and use of your data'}</Link></footer>
  </main>;
}
