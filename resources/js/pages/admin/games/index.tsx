import { Head } from '@inertiajs/react';
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
    return (
        <AdminLayout title="Schedule Management">
            <Head title="League Schedule" />

            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">
                        Tournament <span className="text-brand-gold italic">Schedule</span>
                    </h2>
                    <p className="mt-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                        {games.length} games scheduled across all divisions. Scheduling is now handled manually.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col items-end gap-1 border-r border-white/10 px-4">
                        <span className="text-[10px] font-black uppercase text-zinc-600">Registered Teams</span>
                        <span className="text-xl font-black tabular-nums">{teams_count}</span>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5 shadow-2xl backdrop-blur-3xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            <th className="px-8 py-6">Division</th>
                            <th className="px-8 py-6">Matchup</th>
                            <th className="px-8 py-6">Date &amp; Time</th>
                            <th className="px-8 py-6">Venue</th>
                            <th className="px-8 py-6 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {games.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-32 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="mb-4 h-12 w-12 text-zinc-700">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-xs font-black uppercase tracking-widest text-zinc-600">No games scheduled yet.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : null}

                        {games.map((game) => (
                            <tr key={game.id} className="group transition-colors hover:bg-white/[0.02]">
                                <td className="px-8 py-6">
                                    <span className="rounded bg-brand-gold/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-brand-gold">
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
                                        <span className="text-[10px] font-black uppercase text-zinc-600">
                                            {new Date(game.scheduled_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-sm font-bold capitalize text-zinc-400">{game.court_name}</td>
                                <td className="px-8 py-6 text-right">
                                    <span className="rounded-full border border-white/5 bg-zinc-800 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
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
