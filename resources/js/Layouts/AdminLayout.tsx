import { Link } from '@inertiajs/react';
import { ReactNode, useState } from 'react';
import { cn } from '../lib/utils';
import * as routes from '@/routes';

interface Props {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title = 'Management Console' }: Props) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', href: '/admin/dashboard' },

        { label: 'Teams', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', href: '/admin/teams' },
        { label: 'Schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', href: '/admin/games' },
        { label: 'Divisions', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', href: '/admin/divisions' },
        { label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', href: '/admin/settings' },

    ];

    return (
        <div className="flex min-h-screen bg-[#020617] text-zinc-100 font-sans antialiased">
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 translate-x-0 border-r border-white/5 bg-[#020617] transition-all duration-300",
                !isSidebarOpen && "-translate-x-full"
            )}>
                <div className="flex h-20 items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-gold text-black shadow-lg shadow-brand-gold/20">
                            <span className="text-xs font-black">E</span>
                        </div>
                        <span className="text-sm font-black tracking-tighter uppercase">Elite <span className="text-brand-gold">Console</span></span>
                    </div>
                </div>

                <nav className="mt-8 space-y-1 px-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-bold tracking-widest uppercase transition-all",
                                item.label === 'Dashboard' ? "bg-white/5 text-brand-gold shadow-inner" : "text-zinc-500 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <svg className="h-5 w-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                            </svg>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 space-y-4">
                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="w-full group flex items-center justify-center gap-3 rounded-lg px-3 py-3 text-[10px] font-black tracking-widest uppercase border border-white/5 bg-white/5 text-red-500 hover:bg-red-500/10 transition-all active:scale-95"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout Console
                    </Link>

                    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-brand-gold/20" />
                            <div>
                                <div className="text-[10px] font-black uppercase text-white">Administrator</div>
                                <div className="text-[10px] font-medium text-zinc-500">Elite League</div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "flex-1 transition-all duration-300",
                isSidebarOpen ? "pl-64" : "pl-0"
            )}>
                <header className="flex h-20 items-center justify-between border-b border-white/5 px-8">
                    <h1 className="text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase">{title}</h1>
                    <div className="flex items-center gap-4">
                         <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-zinc-400 hover:text-white">
                             <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                             </svg>
                         </button>
                    </div>
                </header>

                <div className="p-8">
                     <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                     </div>
                </div>
            </main>
        </div>
    );
}
