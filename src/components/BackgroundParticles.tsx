"use client";

import { useEffect, useRef } from "react";

export default function BackgroundParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 120; // Balance entre densidad y TBT
        const theme = {
            accent: "#00d9ff", // Color original del sistema
            glow: "rgba(0, 217, 255, 0.5)",
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            opacity: number;
            pulse: number;
            pulseSpeed: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 3 + 1.5; // Copos más grandes para visibilidad
                this.speedY = Math.random() * 0.8 + 0.2; // Caída hacia ABAJO
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.6 + 0.4;
                this.pulse = Math.random() * Math.PI;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.pulse += this.pulseSpeed;

                if (this.y > canvas!.height + 20) {
                    this.y = -20;
                    this.x = Math.random() * canvas!.width;
                }
                if (this.x < -20) this.x = canvas!.width + 20;
                if (this.x > canvas!.width + 20) this.x = -20;
            }

            draw() {
                if (!ctx) return;
                const currentOpacity = this.opacity * (0.8 + Math.sin(this.pulse) * 0.2);

                ctx.save();
                
                // Simula un brillo suave con un círculo mayor de baja opacidad (mucho más rápido que shadowBlur)
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = theme.accent;
                ctx.globalAlpha = currentOpacity * 0.15;
                ctx.fill();

                // Dibuja el núcleo de la partícula
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = theme.accent;
                ctx.globalAlpha = currentOpacity;
                ctx.fill();
                
                ctx.restore();
            }
        }

        // OJO mobile: NO se usa window.innerHeight ni 100vh. En el celular la
        // barra de direcciones aparece/desaparece con el scroll y cambia
        // innerHeight todo el tiempo; si el canvas se redimensiona y encima
        // se re-inicializan las 120 partículas en cada uno de esos eventos,
        // se suma jitter y reflows justo cuando el scroll ya está inestable.
        // Se fija a un alto estable y solo se reajusta el ANCHO en un resize
        // real (rotar el teléfono, cambiar de ventana), con debounce y sin
        // recrear las partículas.
        let resizeTimer: number | undefined;

        const applySize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = Math.max(window.innerHeight, document.documentElement.clientHeight || 0, 700);
        };

        const onResize = () => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => {
                const prevW = canvas.width;
                applySize();
                // reposiciona las partículas que quedaron fuera, sin recrearlas
                if (canvas.width !== prevW) {
                    particles.forEach((p) => {
                        if (p.x > canvas.width) p.x = Math.random() * canvas.width;
                    });
                }
            }, 200);
        };

        const init = () => {
            applySize();
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", onResize);
        init();
        animate();

        return () => {
            window.removeEventListener("resize", onResize);
            window.clearTimeout(resizeTimer);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{
                // 100% (no 100vh): el contenedor fixed ya cubre el viewport y
                // así no salta cuando la barra del navegador mobile aparece.
                width: "100%",
                height: "100%",
                background: "transparent",
                opacity: 0.8
            }}
        />
    );
}
