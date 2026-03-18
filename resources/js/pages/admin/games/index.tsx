import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Game {
    id: number;
    team_a: { name: string };
    team_b: { name: string };
    division: { name: string };
    scheduled_at: string;
    court_name: string;
    status: string;
}

interface Props {
    games: Game[];
    teams_count: number;
}

export default function Index({ games, teams_count }: Props) {
    const generate = () => {
        if (confirm('Are you sure? This will generate a new schedule for all approved teams.')) {
            router.post('/admin/games/generate');
        }
    };

    return (
        <AdminLayout title="Schedule Management">
            <Head title="League Schedule" />

            <div className="mb-12 flex items-end justify-between">
                <div>
                     <h2 className="text-3xl font-black tracking-tighter uppercase">Tournament <span className="text-brand-gold italic">Schedule</span></h2>
                     <p className="mt-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">{games.length} Games Scheduled across all divisions</p>
                </div>

                <div className="flex gap-4">
                     <div className="flex flex-col items-end gap-1 px-4 border-r border-white/10">
                         <span className="text-[10px] font-black text-zinc-600 uppercase">Approved Teams</span>
                         <span className="text-xl font-black tabular-nums">{teams_count}</span>
                     </div>
                     <button 
                        onClick={generate}
                        className="flex h-12 items-center justify-center rounded bg-brand-gold px-8 text-[10px] font-black tracking-[0.2em] text-black uppercase shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold-glow hover:scale-105 active:scale-95"
                    >
                        AI Generate Schedule
                    </button>
                </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            <th className="px-8 py-6">Division</th>
                            <th className="px-8 py-6">Matchup</th>
                            <th className="px-8 py-6">Date & Time</th>
                            <th className="px-8 py-6">Venue</th>
                            <th className="px-8 py-6 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {games.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-32 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="mb-4 h-12 w-12 text-zinc-700">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                        <p className="text-xs font-black uppercase tracking-widest text-zinc-600">No games scheduled yet.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {games.map((game) => (
                            <tr key={game.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-black tracking-widest uppercase text-brand-gold bg-brand-gold/10 px-2 py-1 rounded">
                                        {game.division.name}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-black tracking-tight text-white">{game.team_a.name}</span>
                                        <span className="text-[10px] font-black italic text-zinc-500">vs</span>
                                        <span className="text-sm font-black tracking-tight text-white">{game.team_b.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-zinc-300">
                                            {new Date(game.scheduled_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="text-[10px] font-black text-zinc-600 uppercase">
                                            {new Date(game.scheduled_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-sm font-bold text-zinc-400 capitalize">
                                    {game.court_name}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <span className="text-[10px] font-black tracking-widest uppercase text-white bg-zinc-800 px-3 py-1 rounded-full border border-white/5">
                                        {game.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
