import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Proceso from "@/components/Proceso";
import Proyectos from "@/components/Proyectos";
import Testimonios from "@/components/Testimonios";
import Estadisticas from "@/components/Estadisticas";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

import BackgroundParticles from "@/components/BackgroundParticles";

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
      {/* <Estadisticas /> */}
      {/* <Testimonios /> */}
      <Contacto />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}