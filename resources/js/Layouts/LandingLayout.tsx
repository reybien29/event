import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    brandColor?: string;
    logo?: string;
}

export default function LandingLayout({
    children,
    brandColor = '#c1121f',
    logo,
}: Props) {
    return (
        <div
            className="w-full min-h-screen font-sans antialiased text-[#1a1a1a] bg-white selection:bg-[#c1121f] selection:text-white"
        >
            {/* ════════════════════════════════════════
                NAV
            ════════════════════════════════════════ */}
            <nav className="fixed top-0 right-0 left-0 z-50 h-[80px] bg-white flex items-center shadow-sm border-b border-gray-100">
                <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 lg:px-12">
                    {/* Logo */}
                    <Link href="/" className="group flex min-w-0 items-center">
                        <span className="truncate text-xl font-black tracking-wider uppercase italic text-[#c1121f]">
                            Magnum Sports Complex
                        </span>
                    </Link>

                    {/* Nav links — desktop */}
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
                                className={`relative text-[12px] font-bold tracking-widest uppercase transition-colors pt-[28px] pb-[28px] ${
                                    item.active ? 'text-[#c1121f]' : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                {item.label}
                                {item.active && (
                                    <span className="absolute bottom-[0px] left-0 w-full h-[3px] bg-[#c1121f]" />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Right actions */}
                    <div className="flex shrink-0 items-center gap-6">
                        <a
                            href="#register"
                            className="bg-[#c1121f] text-white px-8 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#a30b18] transition-colors"
                        >
                            Register Now
                        </a>
                        <Link
                            href="/admin/dashboard"
                            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-300 text-gray-700 hover:border-gray-500 hover:text-black transition-colors"
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

            {/* ════════════════════════════════════════
                FOOTER
            ════════════════════════════════════════ */}
            <footer className="relative z-10 mt-20 py-14 bg-white border-t border-gray-100">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                    <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
                        {/* Brand blurb */}
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

                    {/* Bottom bar */}
                    <div className="mt-12 pt-6 text-center text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 border-t border-gray-100">
                        © 2026 Magnum Sports Complex · All Rights Reserved
                    </div>
                </div>
            </footer>
        </div>
    );
}