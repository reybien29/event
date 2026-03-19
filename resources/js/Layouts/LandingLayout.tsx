import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { BentoCard, BentoGrid } from '@/Components/ui/bento';

interface Props {
    children: ReactNode;
    brandColor?: string;
    logo?: string;
}

export default function LandingLayout({
    children,
    brandColor = '#bca673',
    logo,
}: Props) {
    return (
        <div
            className="relative isolate min-h-screen w-full overflow-x-clip bg-[radial-gradient(circle_at_top,rgba(188,166,115,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_26%),linear-gradient(180deg,#0a0a0a_0%,#0a0a0a_38%,#18181b_100%)] font-sans text-white antialiased selection:bg-brand-gold selection:text-black"
            style={{ ['--landing-brand' as string]: brandColor }}
        >
            <div className="pointer-events-none fixed inset-x-0 top-0 z-0 mx-auto h-[500px] w-[min(100%,92rem)] bg-gradient-to-b from-brand-gold/10 to-transparent opacity-60 blur-[120px]" />
            <div className="pointer-events-none absolute inset-x-0 top-40 z-0 mx-auto h-[42rem] w-[min(100%,72rem)] rounded-full bg-white/4 blur-[140px]" />

            <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-white/10 bg-[#09090b]/78 px-4 py-3 shadow-[0_18px_50px_rgba(2,6,23,0.45)] backdrop-blur-2xl sm:px-6">
                    <Link
                        href="/"
                        className="group flex min-w-0 items-center gap-3"
                    >
                        {logo ? (
                            <img
                                src={logo}
                                alt="Tournament Logo"
                                className="h-10 w-auto rounded object-contain transition-transform group-hover:scale-105"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/15 text-brand-gold shadow-lg shadow-brand-gold/15 transition-transform group-hover:scale-110">
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM10 9c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" />
                                </svg>
                            </div>
                        )}
                        <span className="truncate text-base font-black tracking-tighter uppercase drop-shadow-sm sm:text-xl">
                            ELITE{' '}
                            <span className="text-brand-gold">B-BALL</span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-8 md:flex">
                        <a
                            href="#overview"
                            className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase transition-colors hover:text-brand-gold"
                        >
                            Tournament Info
                        </a>
                        <a
                            href="#rules"
                            className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase transition-colors hover:text-brand-gold"
                        >
                            Rules
                        </a>
                        <a
                            href="#register"
                            className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase transition-colors hover:text-brand-gold"
                        >
                            Registration
                        </a>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 sm:gap-6">
                        <Link
                            href="/admin/dashboard"
                            className="hidden text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase transition-colors hover:text-brand-gold sm:block"
                        >
                            Admin
                        </Link>
                        <a
                            href="#register"
                            className="rounded-full border border-brand-gold/30 bg-brand-gold px-4 py-2.5 text-[10px] font-black tracking-[0.2em] text-black uppercase shadow-lg shadow-brand-gold/20 transition-all hover:scale-105 hover:bg-brand-gold-glow active:scale-95 sm:px-6"
                        >
                            Apply Now
                        </a>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 overflow-x-clip px-4 pt-28 pb-10 sm:px-6 sm:pt-32">
                {children}
            </main>

            <footer className="relative z-10 px-4 pb-8 sm:px-6">
                <div className="mx-auto max-w-7xl">
                    <BentoGrid className="items-stretch">
                        <BentoCard
                            className="md:col-span-6 lg:col-span-7"
                            padding="lg"
                            glow
                        >
                            <div className="space-y-5">
                                <span className="text-[10px] font-black tracking-[0.3em] text-brand-gold uppercase">
                                    Elite B-Ball
                                </span>
                                <div className="text-3xl font-black tracking-[-0.04em] uppercase">
                                    Premium tournament orchestration for a
                                    sharper game-day experience.
                                </div>
                                <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
                                    Registration, divisions, standings, and
                                    bracket scheduling stay aligned inside one
                                    polished system.
                                </p>
                            </div>
                        </BentoCard>

                        <BentoCard
                            className="md:col-span-3 lg:col-span-2"
                            padding="lg"
                            variant="subtle"
                        >
                            <div className="space-y-3">
                                <span className="text-[10px] font-black tracking-[0.24em] text-zinc-500 uppercase">
                                    Competition
                                </span>
                                <a
                                    href="#overview"
                                    className="block text-sm text-zinc-200 transition-colors hover:text-brand-gold"
                                >
                                    Tournament Info
                                </a>
                                <a
                                    href="#rules"
                                    className="block text-sm text-zinc-200 transition-colors hover:text-brand-gold"
                                >
                                    Rules
                                </a>
                                <a
                                    href="#register"
                                    className="block text-sm text-zinc-200 transition-colors hover:text-brand-gold"
                                >
                                    Registration
                                </a>
                            </div>
                        </BentoCard>

                        <BentoCard
                            className="md:col-span-3"
                            padding="lg"
                            variant="subtle"
                        >
                            <div className="space-y-3">
                                <span className="text-[10px] font-black tracking-[0.24em] text-zinc-500 uppercase">
                                    Platform
                                </span>
                                <Link
                                    href="/admin/dashboard"
                                    className="block text-sm text-zinc-200 transition-colors hover:text-brand-gold"
                                >
                                    Admin Console
                                </Link>
                                <p className="text-sm leading-relaxed text-zinc-400">
                                    Live tournament management with a calmer,
                                    clearer control surface.
                                </p>
                            </div>
                        </BentoCard>
                    </BentoGrid>

                    <div className="mt-6 text-center text-[10px] font-medium tracking-[0.2em] text-zinc-600 uppercase">
                        © 2026 Elite Management System • Pure Basketball Passion
                    </div>
                </div>
            </footer>
        </div>
    );
}
