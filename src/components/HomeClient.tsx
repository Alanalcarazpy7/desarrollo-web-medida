"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";

const Proceso = dynamic(() => import("@/components/Proceso"), { ssr: true });
const Proyectos = dynamic(() => import("@/components/Proyectos"), { ssr: true });
const Precios = dynamic(() => import("@/components/Precios"), { ssr: true });
const Contacto = dynamic(() => import("@/components/Contacto"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

// Componente simple para fade-in al hacer scroll
// Usa once: true para que no interfiera con el navbar
function FadeInSection({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
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
                <Servicios />
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
                <Contacto />
            </FadeInSection>

            <FadeInSection>
                <Footer />
            </FadeInSection>
        </>
    );
}
