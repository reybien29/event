import React, { useEffect, useRef } from 'react';

interface Props {
    tournament: {
        name: string;
        description?: string | null;
        prize_pool?: string | null;
        start_date?: string | null;
        end_date?: string | null;
    };
}

export default function TournamentOverview({ tournament }: Props) {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    /* ── Animated number counter for prize pool ── */
    useEffect(() => {
        const nodes = document.querySelectorAll('[data-count-up]');
        nodes.forEach((el) => {
            const target = parseInt(el.getAttribute('data-count-up') || '0', 10);
            let start = 0;
            const duration = 1400;
            const startTime = performance.now();

            const tick = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
                start = Math.floor(ease * target);
                el.textContent = start.toLocaleString();
                if (progress < 1) requestAnimationFrame(tick);
            };

            setTimeout(() => requestAnimationFrame(tick), 900);
        });
    }, []);

    return (
        <section
            id="overview"
            className="relative w-full h-[650px] lg:h-[700px] bg-[#111] overflow-hidden flex items-center"
        >
            <style>{`
                @keyframes heroBgPan {
                    from { background-position: 50% 42%; }
                    to   { background-position: 50% 58%; }
                }
                @keyframes heroFadeIn {
                    from { opacity: 0; transform: translateY(48px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes heroSlideLeft {
                    from { opacity: 0; transform: translateX(-56px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes badgeIn {
                    0%   { opacity: 0; transform: scale(0.7) translateX(-12px); }
                    70%  { transform: scale(1.04) translateX(0); }
                    100% { opacity: 1; transform: scale(1) translateX(0); }
                }
                @keyframes lineReveal {
                    from { transform: scaleX(0); }
                    to   { transform: scaleX(1); }
                }
                @keyframes boxFloat {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-5px); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes scanLine {
                    0%   { top: -4px; }
                    100% { top: 100%; }
                }
                @keyframes redOverlayPulse {
                    0%, 100% { opacity: 0.85; }
                    50%       { opacity: 0.92; }
                }

                .hero-badge {
                    animation: badgeIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
                }
                .hero-line-1 {
                    animation: heroSlideLeft 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
                }
                .hero-line-2 {
                    animation: heroSlideLeft 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.42s both;
                }
                .hero-line-3 {
                    animation: heroSlideLeft 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.56s both;
                }
                .hero-subtitle {
                    animation: heroFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.68s both;
                }
                .hero-box-1 {
                    animation: heroFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.82s both,
                               boxFloat 4.8s ease-in-out 1.5s infinite;
                }
                .hero-box-2 {
                    animation: heroFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.95s both,
                               boxFloat 5.2s ease-in-out 1.8s infinite;
                }
                .hero-bg-img {
                    animation: heroBgPan 16s ease-in-out alternate infinite;
                }
                .red-overlay {
                    animation: redOverlayPulse 6s ease-in-out infinite;
                }
                .scan-line {
                    position: absolute;
                    left: 0; right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(193,18,31,0.25), transparent);
                    animation: scanLine 8s linear infinite;
                    pointer-events: none;
                    z-index: 4;
                }
                .hero-box-1:hover, .hero-box-2:hover {
                    transform: translateY(-8px) scale(1.02) !important;
                    box-shadow: 0 20px 48px rgba(0,0,0,0.35) !important;
                    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s !important;
                }
                .hero-cta-shimmer {
                    position: relative;
                    overflow: hidden;
                }
                .hero-cta-shimmer::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%);
                    background-size: 200% 100%;
                    animation: shimmer 2.8s linear infinite;
                }
            `}</style>

            {/* Scan line */}
            <div className="scan-line" />

            {/* Background image with parallax pan */}
            <div
                className="hero-bg-img absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity grayscale"
                style={{ backgroundImage: "url('/images/hero.png')" }}
            />

            {/* Red angled overlay */}
            <div
                className="red-overlay absolute top-0 right-0 bottom-0 w-[60%] lg:w-[45%] opacity-[0.85] hidden md:block"
                style={{ zIndex: 1 }}
            >
                <div
                    className="absolute inset-0 bg-gradient-to-l from-[#a30b18] to-[#600000]"
                    style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-center">

                {/* Badge */}
                <div
                    className="hero-badge bg-[#c1121f] text-white text-[10px] md:text-[11px] font-black px-5 py-2 uppercase tracking-widest inline-flex w-max mb-6 lg:mb-8"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 93% 100%, 0 100%)' }}
                >
                    Summer 2026 Edition
                </div>

                {/* Heading — 3 staggered lines */}
                <h1
                    ref={headingRef}
                    className="flex flex-col uppercase font-black tracking-tight leading-[0.95] mb-6 md:mb-8"
                >
                    <span className="hero-line-1 text-white text-[3.5rem] md:text-[5rem] lg:text-[7.5rem]">
                        CEBU
                    </span>
                    <span
                        className="hero-line-2 text-[#c1121f] text-[3.5rem] md:text-[5rem] lg:text-[7.5rem] italic -mt-2 sm:-mt-4 relative"
                        style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}
                    >
                        INVITATIONAL
                    </span>
                    <span className="hero-line-3 text-white text-[3.5rem] md:text-[5rem] lg:text-[7.5rem] -mt-2 sm:-mt-4">
                        BASKETBALL
                    </span>
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="hero-subtitle text-gray-300 max-w-[550px] text-sm md:text-base lg:text-lg font-medium leading-relaxed mb-8 md:mb-12 border-l-[3px] border-gray-600 pl-4 lg:pl-5 py-1"
                >
                    The ultimate showcase of hoop talent in the South. 32 Elite Teams. 1 Championship Title. Magnum Sports Complex Main Arena.
                </p>

                {/* Info Boxes */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div
                        className="hero-box-1 hero-cta-shimmer bg-white px-6 md:px-8 py-4 md:py-5 min-w-[240px] shadow-lg cursor-default"
                        style={{ transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s' }}
                    >
                        <div className="text-[#c1121f] text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-1.5">
                            Tournament Dates
                        </div>
                        <div className="text-black text-xl md:text-2xl font-black uppercase">
                            July 15 - 28
                        </div>
                    </div>

                    <div
                        className="hero-box-2 bg-[#222] px-6 md:px-8 py-4 md:py-5 min-w-[240px] shadow-lg cursor-default"
                        style={{ transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s' }}
                    >
                        <div className="text-[#c1121f] text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-1.5">
                            Venue Location
                        </div>
                        <div className="text-white text-xl md:text-2xl font-black uppercase">
                            Magnum Complex
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}