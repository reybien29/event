interface Standing {
    id: number;
    team: { name: string };
    tournament: { name: string };
    played: number;
    won: number;
    lost: number;
    points: number;
}

interface Props {
    standings: Standing[];
}

export default function Standings({ standings }: Props) {
    if (standings.length === 0) {
        return null;
    }

    // Group standings by tournament
    const tournaments = standings.reduce(
        (acc, curr) => {
            const tourName = curr.tournament?.name || 'Tournament';

            if (!acc[tourName]) {
                acc[tourName] = [];
            }

            acc[tourName].push(curr);

            return acc;
        },
        {} as Record<string, Standing[]>,
    );

    return (
        <div className="relative overflow-hidden">
            <div className="w-full">
                <div className="mb-16 flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase">
                            Tournament Leaders
                        </span>
                        <h2 className="mt-2 text-4xl font-black tracking-tighter uppercase sm:text-6xl">
                            League{' '}
                            <span className="text-brand-gold italic">
                                Standings.
                            </span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {Object.entries(tournaments).map(([tournament, items]) => (
                        <div key={tournament}>
                            <h3 className="mb-6 flex items-center gap-4 text-xs font-black tracking-widest text-zinc-500 uppercase after:h-[1px] after:flex-1 after:bg-white/10">
                                {tournament}
                            </h3>

                            <div className="overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 p-4 shadow-2xl backdrop-blur-3xl">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[10px] font-black tracking-widest text-zinc-600 uppercase">
                                            <th className="w-12 pt-2 pb-4 pl-4">
                                                Pos
                                            </th>
                                            <th className="flex-grow pt-2 pb-4">
                                                Club
                                            </th>
                                            <th className="w-8 pt-2 pb-4 text-center">
                                                P
                                            </th>
                                            <th className="w-8 pt-2 pb-4 text-center">
                                                W
                                            </th>
                                            <th className="w-8 pt-2 pb-4 text-center">
                                                L
                                            </th>
                                            <th className="w-12 pt-2 pr-4 pb-4 text-right font-black text-brand-gold">
                                                Pts
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/2">
                                        {items.map((standing, index) => (
                                            <tr
                                                key={standing.id}
                                                className="group transition-colors hover:bg-white/[0.02]"
                                            >
                                                <td className="py-5 pl-4 text-sm font-black text-zinc-600 italic transition-colors group-hover:text-brand-gold">
                                                    {index + 1}
                                                </td>
                                                <td className="py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded border border-white/5 bg-zinc-800 text-[10px] font-black text-brand-gold uppercase">
                                                            {
                                                                standing.team
                                                                    .name[0]
                                                            }
                                                        </div>
                                                        <span className="text-sm font-bold tracking-tight text-white transition-colors group-hover:text-brand-gold">
                                                            {standing.team.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-5 text-center text-xs font-semibold text-zinc-500">
                                                    {standing.played}
                                                </td>
                                                <td className="py-5 text-center text-xs font-semibold text-zinc-500">
                                                    {standing.won}
                                                </td>
                                                <td className="py-5 text-center text-xs font-semibold text-zinc-500">
                                                    {standing.lost}
                                                </td>
                                                <td className="py-5 pr-4 text-right">
                                                    <span className="text-sm font-black text-white tabular-nums transition-colors group-hover:text-brand-gold">
                                                        {standing.points}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
