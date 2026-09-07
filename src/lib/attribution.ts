/**
 * Origen de la visita (UTM + identificadores de clic de anuncios).
 *
 * Para qué sirve: cuando arranquen los anuncios, hay que poder responder "esta
 * consulta vino de qué campaña". Google Ads pasa `gclid` y Meta pasa `fbclid`
 * en la URL de llegada, pero esos parámetros se pierden apenas la persona
 * navega a otra página. Acá se guardan la primera vez y se adjuntan a cada
 * evento que se manda a Analytics.
 *
 * Se usa "primer contacto de la sesión": si alguien entra por un anuncio y
 * después vuelve por Google, el crédito queda en el anuncio, que es lo que
 * interesa medir.
 */

const STORAGE_KEY = "solvatech:attribution";

const UTM_KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
] as const;

/** Identificadores de clic que agregan las plataformas de anuncios. */
const CLICK_IDS = ["gclid", "wbraid", "gbraid", "fbclid", "msclkid", "ttclid"] as const;

export type Attribution = Record<string, string>;

/**
 * Guarda el origen la primera vez que aparece en la sesión.
 * Llamar una sola vez, al cargar la app.
 */
export function captureAttribution(): void {
    if (typeof window === "undefined") return;

    try {
        // Si ya hay algo guardado en esta sesión, no se pisa: primer contacto gana.
        if (sessionStorage.getItem(STORAGE_KEY)) return;

        const params = new URLSearchParams(window.location.search);
        const found: Attribution = {};

        for (const key of UTM_KEYS) {
            const value = params.get(key);
            if (value) found[key] = value.slice(0, 100);
        }
        for (const key of CLICK_IDS) {
            const value = params.get(key);
            if (value) found[key] = value.slice(0, 200);
        }

        // Sin parámetros de campaña se guarda igual de dónde vino, que sirve
        // para separar tráfico directo de buscador o redes.
        if (Object.keys(found).length === 0) {
            const ref = document.referrer;
            if (ref) {
                try {
                    const host = new URL(ref).hostname;
                    if (host && host !== window.location.hostname) found.referrer = host;
                } catch {
                    // referrer inválido: se ignora
                }
            }
        }

        // La página de llegada va SIN query: la query puede traer lo que sea y
        // acá no se guarda nada que no se haya leído a propósito arriba.
        found.landing_page = window.location.pathname;

        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    } catch {
        // Modo incógnito o storage bloqueado: la atribución es un extra.
    }
}

/** Devuelve el origen guardado para adjuntarlo a los eventos. */
export function getAttribution(): Attribution {
    if (typeof window === "undefined") return {};
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const parsed: unknown = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return {};
        const out: Attribution = {};
        for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
            if (typeof v === "string") out[k] = v;
        }
        return out;
    } catch {
        return {};
    }
}
