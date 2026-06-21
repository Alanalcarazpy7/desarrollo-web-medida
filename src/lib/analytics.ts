import { track } from "@vercel/analytics";

/**
 * Tracks a custom event in both Vercel Analytics and Google Analytics (if configured).
 * @param name The name of the event (e.g. 'click_whatsapp', 'submit_contact_form')
 * @param properties Additional custom data properties
 */
export function trackEvent(name: string, properties?: Record<string, any>) {
    // 1. Track on Vercel Analytics
    try {
        track(name, properties);
    } catch (e) {
        console.error("Vercel tracking error:", e);
    }

    // 2. Track on Google Analytics (Gtag)
    if (typeof window !== "undefined" && (window as any).gtag) {
        try {
            (window as any).gtag("event", name, properties);
        } catch (e) {
            console.error("Google Analytics tracking error:", e);
        }
    }
}
