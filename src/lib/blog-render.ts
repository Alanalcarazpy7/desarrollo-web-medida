export type ArticleSection = { id: string; text: string };

/** Trusted, repository-authored HTML only. Keep content processing on server. */
export function renderBlogArticle(raw: string, lang: 'es' | 'en' = 'es') {
  const toc: ArticleSection[] = [];
  const used = new Set<string>();
  let html = raw.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!text) return match;
    const existing = attrs.match(/\bid=["']([^"']+)["']/);
    const base = existing?.[1] || text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60) || 'section';
    let id = base;
    let suffix = 2;
    while (used.has(id)) id = base + '-' + suffix++;
    used.add(id);
    toc.push({ id, text });
    return `<h2${attrs.replace(/\s+id=["'][^"']+["']/, '')} id="${id}">${inner}</h2>`;
  });
  // The scroll belongs to the table, never to the whole page. Native table
  // semantics remain intact and the wrapper is reachable with a keyboard.
  html = html.replace(/<table\b([^>]*)>([\s\S]*?)<\/table>/gi, (_match, attrs: string, inner: string) => {
    const caption = inner.match(/<caption[^>]*>([\s\S]*?)<\/caption>/i)?.[1]?.replace(/<[^>]+>/g, '') || (lang === 'es' ? 'Tabla comparativa' : 'Comparison table');
    const label = caption.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    return `<div class="article-table-scroll" role="region" aria-label="${label}" tabindex="0"><table${attrs}>${inner}</table></div>`;
  });
  return { html, toc };
}
