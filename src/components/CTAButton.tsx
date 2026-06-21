"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface CTAButtonProps {
    href?: string;
    whatsappMessage?: string;
    children: ReactNode;
    accent: string;
    padding?: string;
    fontSize?: string;
    fontWeight?: number;
    withShadow?: boolean;
    eventName?: string;
}

export default function CTAButton({ 
    href, 
    whatsappMessage,
    children, 
    accent, 
    padding = "16px 32px", 
    fontSize = "1.125rem", 
    fontWeight = 700, 
    withShadow = false,
    eventName = 'click_cta' 
}: CTAButtonProps) {
    const finalHref = whatsappMessage ? getWhatsAppLink(whatsappMessage) : (href || "#");
    const isExternal = !!whatsappMessage;

    const commonStyle = {
        display: "inline-block", 
        padding, 
        marginTop: "32px", 
        borderRadius: "9999px", 
        backgroundColor: accent, 
        color: "#000", 
        fontWeight, 
        fontSize, 
        textDecoration: "none", 
        transition: "all 0.3s ease",
        cursor: "pointer"
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.transform = "scale(1.05)";
        if (withShadow) e.currentTarget.style.boxShadow = `0 0 20px ${accent}66`;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.transform = "scale(1)";
        if (withShadow) e.currentTarget.style.boxShadow = "none";
    };

    const handleClick = () => {
        trackEvent(eventName, { href: finalHref, isWhatsApp: isExternal });
    };

    if (isExternal) {
        return (
            <a 
                href={finalHref}
                target="_blank"
                rel="noopener noreferrer"
                style={commonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {children}
            </a>
        );
    }

    return (
        <Link 
            href={finalHref}
            style={commonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {children}
        </Link>
    );
}
