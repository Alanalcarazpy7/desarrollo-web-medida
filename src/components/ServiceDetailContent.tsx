import Image from 'next/image';
import Link from 'next/link';
import { getServiceFaqs, localized, serviceDetails } from '@/lib/service-details';
import './service-content.css';

/** Server-only editorial extension: no catalogue or article bodies in client JS. */
export default function ServiceDetailContent({ slug, lang }: { slug: string; lang: string }) {
  const content = serviceDetails[slug];
  if (!content) return null;
  const es = lang !== 'en';
  const locale = es ? 'es' : 'en';
  const text = (copy: readonly [string, string]) => localized(copy, locale);
  const faqs = getServiceFaqs(slug, locale);
  const imageSize = content.example.image.endsWith('.svg') ? [1200, 630]
    : content.example.image.includes('morinigo') ? [2161, 1288]
    : content.example.image.includes('academia') ? [2089, 1236]
    : content.example.image.includes('VasosPy') ? [2533, 1288] : [1915, 947];
  return <div className="service-depth" data-service-depth={slug}>
    <nav className="service-depth-nav" aria-label={es ? 'Contenido de esta guía del servicio' : 'Service guide contents'}>
      <a href="#service-scope">{es ? 'Alcance' : 'Scope'}</a>
      <a href="#service-process">{es ? 'Proceso y referencia' : 'Process and reference'}</a>
      <a href="#service-prepare">{es ? 'Qué preparar' : 'What to prepare'}</a>
      <a href="#service-questions">{es ? 'Antes de contratar' : 'Before commissioning'}</a>
    </nav>
    <section aria-labelledby="service-fit-title">
      <p className="service-depth-eyebrow">{es ? 'Elegir con información' : 'Make an informed choice'}</p>
      <h2 id="service-fit-title">{text(content.heading)}</h2>
      <p>{text(content.intro)}</p>
      <p>{text(content.fit)}</p>
    </section>
    <section id="service-scope" aria-labelledby="service-scope-title">
      <h2 id="service-scope-title">{es ? 'Qué vamos a definir en la propuesta' : 'What we define in the proposal'}</h2>
      <p>{es ? 'Antes de empezar dejamos por escrito qué se entrega, qué materiales aportás y qué condiciones corresponden al precio. Los extras se acuerdan antes de desarrollarlos.' : 'Before starting, we document deliverables, the materials you provide and the terms attached to the price. Extras are agreed before they are developed.'}</p>
      <p className="service-scope-hint">{es ? 'Deslizá la tabla para ver todas las condiciones →' : 'Scroll the table to see all conditions →'}</p>
      <div className="service-scope-scroll" role="region" aria-label={es ? 'Alcance y condiciones del servicio' : 'Service scope and conditions'} tabIndex={0}>
        <table><caption>{text(content.name)} · {es ? 'alcance y condiciones' : 'scope and conditions'}</caption>
          <thead><tr><th scope="col">{es ? 'Tema' : 'Area'}</th><th scope="col">{es ? 'Qué definimos' : 'What we define'}</th><th scope="col">{es ? 'Condición que conviene aclarar' : 'What needs clarification'}</th></tr></thead>
          <tbody>{content.scope.map(row => <tr key={text(row.topic)}><th scope="row">{text(row.topic)}</th><td>{text(row.deliverable)}</td><td>{text(row.boundary)}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
    <section id="service-process" aria-labelledby="service-process-title">
      <h2 id="service-process-title">{es ? 'Cómo pasamos de la idea a una entrega' : 'From an idea to a deliverable'}</h2>
      <ol className="service-depth-steps">{content.steps.map(step => <li key={text(step.title)}><h3>{text(step.title)}</h3><p>{text(step.body)}</p></li>)}</ol>
      <figure className="service-depth-reference">
        <Image src={content.example.image} alt={text(content.example.alt)} width={imageSize[0]} height={imageSize[1]} sizes="(max-width: 900px) 90vw, 850px" />
        <figcaption>{text(content.example.caption)} {content.example.project && <Link href={`/${locale}/${es ? 'proyectos' : 'projects'}/${content.example.project}`}>{es ? 'Ver el caso' : 'View the case'} →</Link>}</figcaption>
      </figure>
    </section>
    <section id="service-prepare" className="service-depth-prepare" aria-labelledby="service-prepare-title">
      <div><h2 id="service-prepare-title">{es ? 'Para evaluar tu proyecto' : 'To assess your project'}</h2>
        <ul>{content.prepare.map(copy => <li key={text(copy)}>{text(copy)}</li>)}</ul>
      </div>
      <div><p>{es ? 'Podés ordenar estos datos en el brief. Tus respuestas se guardan al enviar el formulario de Google; después revisamos el alcance.' : 'Use the brief to organise these details. Answers are saved when you submit the Google Form; we then review the scope. The form is in Spanish.'}</p>
        <Link className="service-depth-action" href={`/${locale}/brief`}>{es ? 'Preparar mi proyecto' : 'Prepare my project'} →</Link>
      </div>
    </section>
    <section id="service-questions" aria-labelledby="service-questions-title">
      <h2 id="service-questions-title">{es ? 'Detalles para decidir' : 'Details to help you decide'}</h2>
      {faqs.map(faq => <details className="service-depth-question" key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}
    </section>
    <nav className="service-depth-related" aria-label={es ? 'Servicios y lecturas relacionadas' : 'Related services and reading'}>
      <h2>{es ? 'Compará el alcance que necesitás' : 'Compare the scope you need'}</h2>
      <ul>{content.related.map(related => <li key={related}><Link href={`/${locale}/servicios/${related}`}>{text(serviceDetails[related].name)} →</Link></li>)}
        <li><Link href={`/${locale}/blog/${content.article}`}>{es ? 'Leer una guía antes de pedir presupuesto' : 'Read a guide before requesting a quote'} →</Link></li>
      </ul>
    </nav>
  </div>;
}
