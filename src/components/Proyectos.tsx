"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
import Image from "next/image";

// Componente de tarjeta 3D
function ProjectCard({ project, index, theme }: { project: any, index: number, theme: any }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                perspective: 1200,
            }}
            className="w-full h-full max-w-[380px] mx-auto md:max-w-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.a
                href={project.link}
                aria-label={`Ver detalles del proyecto ${project.titulo}`}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative block w-full h-full rounded-[24px] bg-[#0a0a0a] group flex flex-col"
                initial="rest"
                whileHover="hover"
            >
                {/* Borde con gradiente animado */}
                <div className="absolute -inset-[3px] rounded-[27px] bg-gradient-to-r from-cyan-500 via-white to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

                {/* Contenedor de contenido de la tarjeta */}
                <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/10 flex flex-col grow shadow-2xl" style={{ backgroundColor: '#13141C' }}>

                    {/* Sección de imagen */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0">
                        <motion.div
                            className="w-full h-full"
                            variants={{
                                rest: { scale: 1 },
                                hover: { scale: 1.1 }
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <Image
                                src={project.imagen}
                                alt={project.titulo}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className={`object-cover ${project.objectPosition === 'left' ? 'object-left' : 'object-center'}`}
                                priority={index < 2}
                            />
                        </motion.div>

                        {/* Etiqueta de categoría */}
                        <div className="absolute top-5 right-5 z-20">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                style={{
                                    backgroundColor: 'rgba(19, 20, 28, 0.9)',
                                    border: '1px solid rgba(0, 217, 255, 0.3)',
                                    borderRadius: '6px',
                                    padding: '6px 16px',
                                    backdropFilter: 'blur(4px)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                                }}
                            >
                                <span style={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    color: '#00d9ff',
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase'
                                }}>
                                    {project.categoria}
                                </span>
                            </motion.div>
                        </div>

                        {/* Superposición al pasar el cursor */}
                        <motion.div
                            className="absolute inset-0"
                            variants={{
                                rest: { opacity: 0 },
                                hover: { opacity: 1 }
                            }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            style={{ backgroundColor: "rgba(0, 50, 100, 0.4)" }}
                        />

                        {/* Botón Ver Proyecto */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                            <motion.div
                                variants={{
                                    rest: { y: 20, opacity: 0, scale: 0.9 },
                                    hover: { y: 0, opacity: 1, scale: 1 }
                                }}
                                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '16px 36px',
                                    backgroundColor: '#00d9ff', // Solid Cyan
                                    borderRadius: '50px', // Pill shape
                                    boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)', // Strong glow
                                    fontSize: '14px',
                                    fontWeight: 800,
                                    color: '#000000', // Black text for contrast
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    cursor: 'pointer'
                                }}
                            >
                                <span>Ver Proyecto</span>
                                <svg style={{ width: '18px', height: '18px', color: '#000000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.div>
                        </div>
                    </div>

                    {/* Sección de contenido */}
                    <div
                        className="relative flex flex-col gap-5 z-10 grow"
                        style={{ padding: '32px 32px 40px 32px', backgroundColor: 'transparent' }}
                    >
                        {/* Tecnologías */}
                        <div className="flex flex-wrap gap-2">
                            {project.tecnologias.map((tech: string) => (
                                <span
                                    key={tech}
                                    style={{
                                        padding: '5px 14px',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        color: '#00d9ff',
                                        backgroundColor: 'rgba(0, 217, 255, 0.05)',
                                        border: '1px solid rgba(0, 217, 255, 0.1)',
                                        borderRadius: '6px',
                                        transition: 'all 0.3s ease',
                                        cursor: 'default'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.15)';
                                        e.currentTarget.style.border = '1px solid rgba(0, 217, 255, 0.4)';
                                        e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 217, 255, 0.2)';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.05)';
                                        e.currentTarget.style.border = '1px solid rgba(0, 217, 255, 0.1)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Contenido de texto principal */}
                        <div className="space-y-3 pb-2">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none group-hover:text-[#00d9ff] transition-colors duration-300">
                                {project.titulo}
                            </h3>
                            <p className="text-sm text-slate-300 font-medium leading-relaxed pr-2">
                                {project.descripcion}
                            </p>
                        </div>
                    </div>

                    {/* Superposición brillante al pasar el cursor */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />

                    {/* Borde de resplandor interior */}
                    <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/50 rounded-[24px] transition-colors duration-300 pointer-events-none" />
                </div>
            </motion.a>
        </motion.div >
    );
}

export default function Proyectos() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const theme = {
        bg: "#000000",
        bgCard: "#0a0a0a",
        bgCardHover: "#111111",
        accent: "#00d9ff",
        accentDark: "#0099cc",
        accentGlow: "rgba(0, 217, 255, 0.5)",
        text: "#ffffff",
        textMuted: "#888888"
    };

    const categorias = ["Todos", "Sistemas", "E-commerce", "Sitio Web"];

    const proyectos = [
        {
            titulo: "ModaShoppy",
            categoria: "E-commerce",
            tecnologias: ["React", "Supabase", "Zustand"],
            descripcion: "Plataforma de moda escalable con gestión de stock integrada y experiencia de compra optimizada.",
            imagen: "/projects/modashoppy.png",
            link: "#",
        },
        {
            titulo: "StockPRO",
            categoria: "Sistemas",
            tecnologias: ["React", "Supabase", "Zustand", "TanStack"],
            descripcion: "Gestión de inventarios de alto rendimiento con sincronización en tiempo real y dashboard analítico modular.",
            imagen: "/projects/stockpro.jpg",
            objectPosition: "left",
            link: "#",
        },
        {
            titulo: "Inmobiliaria Premium",
            categoria: "Sitio Web",
            tecnologias: ["React", "HTML5", "CSS3"],
            descripcion: "Plataforma elegante para la gestión y visualización de propiedades con filtrado inteligente y UX fluida.",
            imagen: "/projects/inmobiliaria.jpg",
            link: "#",
        },
        {
            titulo: "Amsterdam Bar",
            categoria: "Sitio Web",
            tecnologias: ["HTML5", "CSS3", "JavaScript"],
            descripcion: "Menú digital interactivo y presencia online sofisticada diseñada para elevar la experiencia gastronómica.",
            imagen: "/projects/amsterdam.png",
            link: "#",
        },
        {
            titulo: "Electro-Master",
            categoria: "E-commerce",
            tecnologias: ["HTML5", "CSS3", "JavaScript"],
            descripcion: "E-commerce de tecnología optimizado para conversiones con catálogo dinámico y diseño de alto impacto.",
            imagen: "/projects/electromaster.png",
            link: "#",
        },
        {
            titulo: "Foodluck Resto",
            categoria: "Sitio Web",
            tecnologias: ["HTML5", "CSS3", "JavaScript"],
            descripcion: "Landing page gastronómica premium enfocada en el impacto visual y la reserva directa de clientes.",
            imagen: "/projects/foodluck.png",
            link: "#",
        },
    ];

    const proyectosFiltrados =
        selectedCategory === "Todos"
            ? proyectos
            : proyectos.filter((p) => p.categoria === selectedCategory);

    return (
        <section
            id="proyectos"
            ref={ref}
            className="relative overflow-hidden flex justify-center w-full min-h-screen"
            style={{
                marginTop: '140px',
                scrollMarginTop: '100px'
            }}
        >
            {/* Patrón de fondo optimizado (contain: paint) */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ contain: 'paint' }}>
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(${theme.accent} 2px, transparent 2px),
                            linear-gradient(90deg, ${theme.accent} 2px, transparent 2px)
                        `,
                        backgroundSize: "80px 80px",
                        willChange: "transform",
                    }}
                    animate={{
                        backgroundPosition: ["0px 0px", "80px 80px"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            {/* Elementos de fondo */}
            <div className="w-full max-w-7xl px-6 md:px-8 relative z-10">

                {/* Encabezado */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    {/* Distintivo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-full cursor-default"
                        style={{
                            background: `linear-gradient(135deg, ${theme.bgCard}cc, ${theme.bgCardHover}cc)`,
                            border: `2px solid ${theme.accent}30`,
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <motion.span
                            className="w-3 h-3 rounded-full"
                            style={{ background: theme.accent, boxShadow: `0 0 20px ${theme.accentGlow}` }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [1, 0.7, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                            Portfolio
                        </span>
                    </motion.div>

                    {/* Título */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 px-4" style={{ margin: '1rem 0' }}>
                        <span style={{ color: theme.text }}>Proyectos </span>
                        <br className="md:hidden" />
                        <span
                            style={{
                                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Destacados
                        </span>
                    </h2>

                    {/* Subtítulo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center w-full px-6"
                    >
                        <p className="text-base md:text-xl lg:text-2xl max-w-3xl leading-relaxed text-center opacity-80" style={{ color: theme.textMuted, margin: '1rem 0' }}>
                            Experiencias digitales de vanguardia que transforman negocios.
                        </p>
                    </motion.div>

                    {/* Filtros */}
                    <div className="flex flex-wrap justify-center gap-4 mt-12" style={{ marginBottom: '80px' }}>
                        {categorias.map((categoria) => (
                            <button
                                key={categoria}
                                onClick={() => setSelectedCategory(categoria)}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    backgroundColor: selectedCategory === categoria ? 'rgba(0, 217, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                                    border: selectedCategory === categoria ? '1px solid #00d9ff' : '1px solid rgba(255, 255, 255, 0.1)',
                                    color: selectedCategory === categoria ? '#00d9ff' : '#94a3b8',
                                    boxShadow: selectedCategory === categoria ? '0 0 20px rgba(0, 217, 255, 0.3)' : 'none',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(10px)'
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedCategory !== categoria) {
                                        e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.5)';
                                        e.currentTarget.style.color = '#ffffff';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedCategory !== categoria) {
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.color = '#94a3b8';
                                    }
                                }}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Cuadrícula 3D de proyectos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center md:justify-items-stretch perspective-2000 pb-24 items-stretch">
                    <AnimatePresence mode="popLayout">
                        {proyectosFiltrados.map((proyecto, index) => (
                            <ProjectCard
                                key={proyecto.titulo}
                                project={proyecto}
                                index={index}
                                theme={theme}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
