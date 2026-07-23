"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";

const Proceso = dynamic(() => import("@/components/Proceso"), { ssr: true });
const Proyectos = dynamic(() => import("@/components/Proyectos"), { ssr: true });
const Precios = dynamic(() => import("@/components/Precios"), { ssr: true });
const BlogCarousel = dynamic(() => import("@/components/BlogCarousel"), { ssr: true });
const Contacto = dynamic(() => import("@/components/Contacto"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const Confianza = dynamic(() => import("@/components/Confianza"), { ssr: true });
const IdealPara = dynamic(() => import("@/components/IdealPara"), { ssr: true });
const Testimonios = dynamic(() => import("@/components/Testimonios"), { ssr: true });
const VideoTestimonials = dynamic(() => import("@/components/VideoTestimonials"), { ssr: true });

// Componente simple para fade-in al hacer scroll
// Usa once: true para que no interfiera con el navbar
//
// amount (antes 0.1) es un % de la altura DEL PROPIO elemento, no del
// viewport: con secciones muy largas (Proyectos, Precios llegan a ~5000px+
// de alto en mobile) y una pantalla baja (ej. 320x480), el ratio de
// intersección real nunca alcanza ese 10% aunque hagas scroll por toda la
// sección — el IntersectionObserver jamás dispara "isIntersecting: true", y
// como es whileInView con opacity inicial en 0, la sección queda invisible
// para siempre (once:true no reintenta). Sigue ahí en el DOM (por eso se
// podía hacer click y algo pasaba), solo que con opacity:0 heredado.
// amount:0 dispara con que un solo píxel entre en el viewport, sin importar
// cuán alta sea la sección.
function FadeInSection({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

export default function HomeClient() {
    return (
        <>
            <Hero />

            <FadeInSection>
                <VideoTestimonials />
            </FadeInSection>

            <FadeInSection>
                <Servicios />
            </FadeInSection>

            <FadeInSection>
                <Confianza />
            </FadeInSection>

            <FadeInSection>
                <IdealPara />
            </FadeInSection>

            <FadeInSection>
                <Proceso />
            </FadeInSection>

            <FadeInSection>
                <Proyectos />
            </FadeInSection>

            <FadeInSection>
                <Precios />
            </FadeInSection>

            <FadeInSection>
                <Testimonios />
            </FadeInSection>

            <FadeInSection>
                <BlogCarousel />
            </FadeInSection>

            <FadeInSection>
                <FAQ />
            </FadeInSection>

            <FadeInSection>
                <Contacto />
            </FadeInSection>

            <FadeInSection>
                <Footer />
            </FadeInSection>
        </>
    );
}
