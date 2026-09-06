import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

/**
 * 404 de marca. En esta app no hay `app/layout.tsx` (el layout raíz es
 * `[lang]/layout.tsx`), así que para rutas totalmente inexistentes Next
 * usa ESTE archivo, que renderiza sin layout. Va todo autocontenido: sin
 * Navbar (necesita el LanguageProvider) y con animaciones en CSS puro para
 * no depender de JS. Queda en español, el idioma principal del sitio. El
 * 404 bilingüe con Navbar es `[lang]/not-found.tsx` y se usa cuando una
 * página existente llama a notFound().
 */
export const metadata: Metadata = {
  title: "Página no encontrada | SolvaTech",
  robots: { index: false, follow: true },
};

const ACCENT = "#00d9ff";

const cards = [
  {
    href: "/es/servicios",
    title: "Servicios",
    desc: "Webs, catálogos, tiendas y sistemas a medida.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/es/proyectos",
    title: "Proyectos",
    desc: "Negocios reales que ya están online.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="6.5" width="19" height="13" rx="2" />
        <path d="M9 6.5V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M2.5 12h19" />
      </svg>
    ),
  },
  {
    href: "/es/servicios/desarrollo-web-paraguay",
    title: "Desarrollo web",
    desc: "Cómo trabajamos y cuánto cuesta, sin vueltas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l-5-6 5-6M15 6l5 6-5 6" />
      </svg>
    ),
  },
  {
    href: "/es/blog",
    title: "Blog",
    desc: "Guías para hacer crecer tu negocio online.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3.5h14a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
];

