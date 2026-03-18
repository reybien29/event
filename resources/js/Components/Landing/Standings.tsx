import { cn } from '../../lib/utils';

interface Standing {
    id: number;
    team: { name: string };
    division: { name: string };
    played: number;
    won: number;
    lost: number;
    points: number;
}

interface Props {
    standings: Standing[];
}

export default function Standings({ standings }: Props) {
    if (standings.length === 0) return null;

    // Group standings by division
    const divisions = standings.reduce((acc, curr) => {
        const divName = curr.division.name;
        if (!acc[divName]) acc[divName] = [];
        acc[divName].push(curr);
        return acc;
    }, {} as Record<string, Standing[]>);

    return (
        <div className="relative overflow-hidden">
             <div className="w-full">
                 <div className="mb-16 flex items-center justify-between">
                     <div>
                         <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase">Division Leaders</span>
                         <h2 className="mt-2 text-4xl font-black tracking-tighter uppercase sm:text-6xl">League <span className="text-brand-gold italic">Standings.</span></h2>
                     </div>
                 </div>

                 <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                     {Object.entries(divisions).map(([division, items]) => (
                         <div key={division}>
                             <h3 className="mb-6 flex items-center gap-4 text-xs font-black uppercase tracking-widest text-zinc-500 after:h-[1px] after:flex-1 after:bg-white/10">
                                 {division}
                             </h3>

                             <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-4 shadow-2xl backdrop-blur-3xl overflow-hidden">
                                 <table className="w-full text-left">
                                     <thead>
                                         <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                             <th className="pb-4 pl-4 w-12 pt-2">Pos</th>
                                             <th className="pb-4 pt-2 flex-grow">Club</th>
                                             <th className="pb-4 pt-2 text-center w-8">P</th>
                                             <th className="pb-4 pt-2 text-center w-8">W</th>
                                             <th className="pb-4 pt-2 text-center w-8">L</th>
                                             <th className="pb-4 pt-2 text-right pr-4 w-12 font-black text-brand-gold">Pts</th>
                                         </tr>
                                     </thead>
                                     <tbody className="divide-y divide-white/2">
                                         {items.map((standing, index) => (
                                             <tr key={standing.id} className="group hover:bg-white/[0.02] transition-colors">
                                                 <td className="py-5 pl-4 text-sm font-black italic text-zinc-600 group-hover:text-brand-gold transition-colors">{index + 1}</td>
                                                 <td className="py-5">
                                                     <div className="flex items-center gap-3">
                                                         <div className="h-6 w-6 rounded bg-zinc-800 border border-white/5 flex items-center justify-center text-[10px] font-black text-brand-gold uppercase">
                                                             {standing.team.name[0]}
                                                         </div>
                                                         <span className="text-sm font-bold tracking-tight text-white group-hover:text-brand-gold transition-colors">{standing.team.name}</span>
                                                     </div>
                                                 </td>
                                                 <td className="py-5 text-center text-xs font-semibold text-zinc-500">{standing.played}</td>
                                                 <td className="py-5 text-center text-xs font-semibold text-zinc-500">{standing.won}</td>
                                                 <td className="py-5 text-center text-xs font-semibold text-zinc-500">{standing.lost}</td>
                                                 <td className="py-5 text-right pr-4">
                                                     <span className="text-sm font-black tabular-nums text-white group-hover:text-brand-gold transition-colors">{standing.points}</span>
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
