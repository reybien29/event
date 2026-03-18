import { Head } from '@inertiajs/react';
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

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Total Teams" value={stats.total_teams.toString()} icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                <StatCard label="Total Players" value={stats.total_players.toString()} icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" color="text-blue-500" />
                <StatCard label="Total Revenue" value={stats.total_payments} icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" color="text-green-500" />
                <StatCard label="Pending Approval" value={stats.pending_registrations.toString()} icon="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" color="text-brand-gold" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Recent Teams Table */}
                <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="mb-6 flex items-center justify-between">
                         <h3 className="text-sm font-black tracking-widest uppercase">Recent Registrations</h3>
                         <button className="text-[10px] font-black uppercase text-brand-gold hover:underline">View All</button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] font-black uppercase text-zinc-600">
                                    <th className="pb-4">Team Name</th>
                                    <th className="pb-4">Division</th>
                                    <th className="pb-4">Coach</th>
                                    <th className="pb-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recent_teams.map((team) => (
                                    <tr key={team.id} className="group">
                                        <td className="py-4 text-sm font-bold tracking-tight text-white transition-colors group-hover:text-brand-gold truncate max-w-[150px]">{team.name}</td>
                                        <td className="py-4 text-xs font-semibold text-zinc-500">{team.division?.name || 'N/A'}</td>
                                        <td className="py-4 text-sm font-medium text-zinc-400">{team.coach_name}</td>
                                        <td className="py-4 text-right">
                                            <span className="inline-flex rounded-full bg-brand-gold/10 px-3 py-1 text-[10px] font-black uppercase text-brand-gold">
                                                {team.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
                        <h3 className="mb-6 text-sm font-black tracking-widest uppercase">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-4">
                             <ActionButton label="Generate Schedule" icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" color="bg-brand-gold text-black" />
                             <ActionButton label="Invite Teams" icon="M12 4v16m8-8H4" />
                             <ActionButton label="Export Stats" icon="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </div>
                    </div>
                    
                    {/* Maintenance / Mode */}
                    <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
                         <div className="flex gap-4">
                             <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded bg-yellow-500 text-black">
                                 <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                             </div>
                             <div>
                                 <h4 className="text-sm font-black uppercase tracking-tighter text-yellow-500">Tournament Mode</h4>
                                 <p className="text-[11px] font-medium leading-relaxed text-yellow-500/80">
                                     All game results are currently being broadcast live. Use caution when editing standings.
                                 </p>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function StatCard({ label, value, icon, color = "text-brand-gold" }: { label: string; value: string; icon: string; color?: string }) {
    return (
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl shadow-xl transition-all hover:scale-[1.02] hover:bg-white/[0.08]">
             <div className="mb-4 flex items-center justify-between">
                 <div className={cn("rounded-lg bg-zinc-900 p-2 shadow-inner", color)}>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                    </svg>
                 </div>
             </div>
             <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{label}</div>
             <div className="mt-1 text-3xl font-black tracking-tighter uppercase">{value}</div>
        </div>
    );
}

function ActionButton({ label, icon, color = "bg-zinc-800 text-white" }: { label: string; icon: string; color?: string }) {
    return (
        <button className={cn(
            "flex w-full items-center gap-4 rounded-xl p-4 text-xs font-black uppercase tracking-widest transition-all active:scale-95",
            color
        )}>
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
            </svg>
            {label}
        </button>
    );
}
