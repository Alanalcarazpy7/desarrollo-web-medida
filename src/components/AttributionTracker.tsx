"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Guarda de dónde vino la visita apenas carga la página, antes de que la
 * persona navegue y se pierdan los parámetros de la URL (gclid, utm_*).
 * No renderiza nada.
 */
export default function AttributionTracker() {
    useEffect(() => {
        captureAttribution();
    }, []);

    return null;
}
