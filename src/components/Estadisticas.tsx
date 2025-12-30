"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";


export default function Estadisticas() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const stats = [
        {
            numero: 50,
            sufijo: "+",
            titulo: "Proyectos Completados",
            descripcion: "Sitios web, apps y sistemas entregados con éxito",
            icon: "🚀",
            gradient: "from-purple-500 to-pink-500",
        },
        {
            numero: 100,
            sufijo: "%",
            titulo: "Clientes Satisfechos",
            descripcion: "Satisfacción garantizada en cada proyecto",
            icon: "⭐",
            gradient: "from-cyan-500 to-blue-500",
        },
        {
            numero: 5,
            sufijo: "+",
            titulo: "Años de Experiencia",
            descripcion: "Desarrollando soluciones digitales innovadoras",
            icon: "💼",
            gradient: "from-emerald-500 to-teal-500",
        },
        {
            numero: 24,
            sufijo: "/7",
            titulo: "Soporte Técnico",
            descripcion: "Disponibles cuando nos necesites",
            icon: "🛟",
            gradient: "from-orange-500 to-red-500",
        },
    ];

    return (
        <section ref={ref} className="py-32 relative overflow-hidden flex justify-center">
            {/* Fondo */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />

            {/* Círculos animados */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-purple-500/10"
                        style={{
                            width: `${300 + i * 200}px`,
                            height: `${300 + i * 200}px`,
                            top: "50%",
                            left: "50%",
                            x: "-50%",
                            y: "-50%",
                        }}
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3],
                            rotate: 360,
                        }}
                        transition={{
                            duration: 20 + i * 5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                {/* Encabezado */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20"
                    >
                        Números que Hablan
                    </motion.span>

                    <h2 className="text-5xl md:text-6xl font-black mb-6">
                        Resultados{" "}
                        <span className="gradient-text">Medibles</span>
                    </h2>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Datos reales que demuestran nuestro compromiso con la excelencia
                    </p>
                </motion.div>

                {/* Cuadrícula de estadísticas */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.titulo} stat={stat} index={index} isInView={isInView} />
                    ))}
                </div>

                {/* Información adicional */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-20 grid md:grid-cols-3 gap-8"
                >
                    {[
                        {
                            titulo: "Tecnología Moderna",
                            descripcion: "Utilizamos las últimas herramientas y frameworks del mercado",
                            icon: "⚡",
                        },
                        {
                            titulo: "Código Limpio",
                            descripcion: "Seguimos las mejores prácticas de desarrollo y arquitectura",
                            icon: "💎",
                        },
                        {
                            titulo: "Escalabilidad",
                            descripcion: "Soluciones preparadas para crecer con tu negocio",
                            icon: "📈",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={item.titulo}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass-card p-6 rounded-2xl text-center"
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.titulo}</h3>
                            <p className="text-slate-400 text-sm">{item.descripcion}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function StatCard({ stat, index, isInView }: any) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isInView) {
            const controls = {
                duration: 2,
                ease: "easeOut",
            };

            const animation = count.set(stat.numero);

            return () => { };
        }
    }, [isInView, stat.numero, count]);

    return (
        <motion.div
            ref={nodeRef}
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
            }}
            whileHover={{
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 },
            }}
            className="relative group"
            style={{ perspective: "1000px" }}
        >
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden h-full flex flex-col items-center text-center">
                {/* Gradiente de fondo */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Icono */}
                <motion.div
                    className="text-6xl mb-6 relative z-10"
                    animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                    }}
                >
                    {stat.icon}
                </motion.div>

                {/* Número */}
                <div className="mb-4 relative z-10">
                    <motion.span
                        className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    >
                        {isInView ? stat.numero : 0}
                    </motion.span>
                    <span className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.sufijo}
                    </span>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">
                    {stat.titulo}
                </h3>

                {/* Descripción */}
                <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                    {stat.descripcion}
                </p>

                {/* Efecto de resplandor */}
                <motion.div
                    className={`absolute -inset-4 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`}
                    animate={{
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Resplandor de borde */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.gradient} opacity-20 blur-sm`} />
                </div>
            </div>
        </motion.div>
    );
}