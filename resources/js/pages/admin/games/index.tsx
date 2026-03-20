import { Head } from '@inertiajs/react';
import { BentoCard, BentoGrid } from '@/Components/ui/bento';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Game {
    id: number;
    team_a: { name: string };
    team_b: { name: string };
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

            <BentoGrid className="items-start">
                <BentoCard
                    className="md:col-span-12 xl:col-span-4"
                    padding="lg"
                    variant="accent"
                    glow
                >
                    <div className="space-y-4">
                        <div>
                            <div className="text-[10px] font-black tracking-[0.24em] text-brand-gold uppercase">
                                Schedule Overview
                            </div>
                            <h2 className="mt-2 text-3xl font-black tracking-tighter uppercase">
                                Tournament{' '}
                                <span className="text-brand-gold italic">
                                    Schedule
                                </span>
                            </h2>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-300">
                            {games.length} games scheduled.
                            Scheduling is currently managed manually from the
                            control room.
                        </p>
                        <div className="rounded-[1.5rem] border border-white/10 bg-black/18 p-5">
                            <div className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                                Registered Teams
                            </div>
                            <div className="mt-2 text-4xl font-black text-white tabular-nums">
                                {teams_count}
                            </div>
                        </div>
                    </div>
                </BentoCard>

                <BentoCard
                    className="md:col-span-12 xl:col-span-8"
                    padding="lg"
                    variant="default"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/2 text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                    <th className="px-8 py-6">Matchup</th>
                                    <th className="px-8 py-6">
                                        Date &amp; Time
                                    </th>
                                    <th className="px-8 py-6">Venue</th>
                                    <th className="px-8 py-6 text-right">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {games.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="py-32 text-center"
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="mb-4 h-12 w-12 text-zinc-700">
                                                    <svg
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="1"
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="text-xs font-black tracking-widest text-zinc-600 uppercase">
                                                    No games scheduled yet.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : null}

                                {games.map((game) => (
                                    <tr
                                        key={game.id}
                                        className="group transition-colors hover:bg-white/[0.02]"
                                    >

                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm font-black tracking-tight text-white">
                                                    {game.team_a.name}
                                                </span>
                                                <span className="text-[10px] font-black text-zinc-500 italic">
                                                    vs
                                                </span>
                                                <span className="text-sm font-black tracking-tight text-white">
                                                    {game.team_b.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-zinc-300">
                                                    {new Date(
                                                        game.scheduled_at,
                                                    ).toLocaleDateString(
                                                        undefined,
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </span>
                                                <span className="text-[10px] font-black text-zinc-600 uppercase">
                                                    {new Date(
                                                        game.scheduled_at,
                                                    ).toLocaleTimeString(
                                                        undefined,
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-zinc-400 capitalize">
                                            {game.court_name}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <span className="rounded-full border border-white/5 bg-zinc-800 px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase">
                                                {game.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </BentoCard>
            </BentoGrid>
        </AdminLayout>
    );
}
