import { track } from "@vercel/analytics";

/** Valores que aceptan tanto Vercel Analytics como gtag en un evento. */
type EventProperties = Record<string, string | number | boolean | null>;

/** gtag lo inyecta el script de Google Analytics en el layout. */
type GtagWindow = Window & {
    gtag?: (command: "event", name: string, params?: EventProperties) => void;
};

/**
 * Tracks a custom event in both Vercel Analytics and Google Analytics (if configured).
 * @param name The name of the event (e.g. 'click_whatsapp', 'submit_contact_form')
 * @param properties Additional custom data properties
 */
export function trackEvent(name: string, properties?: EventProperties) {
    // 1. Track on Vercel Analytics
    try {
        track(name, properties);
    } catch (e) {
        console.error("Vercel tracking error:", e);
    }

    // 2. Track on Google Analytics (Gtag)
    if (typeof window !== "undefined") {
        const { gtag } = window as GtagWindow;
        if (gtag) {
            try {
                gtag("event", name, properties);
            } catch (e) {
                console.error("Google Analytics tracking error:", e);
            }
        }
    }
}
