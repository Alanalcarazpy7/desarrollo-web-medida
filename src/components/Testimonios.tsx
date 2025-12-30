"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonios = [
    {
        nombre: "María González",
        cargo: "CEO, Fashion Store",
        testimonio: "Alan transformó completamente nuestra presencia online. El e-commerce no solo es hermoso, sino que las ventas aumentaron un 300% en el primer mes gracias a la velocidad y UX.",
        avatar: "MG",
        gradient: "from-pink-500 to-rose-500",
        rating: 5,
    },
    {
        nombre: "Carlos Ramírez",
        cargo: "Director, Tech Solutions",
        testimonio: "Necesitábamos un dashboard complejo y el resultado superó las expectativas. La arquitectura es robusta y la interfaz intuitiva. Un verdadero partner tecnológico.",
        avatar: "CR",
        gradient: "from-blue-500 to-indigo-500",
        rating: 5,
    },
    {
        nombre: "Ana Martínez",
        cargo: "Fundadora, EdTech",
        testimonio: "Increíble atención al detalle. La plataforma educativa es rápida, accesible y escala perfectamente. El soporte post-lanzamiento ha sido impecable.",
        avatar: "AM",
        gradient: "from-purple-500 to-violet-500",
        rating: 5,
    },
];

export default function Testimonios() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="testimonios" ref={ref} className="py-40 relative flex justify-center scroll-mt-32">
            {/* Círculos decorativos */}
            <div className="absolute top-20 right-[10%] w-32 h-32 border border-white/5 rounded-full" />
            <div className="absolute bottom-20 left-[10%] w-24 h-24 border border-white/5 rounded-full" />

            <div className="w-full max-w-7xl px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20 md:mb-24"
                >
                    {/* Distintivo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-full cursor-default"
                        style={{
                            background: `rgba(10, 10, 10, 0.8)`,
                            border: `2px solid #00d9ff30`,
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <motion.span
                            className="w-3 h-3 rounded-full"
                            style={{ background: "#00d9ff", boxShadow: `0 0 20px rgba(0, 217, 255, 0.5)` }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [1, 0.7, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: "#00d9ff" }}>
                            Voces de Clientes
                        </span>
                    </motion.div>

                    {/* Título */}
                    <h2 className="text-4xl md:text-6xl font-black mb-6 px-4" style={{ margin: '1rem 0' }}>
                        <span className="text-white">Confianza </span>
                        <br className="md:hidden" />
                        <span
                            style={{
                                background: `linear-gradient(135deg, #00d9ff, #0099cc)`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Total
                        </span>
                    </h2>

                    {/* Subtítulo */}
                    <div className="flex justify-center w-full px-6">
                        <p className="text-base md:text-xl text-slate-400 max-w-2xl leading-relaxed text-center opacity-80" style={{ margin: '1rem 0' }}>
                            Lo que dicen los líderes que ya han transformado su negocio con nosotros.
                        </p>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonios.map((testimonio, index) => (
                        <motion.div
                            key={testimonio.nombre}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="glass-card p-10 rounded-[32px] relative flex flex-col justify-between"
                        >
                            {/* Icono de cita */}
                            <div className="absolute top-8 right-8 text-6xl text-white/5 font-serif">"</div>

                            <div>
                                <div className="flex gap-1 mb-8">
                                    {[...Array(testimonio.rating)].map((_, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ delay: index * 0.15 + i * 0.1 }}
                                            className="text-yellow-400 text-xl"
                                        >
                                            ★
                                        </motion.span>
                                    ))}
                                </div>

                                <p className="text-slate-300 mb-8 leading-relaxed text-lg font-light italic">
                                    "{testimonio.testimonio}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonio.gradient} flex items-center justify-center font-bold text-xl text-white shadow-lg`}>
                                    {testimonio.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-lg">{testimonio.nombre}</div>
                                    <div className="text-sm text-purple-400 font-medium">{testimonio.cargo}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
