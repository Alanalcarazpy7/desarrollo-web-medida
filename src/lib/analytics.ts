import { track } from "@vercel/analytics";
import { getAttribution } from "@/lib/attribution";

/** Valores que aceptan tanto Vercel Analytics como gtag en un evento. */
type EventProperties = Record<string, string | number | boolean | null>;

/** gtag lo inyecta el script de Google Analytics en el layout. */
type GtagWindow = Window & {
    gtag?: (command: "event", name: string, params?: EventProperties) => void;
};

/**
 * Datos personales que NUNCA deben salir hacia Analytics.
 *
 * Analytics sirve para saber cuántas consultas entran y de qué campaña, no
 * quién las mandó. El nombre, el teléfono, el correo y el texto que escribe la
 * persona viajan solo por WhatsApp, que es donde corresponde. Este filtro es
 * una red de seguridad: aunque alguien agregue una propiedad de más por
 * descuido, no se envía.
 */
const BLOCKED_KEYS = [
    "name",
    "nombre",
    "phone",
    "telefono",
    "celular",
    "email",
    "correo",
    "mail",
    "message",
    "mensaje",
    "details",
    "detalle",
    "business",
    "negocio",
    "address",
    "direccion",
];

function isBlocked(key: string) {
    const k = key.toLowerCase();
    return BLOCKED_KEYS.some((blocked) => k === blocked || k.includes(blocked));
}

function sanitize(properties?: EventProperties): EventProperties {
    if (!properties) return {};
    const clean: EventProperties = {};
    for (const [key, value] of Object.entries(properties)) {
        if (isBlocked(key)) continue;
        clean[key] = value;
    }
    return clean;
}

/**
 * Manda un evento a Vercel Analytics y a Google Analytics.
 *
 * A cada evento se le adjunta el origen de la visita (UTM, gclid, fbclid), así
 * en Google Ads se puede atribuir la consulta a la campaña que la trajo.
 *
 * @param name Nombre del evento (ej. 'landing_whatsapp_open')
 * @param properties Datos categóricos del evento. Nunca datos personales:
 *                   los que lo sean se descartan antes de enviarse.
 */
export function trackEvent(name: string, properties?: EventProperties) {
    const payload: EventProperties = { ...getAttribution(), ...sanitize(properties) };

    // 1. Track on Vercel Analytics
    try {
        track(name, payload);
    } catch (e) {
        console.error("Vercel tracking error:", e);
    }

    // 2. Track on Google Analytics (Gtag)
    if (typeof window !== "undefined") {
        const { gtag } = window as GtagWindow;
        if (gtag) {
            try {
                gtag("event", name, payload);
            } catch (e) {
                console.error("Google Analytics tracking error:", e);
            }
        }
    }
}
