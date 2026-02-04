import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import BackgroundParticles from "@/components/BackgroundParticles";
import ScrollProgress from "@/components/ScrollProgress";

// Carga dinámica para componentes debajo del fold (reduce TBT y bundle inicial)
const Proceso = dynamic(() => import("@/components/Proceso"), { ssr: true });
const Proyectos = dynamic(() => import("@/components/Proyectos"), { ssr: true });
const Precios = dynamic(() => import("@/components/Precios"), { ssr: true });
const Contacto = dynamic(() => import("@/components/Contacto"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: true });

export default function Home() {
  return (
    <main className="relative">
      <BackgroundParticles />
      <ScrollProgress />
      <Navbar />
      <Hero />

      <Servicios />
      <Proceso />
      <Proyectos />
      <Precios />
      {/* <Estadisticas /> */}
      {/* <Testimonios /> */}
      <Contacto />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}