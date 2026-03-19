import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    brandColor?: string;
    logo?: string;
}

export default function LandingLayout({
    children,
    brandColor = '#EAB308',
    logo,
}: Props) {
    return (
        <div
            className="relative isolate w-full overflow-x-clip bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.15),transparent_32%),linear-gradient(180deg,#0b1220_0%,#0f172a_48%,#111827_100%)] font-sans text-white antialiased selection:bg-brand-gold selection:text-black"
            style={{ ['--landing-brand' as string]: brandColor }}
        >
            <div className="pointer-events-none fixed inset-x-0 top-0 z-0 mx-auto h-[500px] w-[min(100%,90rem)] bg-gradient-to-b from-brand-gold/10 to-transparent opacity-50 blur-[120px]" />

            <nav className="fixed top-0 right-0 left-0 z-50 border-b border-brand-gold/10 bg-[#0b1220]/75 px-6 py-4 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4">
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

            <main className="relative z-10 overflow-x-clip pt-20">
                {children}
            </main>

            <footer className="relative z-10 border-t border-brand-gold/10 bg-[#0b1220]/55 py-12 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        <div className="max-w-xs text-center md:text-left">
                            <span className="mb-4 block text-xl font-black tracking-tighter uppercase">
                                ELITE{' '}
                                <span className="text-brand-gold">B-BALL</span>
                            </span>
                            <p className="text-sm leading-relaxed text-zinc-400">
                                Premium tournament orchestration with dynamic
                                divisions, clean registration, and
                                admin-controlled bracket scheduling.
                            </p>
                        </div>
                        <div className="flex w-full flex-col items-center gap-8 text-center sm:w-auto sm:flex-row sm:items-start sm:text-left">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                                    Competition
                                </span>
                                <a
                                    href="#overview"
                                    className="text-sm text-zinc-300 transition-colors hover:text-brand-gold"
                                >
                                    Tournament Info
                                </a>
                                <a
                                    href="#rules"
                                    className="text-sm text-zinc-300 transition-colors hover:text-brand-gold"
                                >
                                    Rules
                                </a>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                                    Platform
                                </span>
                                <a
                                    href="#register"
                                    className="text-sm text-zinc-300 transition-colors hover:text-brand-gold"
                                >
                                    Registration
                                </a>
                                <Link
                                    href="/admin/dashboard"
                                    className="text-sm text-zinc-300 transition-colors hover:text-brand-gold"
                                >
                                    Admin Console
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 text-center text-[10px] font-medium tracking-[0.2em] text-zinc-600 uppercase">
                        © 2026 Elite Management System • Pure Basketball Passion
                    </div>
                </div>
            </footer>
        </div>
    );
}
