"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import VideoTestimonialCoverflow from "./VideoTestimonialCoverflow";

const theme = {
    accent: "#00d9ff",
    accentDark: "#0099cc",
    accentGlow: "rgba(0, 217, 255, 0.4)",
};

export default function VideoTestimonials() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="testimonios-video" ref={ref} className="relative flex flex-col items-center" style={{ padding: "72px 0", scrollMarginTop: "100px" }}>
            <div style={{ width: "100%", maxWidth: "1152px", marginLeft: "auto", marginRight: "auto", paddingLeft: "24px", paddingRight: "24px", boxSizing: "border-box" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: "24px" }}
                >
                    <div
                        className="inline-flex items-center gap-3 px-5 py-2 mb-6 rounded-full cursor-default"
                        style={{ background: "rgba(10, 10, 10, 0.8)", border: `2px solid ${theme.accent}30`, backdropFilter: "blur(20px)" }}
                    >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: theme.accent, boxShadow: `0 0 16px ${theme.accentGlow}` }} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                            {t("testimonials.videoBadge")}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black mb-5 px-4">
                        <span className="text-white">{t("testimonials.videoTitleStart")} </span>
                        <span
                            style={{
                                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {t("testimonials.videoTitleHighlight")}
                        </span>
                    </h2>

                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <p className="text-sm md:text-lg text-slate-400 leading-relaxed opacity-80" style={{ maxWidth: "576px", textAlign: "center" }}>
                            {t("testimonials.videoSubtitle")}
                        </p>
                    </div>
                </motion.div>

                <VideoTestimonialCoverflow t={t} />

                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <div
                        className="inline-flex items-center gap-2 rounded-full"
                        style={{
                            padding: "8px 18px",
                            background: "rgba(255,255,255,0.04)",
                            border: `1px solid ${theme.accent}25`,
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ color: theme.accent, flexShrink: 0 }}>
                            <path d="M9 11.5V4.5a1.5 1.5 0 0 1 3 0v6M12 10.5V6a1.5 1.5 0 0 1 3 0v5M15 11v-1a1.5 1.5 0 0 1 3 0v4c0 3.5-2 6.5-6 6.5s-5.5-2-7-4.5l-1.3-2.2a1.4 1.4 0 0 1 2.3-1.6L7 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {t("testimonials.coverflowHint")}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
