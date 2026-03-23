import React, { useEffect, useRef } from 'react';

export default function PrizePool() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cards = section.querySelectorAll<HTMLElement>('.prize-card');
        const heading = section.querySelector<HTMLElement>('.prize-heading');
        const line = section.querySelector<HTMLElement>('.prize-line');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    if (line) {
                        line.style.animation = 'prizeLineIn 0.5s cubic-bezier(0.16,1,0.3,1) both';
                    }
                    if (heading) {
                        heading.style.animation = 'prizeHeadIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both';
                    }

                    cards.forEach((card, i) => {
                        card.style.animation = `prizeCardIn 0.65s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.12}s both`;
                    });

                    observer.disconnect();
                });
            },
            { threshold: 0.15 },
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="prizes" className="w-full bg-[#f8f9fa] py-20 lg:py-24">
            <style>{`
                @keyframes prizeLineIn {
                    from { transform: scaleX(0); transform-origin: left; }
                    to   { transform: scaleX(1); transform-origin: left; }
                }
                @keyframes prizeHeadIn {
                    from { opacity: 0; transform: translateX(-32px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes prizeCardIn {
                    from { opacity: 0; transform: translateY(40px) scale(0.95); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes prizeFloat {
                    0%, 100% { transform: translateY(0); }
                    50%       { transform: translateY(-6px); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes prizeAmountReveal {
                    from { opacity: 0; transform: translateY(16px) scale(0.9); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }

                .prize-card {
                    opacity: 0;
                    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s, filter 0.25s;
                }
                .prize-card:hover {
                    transform: translateY(-10px) scale(1.015) !important;
                    box-shadow: 0 28px 70px rgba(0,0,0,0.28);
                    filter: brightness(1.07);
                    z-index: 2;
                }

                /* Champion card special hover */
                .prize-card:first-child:hover {
                    box-shadow: 0 28px 70px rgba(193,18,31,0.35);
                }

                /* Trophy float */
                .prize-card:first-child .opacity-20 {
                    animation: prizeFloat 4.5s ease-in-out 1s infinite;
                }

                /* Amount reveal delay */
                .prize-card:nth-child(1) .text-5xl { animation: prizeAmountReveal 0.6s ease 0.5s both; }
                .prize-card:nth-child(2) .text-4xl { animation: prizeAmountReveal 0.6s ease 0.62s both; }
                .prize-card:nth-child(3) .text-3xl { animation: prizeAmountReveal 0.6s ease 0.74s both; }
                .prize-card:nth-child(4) .text-3xl { animation: prizeAmountReveal 0.6s ease 0.86s both; }

                /* Champion card shimmer on load */
                .prize-card:first-child::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        105deg,
                        transparent 35%,
                        rgba(255,255,255,0.08) 50%,
                        transparent 65%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 3.5s linear 1.2s infinite;
                    pointer-events: none;
                }

                .prize-heading { opacity: 0; }
                .prize-line { transform: scaleX(0); transform-origin: left; }
            `}</style>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="prize-line h-[3px] w-12 sm:w-16 bg-[#c1121f]" />
                    <h2 className="prize-heading text-3xl md:text-5xl font-black italic tracking-wide uppercase text-[#1a1a1a]">
                        The Prize Pool
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full shadow-2xl">

                    {/* Champion */}
                    <div className="prize-card bg-[#cc0000] p-8 lg:p-10 relative overflow-hidden flex flex-col justify-end text-white min-h-[320px]">
                        <div className="absolute top-10 lg:top-12 left-1/2 -translate-x-1/2 opacity-20">
                            <svg className="w-24 h-24 lg:w-32 lg:h-32" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.831 6.304c-1.121-1.041-3.136-1.503-4.831-1.554V3h-4v1.75C8.305 4.8 6.29 5.263 5.169 6.304 4.016 7.375 3.328 9.07 3.328 11.026c0 1.968.694 3.666 1.854 4.743.832.77 1.944 1.258 3.167 1.488L10 18.06V20H7v2h10v-2h-3v-1.94l1.651-1.125h.001c1.222-.231 2.335-.718 3.167-1.488 1.159-1.077 1.853-2.775 1.853-4.743 0-1.956-.688-3.651-1.841-4.721zm-13.43 4.22c0-1.233.39-2.277 1.059-2.898.663-.615 1.637-.992 2.54-.992v6.456c-.903 0-1.877-.378-2.54-.993-.669-.621-1.059-1.666-1.059-2.573zm13.197 2.574c-.663.615-1.637.993-2.54.993V6.634c.903 0 1.877.377 2.54.992.67.621 1.059 1.665 1.059 2.573 0 .907-.39 1.952-1.059 2.574z" />
                            </svg>
                        </div>
                        <div className="relative z-10 pt-28">
                            <div className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-1">Champion</div>
                            <div className="text-5xl lg:text-6xl font-black uppercase mb-5 tracking-tighter">₱100k</div>
                            <div className="w-full h-[1px] bg-white/20 mb-5" />
                            <div className="text-[13px] md:text-sm font-bold leading-snug">
                                Trophy + Custom Championship Jerseys + VIP Complex Access
                            </div>
                        </div>
                    </div>

                    {/* 1st Runner Up */}
                    <div className="prize-card bg-[#1a1a1a] p-8 lg:p-10 flex flex-col justify-end min-h-[320px]">
                        <div className="pt-24 mt-auto">
                            <div className="text-[#c1121f] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-1">1st Runner Up</div>
                            <div className="text-4xl lg:text-[2.75rem] font-black uppercase mb-5 tracking-tighter text-white">₱50,000</div>
                            <div className="w-full h-[1px] bg-white/10 mb-5" />
                            <div className="text-[13px] md:text-sm font-semibold text-gray-300 leading-snug">
                                Medals + Team Training Vouchers
                            </div>
                        </div>
                    </div>

                    {/* 2nd Runner Up */}
                    <div className="prize-card bg-[#262626] p-8 lg:p-10 flex flex-col justify-end min-h-[320px]">
                        <div className="pt-24 mt-auto">
                            <div className="text-[#c1121f] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-1">2nd Runner Up</div>
                            <div className="text-3xl lg:text-4xl font-black uppercase mb-5 tracking-tighter text-white">₱25,000</div>
                            <div className="w-full h-[1px] bg-white/10 mb-5" />
                            <div className="text-[13px] md:text-sm font-semibold text-gray-300 leading-snug">
                                Medals + Sports Merchandise Package
                            </div>
                        </div>
                    </div>

                    {/* 3rd Runner Up */}
                    <div className="prize-card bg-[#333333] p-8 lg:p-10 flex flex-col justify-end min-h-[320px]">
                        <div className="pt-24 mt-auto">
                            <div className="text-[#c1121f] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-1">3rd Runner Up</div>
                            <div className="text-3xl lg:text-4xl font-black uppercase mb-5 tracking-tighter text-white">₱10,000</div>
                            <div className="w-full h-[1px] bg-white/10 mb-5" />
                            <div className="text-[13px] md:text-sm font-semibold text-gray-300 leading-snug">
                                Team Practice Set Vouchers
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}