const css = `
.nf{--a:${ACCENT};--a2:#0099cc;min-height:100vh;background:#050609;color:#fff;
  font-family:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;
  position:relative;overflow:hidden;display:flex;flex-direction:column;
  align-items:center;justify-content:center;padding:64px 20px}
.nf *{box-sizing:border-box}

/* fondo */
.nf-grid{position:absolute;inset:0;pointer-events:none;opacity:.35;
  background-image:linear-gradient(rgba(0,217,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(0,217,255,.055) 1px,transparent 1px);
  background-size:56px 56px;
  -webkit-mask-image:radial-gradient(ellipse 70% 55% at 50% 40%,#000 30%,transparent 100%);
  mask-image:radial-gradient(ellipse 70% 55% at 50% 40%,#000 30%,transparent 100%)}
.nf-orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(70px);opacity:.55}
.nf-orb.a{width:460px;height:460px;top:-170px;right:-130px;background:radial-gradient(circle,rgba(0,217,255,.42),transparent 70%);animation:nf-drift 15s ease-in-out infinite}
.nf-orb.b{width:380px;height:380px;bottom:-190px;left:-120px;background:radial-gradient(circle,rgba(0,153,204,.38),transparent 70%);animation:nf-drift 19s ease-in-out infinite reverse}

.nf-main{position:relative;width:100%;max-width:860px;text-align:center}

/* marca con anillo orbital */
.nf-brand{display:inline-flex;align-items:center;gap:13px;text-decoration:none;margin-bottom:28px;
  opacity:0;animation:nf-in .55s ease forwards}
.nf-mark{position:relative;width:52px;height:52px;flex-shrink:0}
.nf-mark .ring{position:absolute;inset:-5px;border-radius:50%;border:1px dashed rgba(0,217,255,.45);animation:nf-spin 11s linear infinite}
.nf-mark .core{position:absolute;inset:0;border-radius:14px;display:flex;align-items:center;justify-content:center;overflow:hidden;
  background:linear-gradient(135deg,#0b0e15,#12161f);border:1px solid rgba(0,217,255,.35);box-shadow:0 0 26px rgba(0,217,255,.28)}
.nf-mark img{width:38px;height:38px;object-fit:contain}
.nf-brand-tx{display:flex;flex-direction:column;line-height:1;text-align:left}
.nf-brand-tx b{font-size:1.22rem;font-weight:800;letter-spacing:.02em;color:#fff}
.nf-brand-tx b span{font-weight:300;color:var(--a)}
.nf-brand-tx i{font-size:.55rem;font-style:normal;letter-spacing:.24em;text-transform:uppercase;color:#8b95a3;margin-top:5px}

/* 404 */
.nf-404{font-size:clamp(5rem,20vw,10rem);font-weight:900;line-height:.9;margin:0;letter-spacing:-.045em;
  background:linear-gradient(110deg,var(--a) 0%,#9decff 32%,var(--a2) 52%,#9decff 74%,var(--a) 100%);
  background-size:220% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  animation:nf-shine 5.5s linear infinite,nf-in .55s ease .08s both;
  filter:drop-shadow(0 0 34px rgba(0,217,255,.28))}
.nf-tag{display:inline-flex;align-items:center;gap:8px;margin:18px 0 0;padding:7px 15px;border-radius:999px;
  background:rgba(0,217,255,.08);border:1px solid rgba(0,217,255,.3);
  font-size:.66rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--a);
  opacity:0;animation:nf-in .55s ease .14s forwards}
.nf-tag i{width:6px;height:6px;border-radius:50%;background:var(--a);box-shadow:0 0 9px var(--a);animation:nf-blink 2s infinite}
.nf-h1{font-size:clamp(1.5rem,4.6vw,2.3rem);font-weight:900;letter-spacing:-.02em;margin:16px 0 12px;
  opacity:0;animation:nf-in .55s ease .2s forwards}
.nf-p{color:#9aa4b2;line-height:1.7;margin:0 auto;max-width:46ch;font-size:1rem;
  opacity:0;animation:nf-in .55s ease .26s forwards}

/* cards */
.nf-cards{display:grid;grid-template-columns:1fr;gap:12px;margin:36px auto 0;text-align:left;
  opacity:0;animation:nf-in .55s ease .34s forwards}
.nf-card{position:relative;overflow:hidden;display:flex;align-items:flex-start;gap:13px;padding:17px 18px;border-radius:16px;
  text-decoration:none;background:linear-gradient(160deg,#0e1119,#0b0f17);border:1px solid rgba(255,255,255,.08);
  transition:transform .3s cubic-bezier(.22,1,.36,1),border-color .3s,box-shadow .3s}
.nf-card::after{content:"";position:absolute;inset:0;border-radius:inherit;opacity:0;transition:opacity .3s;
  background:radial-gradient(circle at 25% 0%,rgba(0,217,255,.16),transparent 62%)}
.nf-card:hover{transform:translateY(-4px);border-color:rgba(0,217,255,.5);box-shadow:0 18px 40px rgba(0,0,0,.55),0 0 28px rgba(0,217,255,.16)}
.nf-card:hover::after{opacity:1}
.nf-card .ic{position:relative;flex-shrink:0;width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;
  color:var(--a);background:linear-gradient(135deg,rgba(0,217,255,.22),rgba(0,217,255,.05));border:1px solid rgba(0,217,255,.3)}
.nf-card .ic svg{width:20px;height:20px}
.nf-card .tx{position:relative;min-width:0;flex:1}
.nf-card .tx b{display:block;font-size:.95rem;font-weight:800;color:#fff;margin-bottom:3px}
.nf-card .tx span{display:block;font-size:.8rem;line-height:1.45;color:#8b95a3}
.nf-card .go{position:relative;flex-shrink:0;align-self:center;color:#5c6673;transition:color .25s,transform .25s}
.nf-card .go svg{width:17px;height:17px}
.nf-card:hover .go{color:var(--a);transform:translateX(3px)}

/* cta */
.nf-cta{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:32px;
  opacity:0;animation:nf-in .55s ease .42s forwards}
.nf-btn{display:inline-flex;align-items:center;gap:9px;padding:14px 27px;border-radius:999px;font-weight:800;font-size:.95rem;
  text-decoration:none;transition:transform .22s,box-shadow .22s,filter .22s,background .22s}
.nf-btn svg{width:17px;height:17px}
.nf-btn.solid{background:linear-gradient(135deg,var(--a),var(--a2));color:#04121a;box-shadow:0 12px 32px rgba(0,217,255,.3)}
.nf-btn.solid:hover{transform:translateY(-2px) scale(1.02);filter:brightness(1.07)}
.nf-btn.wa{border:1px solid rgba(37,211,102,.45);color:#25d366}
.nf-btn.wa:hover{background:rgba(37,211,102,.1);transform:translateY(-2px)}

@keyframes nf-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes nf-shine{to{background-position:220% 0}}
@keyframes nf-spin{to{transform:rotate(360deg)}}
@keyframes nf-blink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes nf-drift{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-28px,26px) scale(1.1)}}

@media (min-width:560px){.nf-cards{grid-template-columns:1fr 1fr}}
@media (min-width:900px){.nf-cards{grid-template-columns:repeat(4,1fr)}
  .nf-card{flex-direction:column;align-items:flex-start;gap:11px;padding:20px}
  .nf-card .go{align-self:flex-start;margin-top:2px}}

@media (prefers-reduced-motion:reduce){
  .nf-brand,.nf-404,.nf-tag,.nf-h1,.nf-p,.nf-cards,.nf-cta{animation:none;opacity:1}
  .nf-orb,.nf-mark .ring,.nf-tag i{animation:none}
}
`;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function RootNotFound() {
  return (
    <div className="nf">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <span className="nf-grid" aria-hidden />
      <span className="nf-orb a" aria-hidden />
      <span className="nf-orb b" aria-hidden />

      <div className="nf-main">
        <Link href="/es" className="nf-brand">
          <span className="nf-mark">
            <span className="ring" aria-hidden />
            <span className="core">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/favicon.png" alt="" />
            </span>
          </span>
          <span className="nf-brand-tx">
            <b>
              Solva<span>Tech</span>
            </b>
            <i>Tecnología &amp; desarrollo web</i>
          </span>
        </Link>

        <p className="nf-404">404</p>

        <span className="nf-tag">
          <i /> Página no encontrada
        </span>

        <h1 className="nf-h1">Esta página no existe (o ya no está acá)</h1>
        <p className="nf-p">
          El enlace puede estar mal escrito, la página se movió o la dimos de baja. Te dejamos los
          accesos que más se usan:
        </p>

        <div className="nf-cards">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="nf-card">
              <span className="ic">{c.icon}</span>
              <span className="tx">
                <b>{c.title}</b>
                <span>{c.desc}</span>
              </span>
              <span className="go">
                <Arrow />
              </span>
            </Link>
          ))}
        </div>

        <div className="nf-cta">
          <Link href="/es" className="nf-btn solid">
            Volver al inicio <Arrow />
          </Link>
          <a
            href="https://wa.me/595994295092"
            target="_blank"
            rel="noopener noreferrer"
            className="nf-btn wa"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.9 4.43-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.43 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.19-1.58-1.19-3.02 0-1.43.75-2.14 1.02-2.43.27-.29.59-.36.79-.36l.56.01c.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.93 1.94 1.22 2.22 1.36.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.25.09 1.6.76 1.87.9.28.14.46.21.53.32.07.12.07.66-.17 1.34Z" />
            </svg>
            Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
