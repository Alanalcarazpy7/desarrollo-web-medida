/** Server configuration: never invent or expose an unfinished Google Form. */
// Public responder URL supplied by the owner after creating the form.
const DEFAULT_BRIEF_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfG0z932g1PDKUFPKRuvchD0juQ1d93wX88mA8ufJteG-kxDA/viewform';

export function getBriefFormUrl(): string | null {
  const raw = process.env.BRIEF_GOOGLE_FORM_URL?.trim() || DEFAULT_BRIEF_FORM_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    const allowed = (url.hostname === 'forms.gle' && url.pathname.length > 1)
      || (url.hostname === 'docs.google.com' && /^\/forms\/d\/(?:e\/)?[^/]+\/viewform\/?$/.test(url.pathname));
    if (url.protocol !== 'https:' || !allowed || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}
