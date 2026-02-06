import Navbar from "@/components/Navbar";
import BackgroundParticles from "@/components/BackgroundParticles";
import ScrollProgress from "@/components/ScrollProgress";
import HomeClient from "@/components/HomeClient";
import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: true });

export default function Home() {
  return (
    <main className="relative">
      <BackgroundParticles />
      <ScrollProgress />
      <Navbar />
      <HomeClient />
      <WhatsAppButton />
    </main>
  );
}