import { cn } from "../../lib/utils";

interface Props {
    tournament: {
        name: string;
        description?: string;
        prize_pool?: string;
        start_date?: string;
    };
    fixedFee: string;
}

export default function TournamentOverview({ tournament, fixedFee }: Props) {
    return (
        <div id="overview" className="relative">
            {/* Header: Title & Description */}
            <div className="mb-20 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-[10px] font-black tracking-[0.3em] text-brand-gold uppercase shadow-[0_0_20px_rgba(234,179,8,0.1)] mb-8">
                    Tournament Central
                </span>
                <h1 className="mb-8 max-w-5xl text-6xl font-black italic leading-[1] tracking-tighter uppercase sm:text-8xl lg:text-9xl drop-shadow-3xl text-white">
                    {tournament.name || "Elite Basketball 2026"}
                </h1>
                <p className="max-w-2xl text-xl font-medium leading-relaxed text-zinc-400 drop-shadow">
                    {tournament.description || "The premier basketball league where legends are born and careers are made."}
                </p>
            </div>

            {/* Pricing Card */}
            <div className="flex justify-center mb-20">
                <div className="group relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-8 sm:p-12 backdrop-blur-3xl shadow-3xl animate-in fade-in slide-in-from-bottom-8 delay-300 duration-1000 fill-mode-forwards">
                    <div className="absolute -right-8 -top-8 h-48 w-48 bg-brand-gold/10 blur-[80px] pointer-events-none transition-opacity group-hover:opacity-100 opacity-60" />
                    
                    <div className="relative z-10 text-center sm:text-left">
                        <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">Entry Protocol</span>
                        <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 border-b border-white/5 pb-12">
                            <div>
                                <span className="text-5xl font-black tracking-tighter text-brand-gold drop-shadow-[0_0_15px_rgba(234,179,8,0.2)] sm:text-7xl">{fixedFee}</span>
                                <span className="block mt-2 text-[11px] font-black tracking-widest text-zinc-600 uppercase">Participation fee per team</span>
                            </div>

                            <div className="flex flex-col sm:items-end gap-2">
                                <span className="text-[10px] font-black tracking-widest text-zinc-700 uppercase">Season 1 Pool</span>
                                <div className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-brand-gold transition-colors">{tournament.prize_pool || "PH-500K"}</div>
                            </div>
                        </div>
                        
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-12 text-left">
                            <div className="space-y-6">
                                <span className="text-[10px] font-black tracking-widest text-zinc-700 uppercase">Team Benefits</span>
                                <ul className="grid grid-cols-1 gap-4">
                                    {['Official League Jersey', 'Minimum 5 Guaranteed Matches', 'Live Stats & Media Coverage', 'Professional Officiating'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-xs font-bold text-white uppercase italic tracking-tighter transition-colors hover:text-brand-gold">
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-[8px] text-brand-gold border border-brand-gold/20">
                                                {i + 1}
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="flex flex-col justify-end gap-6 border-l border-white/5 pl-12">
                                <div className="space-y-2">
                                     <span className="text-[10px] font-black tracking-widest text-zinc-700 uppercase">Battle Orientation</span>
                                     <div className="text-2xl font-black text-white italic tracking-tighter uppercase border-b border-brand-gold/20 pb-1 inline-block">APRIL 02, 2026</div>
                                </div>
                                <p className="text-[10px] font-medium leading-relaxed text-zinc-500 uppercase tracking-widest">
                                    Official orientation and jersey distribution will be held at the main venue.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA & CLOSING NOTICE */}
            <div className="flex flex-col items-center gap-12 animate-in fade-in slide-in-from-bottom-8 delay-700 duration-1000 fill-mode-forwards">
                <div className="flex flex-col items-center sm:items-start border-l border-white/10 pl-8">
                     <span className="text-[10px] font-black tracking-[0.4em] text-zinc-600 uppercase">Enlistment Deadline</span>
                     <span className="text-3xl font-black tabular-nums tracking-tighter text-brand-gold italic">MARCH 25, 2026</span>
                     <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] mt-1">@ 11:59PM Sharp</span>
                </div>
            </div>
        </div>
    );
}
