"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Placeholder de arranque: capturas reales de otros proyectos que ya viven en
 * el repo (public/projects), solo para probar el layout y la animación.
 *
 * Cuando tengas las fotos definitivas para el Hero, ponelas en
 * `public/hero/` (por ejemplo hero-1.jpg, hero-2.jpg, ...) y reemplazá las
 * rutas de estos dos arrays por esas — el layout y la animación no
 * necesitan ningún otro cambio.
 */
const COLUMN_1 = [
    "/projects/amsterdam.png",
    "/projects/foodluck.png",
    "/projects/bar-san-roque.png",
    "/projects/global-exchange-1.png",
    "/projects/VasosPy-termos.png",
];
const COLUMN_2 = [
    "/projects/electromaster.png",
    "/projects/reservas-casa-quinta.png",
    "/projects/inmobiliaria.jpg",
    "/projects/stockpro.jpg",
    "/projects/morinigo-y-asociados.png",
];

type Direction = "up" | "down";

// Todo el layout/tamaño crítico va por estilos INLINE, no por las clases del
// <style jsx global> de abajo. Motivo: en la primera pintada (sobre todo en
// una recarga dura) puede haber un instante donde el CSS externo todavía no
// se aplicó; si ese CSS es el que le da position:relative + tamaño al tile,
// las imágenes con `fill` (que sí traen su position:absolute/100% inline de
// forma inmediata via Next/Image) no tienen contra qué medirse y se expanden
// gigantes tapando la pantalla — exactamente el bug reportado. Con estilos
// inline no hay ventana de tiempo sin aplicar: están ahí desde el primer
// render. El <style jsx global> queda reservado solo para lo que
// necesariamente requiere una hoja de estilos (@keyframes).

const tileStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio: "1 / 1",
    flexShrink: 0,
    borderRadius: "18px",
    overflow: "hidden",
    // Cada tile es su propia card flotante, no un recorte dentro de un panel
    // único. Borde con gradiente cyan (truco de doble background con
    // padding-box/border-box, mismo que usan las cards de testimonios) en vez
    // de un borde plano — y sombra en dos capas (una ambiental grande, otra
    // de contacto más ceñida) para que se sienta con volumen, no chata.
    border: "1px solid transparent",
    backgroundImage:
        "linear-gradient(160deg, rgba(26,26,36,0.97), rgba(13,13,19,0.95)), " +
        "linear-gradient(135deg, rgba(0,217,255,0.5), rgba(255,255,255,0.08) 45%, rgba(0,217,255,0.25))",
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
    WebkitBackgroundClip: "padding-box, border-box",
    boxShadow: "0 22px 45px rgba(0, 0, 0, 0.55), 0 6px 14px rgba(0, 0, 0, 0.4)",
    // El hover (transform/border/shadow al pasar el mouse) vive en globals.css
    // vía la clase hero-grid-tile — las pseudo-clases (:hover) no se pueden
    // escribir en un objeto de estilos inline de React.
};

const tileAccentLineStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: "14%",
    right: "14%",
    height: "1px",
    zIndex: 2,
    background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.7), transparent)",
    pointerEvents: "none",
};

const colStyle: CSSProperties = {
    position: "relative",
    // Sin overflow:hidden acá (a diferencia de antes): si lo tuviera, un
    // tile agrandado en hover se recortaría contra el borde angosto de su
    // propia columna. El recorte vertical del scroll infinito ya lo hace el
    // contenedor exterior (hero-grid-wrap), así que esto es seguro y deja
    // que la card "salte" un poco al pasar el mouse.
};

function trackStyle(direction: Direction, duration: number): CSSProperties {
    return {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        animationName: "hero-grid-scroll",
        animationDuration: `${duration}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        // Mismo keyframe (0 -> -50%) para ambas columnas; "reverse" es lo que
        // hace que una suba y la otra baje, sin necesitar un segundo @keyframes.
        animationDirection: direction === "up" ? "normal" : "reverse",
        willChange: "transform",
    };
}

function GridColumn({ images, direction, duration }: { images: string[]; direction: Direction; duration: number }) {
    // Set duplicado + translateY(-50%): mismo truco de loop infinito sin
    // costuras que ya se usa en ClientsMarquee/TestimonialsMarquee, pero en
    // vertical.
    const track = [...images, ...images];

    return (
        <div style={colStyle} className="hero-grid-col">
            <div style={trackStyle(direction, duration)} className="hero-grid-track-anim">
                {track.map((src, i) => (
                    <div style={tileStyle} className="hero-grid-tile" key={`${src}-${i}`}>
                        <div aria-hidden style={tileAccentLineStyle} />
                        {/* Volvimos a "cover" (sin franjas), pero anclado
                            arriba-izquierda: en la mayoría de estas capturas
                            de escritorio el logo/nombre de marca y el mensaje
                            principal están ahí, así que el recorte cuadrado
                            se queda con la parte más reconocible de cada
                            sitio en vez de un pedazo random del medio. */}
                        <Image src={src} alt="" fill sizes="(min-width: 1024px) 300px, 45vw" style={{ objectFit: "cover", objectPosition: "left top" }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function HeroImageGrid() {
    return (
        <div
            className="hero-grid-outer"
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "clamp(400px, 40vw, 580px)",
                // 100% de la celda del grid del Hero: en desktop, Hero.tsx usa
                // items-stretch, así que esta columna termina con la MISMA
                // altura real que la columna de texto. minHeight cubre el
                // caso mobile (fila de una sola columna, alto "auto");
                // maxHeight es solo un techo de seguridad generoso, no un
                // tope que compita con "misma altura que el texto". Los
                // breakpoints de laptop bajo/mobile (que la achican más) van
                // en globals.css como override con !important.
                height: "100%",
                minHeight: "380px",
                maxHeight: "700px",
            }}
        >
            {/* Brillo ambiental cyan detrás/alrededor de las cards, sangrando
                más allá del borde — mismo lenguaje visual que el glow del
                Hero y de ClientsMarquee. Va en un div aparte (no dentro del
                contenedor recortado) porque ese tiene overflow:hidden y lo
                taparía. */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: "-10%",
                    borderRadius: "50%",
                    background: "radial-gradient(closest-side, rgba(0, 217, 255, 0.35), transparent 72%)",
                    filter: "blur(50px)",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />

            {/* Sin borde/sombra propios acá: antes esto era un panel único que
                encerraba las dos columnas como si fueran una sola card
                grande. Ahora es solo el contenedor que recorta el scroll
                vertical — cada tile de adentro tiene su propio borde y
                sombra, así se leen como cards independientes. */}
            <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", overflow: "hidden", borderRadius: "28px" }}>
                <div
                    aria-hidden
                    style={{ position: "absolute", left: 0, right: 0, top: 0, height: "60px", zIndex: 5, pointerEvents: "none", background: "linear-gradient(180deg, #000, transparent)" }}
                />
                <div
                    aria-hidden
                    style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "60px", zIndex: 5, pointerEvents: "none", background: "linear-gradient(0deg, #000, transparent)" }}
                />

                {/* Solo 2 columnas (una sube, otra baja) con tiles grandes: se
                    ven ~3 a la vez en vez de un mosaico chiquito de fotos. */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "18px",
                        width: "100%",
                        height: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    <GridColumn images={COLUMN_1} direction="up" duration={30} />
                    <GridColumn images={COLUMN_2} direction="down" duration={34} />
                </div>
            </div>
        </div>
    );
}
