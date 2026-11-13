/** Call directly from the user's click/submit; never after an async delay. */
export function openWhatsAppDraft(href: string, open = window.open.bind(window)): boolean {
  try {
    const popup = open('about:blank', '_blank');
    if (!popup) return false;
    popup.opener = null;
    popup.location.replace(href);
    return true;
  } catch {
    return false;
  }
}
