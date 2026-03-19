import { Head, Link } from '@inertiajs/react';
import { index as statsIndex } from '@/actions/App/Http/Controllers/Admin/StatsController';
import { index as teamsIndex } from '@/actions/App/Http/Controllers/Admin/TeamController';
import AdminLayout from '../../Layouts/AdminLayout';
import { cn } from '../../lib/utils';

interface Team {
    id: number;
    name: string;
    coach_name: string;
    status: string;
    division?: {
        name: string;
    };
}

interface Props {
    stats: {
        total_teams: number;
        total_players: number;
        total_payments: string;
        pending_registrations: number;
    };
    recent_teams: Team[];
}

export default function Dashboard({ stats, recent_teams }: Props) {
    return (
        <AdminLayout title="System Overview">
            <Head title="Admin Dashboard" />

            <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Total Teams"
                    value={stats.total_teams.toString()}
                    icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <StatCard
                    label="Total Players"
                    value={stats.total_players.toString()}
                    icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    color="text-blue-500"
                />
                <StatCard
                    label="Total Revenue"
                    value={stats.total_payments}
                    icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    color="text-green-500"
                />
                <StatCard
                    label="Pending Approval"
                    value={stats.pending_registrations.toString()}
                    icon="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    color="text-brand-gold"
                />
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-sm font-black tracking-widest uppercase">
                            Recent Registrations
                        </h3>
                        <p className="mt-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                            New team entries are surfaced here while standings,
                            schedules, and bulk bracket generation stay inside
                            their dedicated admin tools.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={statsIndex.url()}
                            className="inline-flex items-center justify-center rounded-xl border border-brand-gold/20 bg-brand-gold/10 px-4 py-3 text-[10px] font-black tracking-[0.2em] text-brand-gold uppercase transition-all hover:bg-brand-gold/15"
                        >
                            Stats Management
                        </Link>
                        <Link
                            href={teamsIndex.url()}
                            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[10px] font-black tracking-[0.2em] text-zinc-200 uppercase transition-all hover:bg-white/[0.06]"
                        >
                            View All Teams
                        </Link>
                    </div>
                </div>

                {recent_teams.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                        No recent registrations yet.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] font-black text-zinc-600 uppercase">
                                    <th className="pb-4">Team Name</th>
                                    <th className="pb-4">Division</th>
                                    <th className="pb-4">Coach</th>
                                    <th className="pb-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recent_teams.map((team) => (
                                    <tr key={team.id} className="group">
                                        <td className="max-w-[150px] truncate py-4 text-sm font-bold tracking-tight text-white transition-colors group-hover:text-brand-gold">
                                            {team.name}
                                        </td>
                                        <td className="py-4 text-xs font-semibold text-zinc-500">
                                            {team.division?.name || 'N/A'}
                                        </td>
                                        <td className="py-4 text-sm font-medium text-zinc-400">
                                            {team.coach_name}
                                        </td>
                                        <td className="py-4 text-right">
                                            <span className="inline-flex rounded-full bg-brand-gold/10 px-3 py-1 text-[10px] font-black text-brand-gold uppercase">
                                                {team.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

function StatCard({
    label,
    value,
    icon,
    color = 'text-brand-gold',
}: {
    label: string;
    value: string;
    icon: string;
    color?: string;
}) {
    return (
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-all hover:scale-[1.02] hover:bg-white/[0.08]">
            <div className="mb-4 flex items-center justify-between">
                <div
                    className={cn(
                        'rounded-lg bg-zinc-900 p-2 shadow-inner',
                        color,
                    )}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={icon}
                        />
                    </svg>
                </div>
            </div>
            <div className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                {label}
            </div>
            <div className="mt-1 text-3xl font-black tracking-tighter uppercase">
                {value}
            </div>
        </div>
    );
}
