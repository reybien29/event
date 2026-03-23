import React from 'react';
import { router } from '@inertiajs/react';

interface Team {
    id: number;
    name: string;
}

interface Game {
    id: number;
    team_a: Team;
    team_b: Team;
    court_name: string;
    scheduled_at: string;
    group_name: string;
    status: string;
    team_a_score: number | null;
    team_b_score: number | null;
}

interface TeamStanding {
    id: number;
    name: string;
    group_name: string | null;
    wins: number;
    losses: number;
    draws: number;
    points: number;
    quotient: number;
    played: number;
}

interface Props {
    bracket: Game[];
    standings?: TeamStanding[];
}

export default function RoundRobinView({ bracket, standings }: Props) {
    const assignWinner = (gameId: number, winnerId: number) => {
        if (!confirm('Are you sure you want to mark this team as the winner? This will permanently update the overall standings.')) return;
        
        router.post(`/admin/games/${gameId}/result`, {
            winner_id: winnerId,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <div className="space-y-8">
            {/* Standings Table */}
            {standings && standings.length > 0 && (
                <div>
                    <h4 className="mb-4 text-[11px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                        Standings Table
                    </h4>
                    <div className="overflow-x-auto rounded-xl border border-white/5">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-900/40 text-[10px] font-black tracking-widest text-brand-gold uppercase">
                                <tr>
                                    <th className="px-4 py-3">Team</th>
                                    <th className="px-4 py-3 text-center">Group</th>
                                    <th className="px-4 py-3 text-center">MP</th>
                                    <th className="px-4 py-3 text-center">W</th>
                                    <th className="px-4 py-3 text-center">D</th>
                                    <th className="px-4 py-3 text-center">L</th>
                                    <th className="px-4 py-3 text-center">Pts</th>
                                    <th className="px-4 py-3 text-center">Quot</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 bg-zinc-900/20">
                                {standings.map((row, idx) => (
                                    <tr
                                        key={row.id}
                                        className="transition-colors hover:bg-white/[0.02]"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-bold text-zinc-600">
                                                    {idx + 1}
                                                </span>
                                                <span className="text-xs font-black text-white uppercase">
                                                    {row.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center text-xs font-bold text-zinc-400 uppercase">
                                            {row.group_name || '-'}
                                        </td>
                                        <td className="px-4 py-3 text-center text-xs font-bold text-zinc-400">
                                            {row.played}
                                        </td>
                                        <td className="px-4 py-3 text-center text-xs font-bold text-zinc-400">
                                            {row.wins}
                                        </td>
                                        <td className="px-4 py-3 text-center text-xs font-bold text-zinc-400">
                                            {row.draws}
                                        </td>
                                        <td className="px-4 py-3 text-center text-xs font-bold text-zinc-400">
                                            {row.losses}
                                        </td>
                                        <td className="px-4 py-3 text-center text-xs font-black text-brand-gold">
                                            {row.points}
                                        </td>
                                        <td className="px-4 py-3 text-center text-xs font-bold text-zinc-400">
                                            {Number(row.quotient).toFixed(4)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Fixture List */}
            {bracket.length > 0 && (
                <div>
                    <h4 className="mb-4 text-[11px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                        Fixture List
                    </h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {bracket.map((match) => (
                            <div
                                key={match.id}
                                className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-zinc-900/40 transition-all duration-300 hover:border-brand-gold/40 hover:bg-zinc-900/60"
                            >
                                <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2">
                                    <span className="text-[9px] font-black tracking-widest text-zinc-500 uppercase">
                                        {match.group_name}
                                    </span>
                                    <span className="text-[9px] font-black tracking-widest text-brand-gold uppercase">
                                        {match.court_name}
                                    </span>
                                </div>

                                <div className="flex flex-col space-y-3 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-zinc-950 text-[10px] font-black text-brand-gold transition-transform group-hover:scale-110">
                                                {match.team_a?.name?.charAt(0) ||
                                                    'T'}
                                            </div>
                                            <span className="max-w-[120px] truncate text-sm font-black tracking-tight text-white uppercase">
                                                {match.team_a?.name || 'TBD'}
                                            </span>
                                        </div>
                                        <span className="text-[8px] font-bold tracking-widest text-zinc-600 uppercase">
                                            Home
                                        </span>
                                    </div>

                                    <div className="relative flex items-center py-1">
                                        <div className="flex-grow border-t border-white/5"></div>
                                        <span className="mx-3 text-[10px] font-black italic text-zinc-700 transition-colors group-hover:text-brand-gold">
                                            VS
                                        </span>
                                        <div className="flex-grow border-t border-white/5"></div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-zinc-950 text-[10px] font-black text-brand-gold transition-transform group-hover:scale-110">
                                                {match.team_b?.name?.charAt(0) ||
                                                    'T'}
                                            </div>
                                            <span className="max-w-[120px] truncate text-sm font-black tracking-tight text-white uppercase">
                                                {match.team_b?.name || 'TBD'}
                                            </span>
                                        </div>
                                        <span className="text-[8px] font-bold tracking-widest text-zinc-600 uppercase">
                                            Away
                                        </span>
                                    </div>
                                    
                                    {match.status === 'finished' ? (
                                        <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-brand-gold/20 bg-brand-gold/5 py-2">
                                            <span className="text-[10px] font-black tracking-widest text-brand-gold uppercase">Match Completed</span>
                                            <span className="mt-1 max-w-[180px] truncate text-[9px] font-bold text-zinc-400 uppercase">
                                                Winner: {match.team_a_score !== null && match.team_b_score !== null ? (match.team_a_score > match.team_b_score ? match.team_a?.name : match.team_b?.name) : 'TBD'}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="mt-4 flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => assignWinner(match.id, match.team_a.id)}
                                                className="flex-1 truncate rounded-lg border border-white/5 bg-white/[0.03] px-2 py-2 text-[9px] font-black tracking-widest text-zinc-300 transition-colors hover:border-brand-gold/50 hover:bg-white/[0.08] hover:text-white uppercase outline-none"
                                                title={`${match.team_a?.name} Won`}
                                            >
                                                {match.team_a?.name?.substring(0, 3)} Win
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => assignWinner(match.id, match.team_b.id)}
                                                className="flex-1 truncate rounded-lg border border-white/5 bg-white/[0.03] px-2 py-2 text-[9px] font-black tracking-widest text-zinc-300 transition-colors hover:border-brand-gold/50 hover:bg-white/[0.08] hover:text-white uppercase outline-none"
                                                title={`${match.team_b?.name} Won`}
                                            >
                                                {match.team_b?.name?.substring(0, 3)} Win
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto flex items-center justify-center gap-2 border-t border-white/5 bg-brand-gold/[0.03] px-4 py-3">
                                    <div className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                                        {new Date(
                                            match.scheduled_at,
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </div>
                                    <div className="h-1 w-1 rounded-full bg-zinc-700"></div>
                                    <div className="text-[10px] font-black tracking-[0.2em] text-white uppercase">
                                        {new Date(
                                            match.scheduled_at,
                                        ).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
