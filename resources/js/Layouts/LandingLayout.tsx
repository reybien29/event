    import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    brandColor?: string;
    logo?: string;
}

export default function LandingLayout({ children, brandColor = '#EAB308', logo }: Props) {
    return (
        <div className="bg-brand-dark min-h-screen font-sans antialiased text-white selection:bg-brand-gold selection:text-black">
            {/* Minimal Background Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-brand-gold/10 to-transparent pointer-events-none opacity-40 blur-[120px] z-0" />

            <nav className="fixed top-0 left-0 right-0 z-50 border-white/5 bg-brand-dark/80 px-6 py-4 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        {logo ? (
                            <img src={logo} alt="Tournament Logo" className="h-10 w-auto rounded object-contain transition-transform group-hover:scale-105" />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-gold text-black shadow-lg shadow-brand-gold/20 transition-transform group-hover:scale-110">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM10 9c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" />
                                </svg>
                            </div>
                        )}
                        <span className="text-xl font-black tracking-tighter uppercase drop-shadow-sm">ELITE <span className="text-brand-gold">B-BALL</span></span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#live" className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase transition-colors hover:text-white">Live Stats</a>
                        <a href="#overview" className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase transition-colors hover:text-white">Tournament Info</a>
                        <a href="#rules" className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase transition-colors hover:text-white">Rules</a>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/admin/dashboard" className="hidden sm:block text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase transition-colors hover:text-brand-gold">
                            Admin
                        </Link>
                        <a href="#register" className="rounded bg-brand-gold px-6 py-2.5 text-[10px] font-black tracking-[0.2em] text-black uppercase shadow-lg shadow-brand-gold/20 transition-all hover:scale-105 hover:bg-brand-gold-glow active:scale-95">
                            Apply Now
                        </a>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-20">
                {children}
            </main>

            <footer className="relative z-10 border-t border-white/5 bg-brand-dark/50 py-12 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        <div className="max-w-xs text-center md:text-left">
                           <span className="text-xl font-black tracking-tighter uppercase mb-4 block">ELITE <span className="text-brand-gold">B-BALL</span></span>
                            <p className="text-sm leading-relaxed text-zinc-500">
                                The gold standard for modern tournament orchestration. High performance meet premium management.
                            </p>
                        </div>
                        <div className="flex gap-8">
                             {/* Placeholder Socials */}
                             <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">Competition</span>
                                <Link href="#" className="text-sm text-zinc-400 hover:text-brand-gold">Rules & Guidelines</Link>
                                <Link href="#" className="text-sm text-zinc-400 hover:text-brand-gold">Divisions</Link>
                             </div>
                             <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">Platform</span>
                                <Link href="#" className="text-sm text-zinc-400 hover:text-brand-gold">Registration</Link>
                                <Link href="#" className="text-sm text-zinc-400 hover:text-brand-gold">Support</Link>
                             </div>
                        </div>
                    </div>
                    <div className="mt-12 text-center text-[10px] font-medium tracking-[0.2em] text-zinc-700 uppercase">
                        © 2026 Elite Management System • Pure Basketball Passion
                    </div>
                </div>
            </footer>
        </div>
    );
}
