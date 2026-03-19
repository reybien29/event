import { cn } from '../../lib/utils';

interface Game {
    id: number;
    team_a: { name: string; logo?: string };
    team_b: { name: string; logo?: string };
    team_a_score: number;
    team_b_score: number;
    division: { name: string };
    status: string;
    scheduled_at: string;
}

interface Props {
    games: Game[];
}

export default function Scoreboard({ games }: Props) {
    if (games.length === 0) {
        return null;
    }

    return (
        <div className="relative overflow-hidden">
            <div className="w-full">
                <div className="mb-16 flex items-end justify-between">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase">
                            Gameday Live
                        </span>
                        <h2 className="mt-2 text-4xl font-black tracking-tighter uppercase italic sm:text-6xl">
                            Match{' '}
                            <span className="text-zinc-600">Results.</span>
                        </h2>
                    </div>
                    <div className="hidden sm:block">
                        <div className="flex items-center gap-2">
                            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
                            <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                                Live Updates Enabled
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className="group relative rounded-2xl border border-white/5 bg-zinc-900/50 p-8 backdrop-blur-3xl transition-all hover:border-brand-gold/30 hover:bg-brand-gold/[0.02]"
                        >
                            <div className="mb-8 flex items-center justify-between">
                                <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                    {game.division.name}
                                </span>
                                <span
                                    className={cn(
                                        'rounded-full px-2 py-0.5 text-[9px] font-black tracking-tighter uppercase',
                                        game.status === 'live'
                                            ? 'animate-pulse bg-red-500 text-white'
                                            : 'bg-zinc-800 text-zinc-500',
                                    )}
                                >
                                    {game.status}
                                </span>
                            </div>

                            <div className="mb-8 flex items-center justify-between gap-4">
                                <div className="flex flex-1 flex-col items-center gap-3">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-zinc-800/50 text-xl font-black text-brand-gold shadow-inner transition-colors group-hover:bg-brand-gold/20">
                                        {game.team_a.name[0]}
                                    </div>
                                    <span className="w-full truncate text-center text-xs font-black tracking-widest text-white uppercase">
                                        {game.team_a.name}
                                    </span>
                                </div>

                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl font-black tracking-tighter tabular-nums">
                                            {game.team_a_score}
                                        </span>
                                        <span className="text-xl font-black text-zinc-700 italic">
                                            {' '}
                                            -{' '}
                                        </span>
                                        <span className="text-4xl font-black tracking-tighter tabular-nums">
                                            {game.team_b_score}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-600 uppercase">
                                        Final
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col items-center gap-3">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-zinc-800/50 text-xl font-black text-brand-gold shadow-inner transition-colors group-hover:bg-brand-gold/20">
                                        {game.team_b.name[0]}
                                    </div>
                                    <span className="w-full truncate text-center text-xs font-black tracking-widest text-white uppercase">
                                        {game.team_b.name}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-8">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">
                                    {new Date(
                                        game.scheduled_at,
                                    ).toLocaleDateString(undefined, {
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </span>
                                <button className="text-[10px] font-black tracking-widest text-brand-gold uppercase transition-all hover:underline">
                                    Box Score
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
