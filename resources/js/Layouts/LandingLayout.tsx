import { Link } from '@inertiajs/react';
import { ReactNode, useEffect, useRef } from 'react';

interface Props {
    children: ReactNode;
    brandColor?: string;
    logo?: string;
}

/* Initialise scroll-reveal once per mount */
function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
        if (!els.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('is-visible');
                        observer.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}

/* Smooth scroll behavior */
function useSmoothScroll() {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) {
                    const element = document.querySelector(href);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);
}

/* Parallax scroll effect */
function useParallax() {
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax]');
            parallaxElements.forEach((el) => {
                const speed = parseFloat(el.dataset.parallax || '0.5');
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
}

export default function LandingLayout({ children, brandColor = '#c1121f', logo }: Props) {
    useScrollReveal();
    useSmoothScroll();
    useParallax();

    return (
        <div className="w-full min-h-screen font-sans antialiased text-[#1a1a1a] bg-white selection:bg-[#c1121f] selection:text-white">

            <style>{`
                /* ── Scroll reveal base ── */
                .scroll-reveal {
                    opacity: 0;
                    transform: translateY(28px);
                    transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                                transform 0.65s cubic-bezier(0.16,1,0.3,1);
                }
                .scroll-reveal.is-visible { opacity: 1; transform: translateY(0); }

                .scroll-reveal-left {
                    opacity: 0;
                    transform: translateX(-36px);
                    transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                                transform 0.65s cubic-bezier(0.16,1,0.3,1);
                }
                .scroll-reveal-left.is-visible { opacity: 1; transform: translateX(0); }

                .scroll-stagger > *:nth-child(1) { transition-delay: 0ms; }
                .scroll-stagger > *:nth-child(2) { transition-delay: 80ms; }
                .scroll-stagger > *:nth-child(3) { transition-delay: 160ms; }
                .scroll-stagger > *:nth-child(4) { transition-delay: 240ms; }

                /* Rules section animations */
                .rules-animate {
                    opacity: 0;
                    transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                                transform 0.7s cubic-bezier(0.16,1,0.3,1);
                }
                .rules-animate.is-visible {
                    opacity: 1;
                    transform: translateX(0) translateY(0) !important;
                }

                /* ── Nav animations ── */
                @keyframes navSlideDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes navShimmer {
                    0%   { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                .landing-nav {
                    animation: navSlideDown 0.55s cubic-bezier(0.16,1,0.3,1) both;
                }

                /* Nav link underline sweep */
                .nav-link {
                    position: relative;
                    transition: color 0.2s;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 3px;
                    background: #c1121f;
                    transition: width 0.28s cubic-bezier(0.16,1,0.3,1);
                }
                .nav-link:hover::after, .nav-link.active::after { width: 100%; }
                .nav-link:hover { color: #c1121f; }

                /* Register CTA shimmer */
                .nav-register {
                    position: relative;
                    overflow: hidden;
                    transition: background 0.2s, transform 0.15s;
                }
                .nav-register::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        105deg,
                        transparent 35%,
                        rgba(255,255,255,0.22) 50%,
                        transparent 65%
                    );
                    background-size: 200% 100%;
                    animation: navShimmer 2.6s linear infinite;
                }
                .nav-register:hover { background: #a30b18 !important; transform: scale(1.02); }
                .nav-register:active { transform: scale(0.98); }

                /* User icon button */
                .nav-user-btn {
                    transition: border-color 0.2s, transform 0.2s, color 0.2s;
                }
                .nav-user-btn:hover {
                    border-color: #c1121f !important;
                    color: #c1121f !important;
                    transform: scale(1.08);
                }

                /* Footer link hover */
                footer a {
                    transition: color 0.2s;
                }

                /* Global press */
                button:active:not(:disabled), a[class*="bg-[#c1121f]"]:active {
                    transform: scale(0.97);
                }

                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>

            {/* ── Nav ── */}
            <nav className="landing-nav fixed top-0 right-0 left-0 z-50 h-[80px] bg-white flex items-center shadow-sm border-b border-gray-100">
                <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 lg:px-12">

                    {/* Logo */}
                    <Link href="/" className="group flex min-w-0 items-center">
                        <span className="truncate text-xl font-black tracking-wider uppercase italic text-[#c1121f] transition-opacity group-hover:opacity-80">
                           Cebu Invititional Basketball
                        </span>
                    </Link>

                    {/* Nav links */}
                    <div className="hidden absolute left-1/2 -translate-x-1/2 md:flex items-center gap-10">
                        {[
                            { label: 'Tournament', href: '#overview', active: true },
                            { label: 'Prize Pool', href: '#prizes', active: false },
                            { label: 'Rules', href: '#rules', active: false },
                            { label: 'Arena', href: '#arena', active: false },
                        ].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={`nav-link text-[12px] font-bold tracking-widest uppercase pt-[28px] pb-[28px] ${
                                    item.active ? 'text-[#c1121f] active' : 'text-gray-500'
                                }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Right actions */}
                    <div className="flex shrink-0 items-center gap-6">
                        <a
                            href="#register"
                            className="nav-register bg-[#c1121f] text-white px-8 py-3 text-[12px] font-bold tracking-widest uppercase"
                        >
                            Register Now
                        </a>
                        <Link
                            href="/admin/dashboard"
                            className="nav-user-btn flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-300 text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ── Page content ── */}
            <main className="relative z-10 w-full pt-[80px]">
                {children}
            </main>

            {/* ── Footer ── */}
            <footer className="relative z-10 mt-20 py-14 bg-white border-t border-gray-100 scroll-reveal">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                    <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
                        <div className="max-w-xs">
                            <span className="mb-3 block text-lg font-black tracking-tight uppercase text-gray-900 italic">
                                Magnum <span className="text-[#c1121f]">Sports</span>
                            </span>
                            <p className="text-sm leading-relaxed text-gray-500">
                                Premium tournament orchestration with dynamic match ups,
                                clean registration, and admin-controlled bracket scheduling.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 pt-6 text-center text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 border-t border-gray-100">
                        © 2026 Magnum Sports Complex · All Rights Reserved
                    </div>
                </div>
            </footer>
        </div>
    );
}
