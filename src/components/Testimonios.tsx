"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { getWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import TestimonialsMarquee from "./TestimonialsMarquee";

const theme = {
    accent: "#00d9ff",
    accentDark: "#0099cc",
    accentGlow: "rgba(0, 217, 255, 0.4)",
};

export default function Testimonios() {
    const { t, language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const ctaWhatsappUrl = getWhatsAppLink(whatsappMessages[language].general);

    return (
        <section
            id="testimonios"
            ref={ref}
            className="relative flex flex-col items-center scroll-mt-32"
            style={{ padding: "112px 0" }}
        >
            <div style={{ width: "100%", maxWidth: "1152px", marginLeft: "auto", marginRight: "auto", paddingLeft: "24px", paddingRight: "24px", boxSizing: "border-box", marginBottom: "48px" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center" }}
                >
                    <div
                        className="inline-flex items-center gap-3 px-5 py-2 mb-6 rounded-full cursor-default"
                        style={{ background: "rgba(10, 10, 10, 0.8)", border: `2px solid ${theme.accent}30`, backdropFilter: "blur(20px)" }}
                    >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: theme.accent, boxShadow: `0 0 16px ${theme.accentGlow}` }} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                            {t("testimonials.badge")}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black mb-5 px-4">
                        <span className="text-white">{t("testimonials.titleStart")} </span>
                        <span
                            style={{
                                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {t("testimonials.titleHighlight")}
                        </span>
                    </h2>

                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <p className="text-sm md:text-lg text-slate-400 leading-relaxed opacity-80" style={{ maxWidth: "576px", textAlign: "center" }}>
                            {t("testimonials.subtitle")}
                        </p>
                    </div>
                </motion.div>
            </div>

            <TestimonialsMarquee t={t} />

            <div style={{ width: "100%", maxWidth: "1152px", marginLeft: "auto", marginRight: "auto", paddingLeft: "24px", paddingRight: "24px", boxSizing: "border-box", marginTop: "48px" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl"
                    style={{ background: "rgba(0, 217, 255, 0.04)", border: `1px solid ${theme.accent}20`, padding: "24px" }}
                >
                    <p className="text-sm md:text-base font-semibold text-white text-center">
                        {t("testimonials.ctaTitle")}
                    </p>
                    <a
                        href={ctaWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("click_whatsapp", { source: "testimonials_cta", lang: language })}
                        className="inline-flex items-center gap-2 rounded-full font-bold text-xs uppercase tracking-wider shrink-0 transition-all duration-300 hover:scale-[1.03]"
                        style={{ padding: "12px 22px", color: "#000", background: theme.accent, boxShadow: `0 4px 18px ${theme.accentGlow}` }}
                    >
                        {t("testimonials.ctaButton")}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
