interface Props {
    tournament: {
        name: string;
        description?: string | null;
        prize_pool?: string | null;
        start_date?: string | null;
        end_date?: string | null;
    };
    fixedFee: string;
}

export default function TournamentOverview({ tournament, fixedFee }: Props) {
    return (
        <div id="overview" className="relative overflow-x-clip">
            <div className="animate-in fill-mode-forwards slide-in-from-bottom-8 fade-in mb-20 flex flex-col items-center text-center duration-1000">
                <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-[10px] font-black tracking-[0.3em] text-brand-gold uppercase shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                    Tournament Central
                </span>
                <h1 className="drop-shadow-3xl mb-8 max-w-5xl text-5xl leading-[1] font-black tracking-tighter break-words text-white uppercase italic sm:text-7xl lg:text-9xl">
                    {tournament.name || 'Elite Basketball League 2026'}
                </h1>
                <p className="max-w-2xl text-xl leading-relaxed font-medium text-zinc-300 drop-shadow">
                    {tournament.description ||
                        'The premier basketball league where legends are born and careers are made.'}
                </p>
            </div>

            <div className="mb-20 flex justify-center">
                <div className="group animate-in fill-mode-forwards slide-in-from-bottom-8 fade-in relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-brand-gold/15 bg-[linear-gradient(140deg,rgba(15,23,42,0.92),rgba(30,41,59,0.82),rgba(234,179,8,0.08))] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-3xl duration-1000 sm:p-12">
                    <div className="pointer-events-none absolute -top-8 -right-8 h-48 w-48 bg-brand-gold/10 opacity-70 blur-[80px] transition-opacity group-hover:opacity-100" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.12),transparent_35%)]" />

                    <div className="relative z-10 text-center sm:text-left">
                        <span className="text-[10px] font-black tracking-[0.5em] text-brand-gold/80 uppercase">
                            Entry Protocol
                        </span>
                        <div className="mt-6 flex flex-col gap-4 border-b border-brand-gold/10 pb-12 sm:flex-row sm:items-baseline sm:justify-between">
                            <div>
                                <span className="text-5xl font-black tracking-tighter text-brand-gold drop-shadow-[0_0_15px_rgba(234,179,8,0.2)] sm:text-7xl">
                                    {fixedFee}
                                </span>
                                <span className="mt-2 block text-[11px] font-black tracking-widest text-zinc-500 uppercase">
                                    Participation fee per team
                                </span>
                            </div>

                            <div className="flex flex-col gap-2 sm:items-end">
                                <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                    Season 1 Pool
                                </span>
                                <div className="text-4xl font-black tracking-tighter text-white uppercase italic transition-colors group-hover:text-brand-gold">
                                    {tournament.prize_pool || 'PH-500K'}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 gap-12 text-left sm:grid-cols-2">
                            <div className="space-y-6">
                                <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                    Team Benefits
                                </span>
                                <ul className="grid grid-cols-1 gap-4">
                                    {[
                                        'Official League Jersey',
                                        'Minimum 5 Guaranteed Matches',
                                        'Division-Based Bracket Scheduling',
                                        'Professional Officiating',
                                    ].map((item, index) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-4 text-xs font-bold tracking-tighter text-white uppercase italic transition-colors hover:text-brand-gold"
                                        >
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/10 text-[8px] text-brand-gold">
                                                {index + 1}
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col justify-end gap-6 rounded-[1.5rem] border border-brand-gold/10 bg-white/[0.03] p-6">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                        Tournament Opens
                                    </span>
                                    <div className="inline-block border-b border-brand-gold/20 pb-1 text-2xl font-black tracking-tighter text-white uppercase italic">
                                        {formatDate(tournament.start_date)}
                                    </div>
                                </div>
                                <p className="text-[10px] font-medium tracking-widest text-zinc-400 uppercase">
                                    Tournament window:{' '}
                                    {formatDateRange(
                                        tournament.start_date,
                                        tournament.end_date,
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="animate-in fill-mode-forwards slide-in-from-bottom-8 fade-in flex flex-col items-center gap-12 duration-1000">
                <div className="w-full max-w-3xl rounded-[2rem] border border-brand-gold/20 bg-brand-gold/8 px-6 py-5 text-center shadow-[0_12px_40px_rgba(234,179,8,0.08)] backdrop-blur-sm sm:px-8 sm:text-left">
                    <span className="block text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">
                        Enlistment Deadline
                    </span>
                    <span className="mt-2 block text-2xl font-black tracking-tighter break-words text-brand-gold italic tabular-nums sm:text-3xl">
                        {formatDateRange(
                            tournament.start_date,
                            tournament.end_date,
                        )}
                    </span>
                    <span className="mt-2 block text-[9px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                        Active tournament dates are managed from the admin
                        settings panel.
                    </span>
                </div>
            </div>
        </div>
    );
}

function formatDate(value?: string | null): string {
    if (!value) {
        return 'TBD';
    }

    return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
    });
}

function formatDateRange(
    startDate?: string | null,
    endDate?: string | null,
): string {
    if (startDate && endDate) {
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }

    if (endDate) {
        return formatDate(endDate);
    }

    if (startDate) {
        return formatDate(startDate);
    }

    return 'Dates to be announced';
}
