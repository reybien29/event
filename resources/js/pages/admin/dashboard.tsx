import { Head, Link, usePoll } from '@inertiajs/react';
import { index as statsIndex } from '@/actions/App/Http/Controllers/Admin/StatsController';
import { index as teamsIndex } from '@/actions/App/Http/Controllers/Admin/TeamController';
import { BentoCard, BentoGrid } from '@/Components/ui/bento';
import AdminLayout from '../../Layouts/AdminLayout';
import { cn } from '../../lib/utils';
import RoundRobinView from '../../Components/Admin/RoundRobinView';

interface Team {
    id: number;
    name: string;
    coach_name: string;
    status: string;
    created_at: string;
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

interface Tournament {
    id: number;
    name: string;
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
    stats: {
        total_teams: number;
        total_players: number;
        total_payments: string;
        pending_registrations: number;
    };
    recent_teams: {
        data: Team[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        total: number;
        from: number;
        to: number;
    };
    bracket: Game[];
    active_tournament: Tournament | null;
    standings: TeamStanding[];
}

export default function Dashboard({ stats, recent_teams, bracket, active_tournament, standings }: Props) {
    usePoll(3000, {
        only: ['stats', 'recent_teams', 'bracket', 'standings'],
    });

    return (
        <AdminLayout title="System Overview">
            <Head title="Admin Dashboard" />

            <BentoGrid className="items-start">
                <StatCard
                    className="md:col-span-6 xl:col-span-3"
                    label="Total Teams"
                    value={stats.total_teams.toString()}
                    icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <StatCard
                    className="md:col-span-6 xl:col-span-3"
                    label="Total Players"
                    value={stats.total_players.toString()}
                    icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    color="text-blue-400"
                />
                <StatCard
                    className="md:col-span-6 xl:col-span-3"
                    label="Total Revenue"
                    value={stats.total_payments}
                    icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    color="text-emerald-400"
                />
                <StatCard
                    className="md:col-span-6 xl:col-span-3"
                    label="Pending Approval"
                    value={stats.pending_registrations.toString()}
                    icon="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    color="text-brand-gold"
                />

                {/* Bracket Generation Section */}
                {(bracket.length > 0 || standings?.length > 0) && (
                    <BentoCard
                        className="md:col-span-12"
                        padding="lg"
                        variant="default"
                    >
                        <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
                            <div>
                                <h3 className="text-[10px] font-black tracking-[0.25em] text-brand-gold uppercase">
                                    Tournament Fixtures
                                </h3>
                                <div className="mt-2 text-2xl font-black tracking-tighter text-white uppercase">
                                    {active_tournament?.name || 'Tournament'} • Group Stage / Round Robin
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-4 py-2 text-[10px] font-black text-brand-gold uppercase tracking-widest">
                                    <span className="h-2 w-2 animate-pulse rounded-full bg-brand-gold"></span>
                                    AI Optimized
                                </span>
                            </div>
                        </div>

                        <RoundRobinView bracket={bracket} standings={standings} />
                    </BentoCard>
                )}

                <BentoCard
                    className="md:col-span-12 xl:col-span-4"
                    padding="lg"
                    variant="accent"
                    glow
                >
                    <div className="space-y-5">
                        <div>
                            <div className="text-[10px] font-black tracking-[0.24em] text-brand-gold uppercase">
                                Operations Snapshot
                            </div>
                            <div className="mt-2 text-2xl font-black tracking-[-0.04em] text-white uppercase">
                                Control The Full Tournament Flow
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-300">
                            Review registrations, jump into standings, and move
                            quickly into team administration from a single
                            dashboard surface.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={statsIndex.url()}
                                className="inline-flex items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/10 px-5 py-3 text-[10px] font-black tracking-[0.2em] text-brand-gold uppercase transition-all hover:bg-brand-gold/15"
                            >
                                Stats Management
                            </Link>
                            <Link
                                href={teamsIndex.url()}
                                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] font-black tracking-[0.2em] text-zinc-200 uppercase transition-all hover:bg-white/[0.06]"
                            >
                                View All Teams
                            </Link>
                        </div>
                    </div>
                </BentoCard>

                <BentoCard
                    className="md:col-span-12 xl:col-span-8"
                    padding="lg"
                    variant="default"
                >
                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 className="text-sm font-black tracking-widest uppercase">
                                Recent Registrations
                            </h3>
                            <p className="mt-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                New team entries are surfaced here while
                                standings, schedules, and bulk bracket
                                generation stay inside their dedicated admin
                                tools.
                            </p>
                        </div>
                    </div>

                    {recent_teams.data.length === 0 ? (
                        <div className="rounded-[1.5rem] border border-dashed border-white/10 px-6 py-16 text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                            No recent registrations yet.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-sans">
                                <thead>
                                    <tr className="border-b border-white/5 text-[10px] font-black tracking-widest text-zinc-600 uppercase">
                                        <th className="pb-4">Team Details</th>
                                        <th className="pb-4">Coach</th>
                                        <th className="pb-4">Registered</th>
                                        <th className="pb-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {recent_teams.data.map((team) => (
                                        <tr key={team.id} className="group">
                                            <td className="max-w-[200px] py-4 group-hover:bg-white/[0.01]">
                                                <div className="truncate text-sm font-black tracking-tighter text-white transition-colors group-hover:text-brand-gold">
                                                    {team.name}
                                                </div>
                                                <div className="text-[10px] font-bold text-zinc-600 tracking-widest uppercase">
                                                    ID: #{team.id.toString().padStart(4, '0')}
                                                </div>
                                            </td>

                                            <td className="py-4 text-xs font-black tracking-tighter text-zinc-100 uppercase italic">
                                                {team.coach_name}
                                            </td>
                                            <td className="py-4 text-[10px] font-bold tracking-tighter text-brand-gold/60 uppercase">
                                                {new Date(team.created_at).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                            </td>
                                            <td className="py-4 text-right">
                                                <span className={`inline-flex rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest ${
                                                    team.status === 'approved' ? 'bg-green-500/10 text-green-500' : 'bg-brand-gold/10 text-brand-gold'
                                                }`}>
                                                    {team.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Enhanced Pagination Controls */}
                            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                                <div className="text-[10px] font-black tracking-widest text-zinc-600 uppercase">
                                    Displaying {recent_teams.from}–{recent_teams.to} of {recent_teams.total} entries
                                </div>
                                <div className="flex gap-1.5 flex-wrap justify-end">
                                    {recent_teams.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            only={['recent_teams']}
                                            preserveScroll
                                            prefetch="hover"
                                            className={cn(
                                                "inline-flex h-8 min-w-[32px] items-center justify-center rounded-lg px-2.5 text-[9px] font-black tracking-widest uppercase transition-all",
                                                link.active 
                                                    ? "bg-brand-gold text-black shadow-lg shadow-brand-gold/20" 
                                                    : "bg-white/[0.03] text-zinc-500 border border-white/5 hover:bg-white/[0.08] hover:text-white",
                                                !link.url && "opacity-20 cursor-not-allowed hidden sm:inline-flex"
                                            )}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </BentoCard>
            </BentoGrid>
        </AdminLayout>
    );
}

function StatCard({
    className,
    label,
    value,
    icon,
    color = 'text-brand-gold',
}: {
    className?: string;
    label: string;
    value: string;
    icon: string;
    color?: string;
}) {
    return (
        <BentoCard
            className={cn(
                'transition-all hover:scale-[1.01] hover:bg-white/[0.08]',
                className,
            )}
            padding="md"
            variant="default"
        >
            <div className="mb-4 flex items-center justify-between">
                <div
                    className={cn(
                        'rounded-2xl bg-zinc-950/80 p-3 shadow-inner',
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
        </BentoCard>
    );
}
