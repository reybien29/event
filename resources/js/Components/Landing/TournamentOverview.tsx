interface Props {
    tournament: {
        name: string;
        description?: string | null;
        prize_pool?: string | null;
        start_date?: string | null;
        end_date?: string | null;
    };
}

const cn = (...classes: (string | boolean | undefined | null)[]) =>
    classes.filter(Boolean).join(' ');

export default function TournamentOverview({ tournament }: Props) {
    const podiumTiers = [
        {
            rank: '2nd',
            label: 'Runner Up',
            amount: '₱120,000',
            icon: '🥈',
            order: 'order-1',
            featured: false,
        },
        {
            rank: '1st',
            label: 'Champion',
            amount: '₱250,000',
            icon: '🏆',
            order: 'order-2',
            featured: true,
        },
        {
            rank: '3rd',
            label: '3rd Place',
            amount: '₱80,000',
            icon: '🥉',
            order: 'order-3',
            featured: false,
        },
    ];

    const benefits = [
        { icon: '👕', label: 'OFFICIAL LEAGUE JERSEY' },
        { icon: '🏀', label: 'MIN. 5 GUARANTEED GAMES' },
        { icon: '📋', label: 'DIVISION BRACKET SCHEDULING' },
        { icon: '⚖️', label: 'PROFESSIONAL OFFICIATING' },
    ];

    return (
        <div id="overview" className="relative">

            {/* ── Keyframe injection ── */}
            <style>{`
                @keyframes shimmer {
                    0%   { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                @keyframes floatUp {
                    0%   { opacity: 0; transform: translateY(32px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .shimmer-text {
                    background: linear-gradient(
                        90deg,
                        #EAB308 0%,
                        #FDE047 35%,
                        #EAB308 50%,
                        #CA8A04 65%,
                        #EAB308 100%
                    );
                    background-size: 250% 100%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 3.5s infinite linear;
                }
                .float-in { animation: floatUp 0.9s ease both; }
                .float-in-2 { animation: floatUp 0.9s 0.15s ease both; }
                .float-in-3 { animation: floatUp 0.9s 0.3s ease both; }
                .podium-card-hover { transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); }
                .podium-card-hover:hover { 
                    transform: translateY(-8px);
                    border-color: rgba(234, 179, 8, 0.4);
                    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
                }
            `}</style>

            {/* ══════════════════════════════════════════
                PRIZE POOL HERO
            ══════════════════════════════════════════ */}
            <div className="float-in-2 relative mb-20 text-center">
                <span className="mb-4 inline-block text-[11px] font-black tracking-[0.6em] text-brand-gold uppercase">
                    Season 1 — Total Prize Pool
                </span>

                {/* Giant shimmer amount */}
                <div className="relative mb-6 block">
                    <span
                        className="shimmer-text block text-[clamp(3rem,10vw,6rem)] font-black leading-none tracking-[-0.04em] uppercase"
                    >
                        {tournament.prize_pool || '₱500,000'}
                    </span>
                    {/* Subtle glow behind the text */}
                    <div className="pointer-events-none absolute inset-0 -z-10 mx-auto w-1/2 blur-[100px] bg-brand-gold/15 rounded-full" />
                </div>

                <p className="text-[11px] font-bold tracking-[0.4em] text-zinc-500 uppercase">
                    Up for grabs this season
                </p>
            </div>

            {/* ══════════════════════════════════════════
                PODIUM TIERS
            ══════════════════════════════════════════ */}
            <div className="float-in-3 mb-16 flex flex-col items-center justify-center gap-6 px-4 md:flex-row md:items-stretch lg:gap-10">
                {podiumTiers.map((tier) => (
                    <div
                        key={tier.rank}
                        className={cn(
                            'podium-card-hover group relative flex w-full max-w-[320px] flex-col items-center overflow-hidden rounded-[2.5rem] border py-10 transition-all duration-500',
                            tier.featured
                                ? 'z-10 bg-zinc-900/40 border-brand-gold/40 scale-105 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] px-10'
                                : 'bg-zinc-900/20 border-white/5 px-8 opacity-90 backdrop-blur-sm',
                            tier.order,
                        )}
                    >
                        {/* Top icon */}
                        <div className={cn(
                            'mb-8 text-5xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-110',
                            tier.featured ? 'text-6xl' : 'text-5xl'
                        )}>
                            {tier.icon}
                        </div>

                        {/* Rank badge */}
                        <div
                            className={cn(
                                'mb-8 flex items-center justify-center rounded-full font-black uppercase tracking-widest',
                                tier.featured
                                    ? 'h-14 w-14 bg-brand-gold text-black text-sm shadow-xl shadow-brand-gold/30'
                                    : 'h-11 w-11 border border-white/10 bg-zinc-800 text-[11px] text-zinc-400',
                            )}
                        >
                            {tier.rank}
                        </div>

                        {/* Prize amount */}
                        <div
                            className={cn(
                                'font-black tracking-tighter leading-none mb-3',
                                tier.featured
                                    ? 'text-5xl text-brand-gold'
                                    : 'text-4xl text-white',
                            )}
                        >
                            {tier.amount}
                        </div>

                        {/* Tier label */}
                        <div className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500">
                            {tier.label}
                        </div>

                        {/* Centered glow for featured */}
                        {tier.featured && (
                            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.1),transparent_70%)]" />
                        )}
                    </div>
                ))}
            </div>

            {/* ══════════════════════════════════════════
                TEAM BENEFITS
            ══════════════════════════════════════════ */}
            <div className="float-in-3 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 mb-20">
                {benefits.map((benefit) => (
                    <div
                        key={benefit.label}
                        className="flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-900/30 p-6 backdrop-blur-md transition-colors hover:border-brand-gold/20 group"
                    >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-800/80 text-xl shadow-inner group-hover:scale-110 transition-transform">
                            {benefit.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-200 leading-tight">
                            {benefit.label}
                        </span>
                    </div>
                ))}
            </div>



            {/* ── Enlistment deadline strip ── */}
            <div className="flex flex-col items-center gap-12">
                <div className="w-full max-w-3xl rounded-[2rem] border border-brand-gold/20 bg-brand-gold/8 px-6 py-5 text-center shadow-[0_12px_40px_rgba(234,179,8,0.08)] backdrop-blur-sm sm:px-8 sm:text-left">
                    <span className="block text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">
                        Enlistment Deadline
                    </span>
                    <span className="mt-2 block text-2xl font-black tracking-tighter break-words text-brand-gold italic tabular-nums sm:text-3xl">
                        {formatDateRange(tournament.start_date, tournament.end_date)}
                    </span>
                    <span className="mt-2 block text-[9px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                        Active tournament dates are managed from the admin settings panel.
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ── Helpers ── */

function formatDate(value?: string | null): string {
    if (!value) return 'TBD';
    return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
    });
}

function formatDateRange(startDate?: string | null, endDate?: string | null): string {
    if (startDate && endDate) return `${formatDate(startDate)} – ${formatDate(endDate)}`;
    if (endDate) return formatDate(endDate);
    if (startDate) return formatDate(startDate);
    return 'Dates to be announced';
}
