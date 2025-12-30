"use client";

import { useEffect, useRef } from "react";

export default function BackgroundParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 60;
        const theme = {
            accent: "#00d9ff",
            glow: "rgba(0, 217, 255, 0.3)",
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            opacity: number;
            pulseSpeed: number;
            pulse: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2 + 1;
                this.speedY = -(Math.random() * 0.5 + 0.2);
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.pulse = 0;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.pulse += this.pulseSpeed;

                if (this.y < -20) {
                    this.y = canvas!.height + 20;
                    this.x = Math.random() * canvas!.width;
                }
                if (this.x < -20) this.x = canvas!.width + 20;
                if (this.x > canvas!.width + 20) this.x = -20;
            }

            draw() {
                if (!ctx) return;
                const currentOpacity = this.opacity * (0.7 + Math.sin(this.pulse) * 0.3);

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = theme.accent;
                ctx.globalAlpha = currentOpacity;
                ctx.fill();

                // Glow sutil (solo si el tamaño es suficiente para optimizar)
                if (this.size > 1.5) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = theme.accent;
                } else {
                    ctx.shadowBlur = 0;
                }
            }
        }

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{
                background: "transparent",
                opacity: 0.6,
                contain: "strict"
            }}
        />
    );
}
