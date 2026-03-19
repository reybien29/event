import { Head } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Division {
    id: number;
    name: string;
}

interface Team {
    id: number;
    name: string;
    coach_name: string;
    contact_number: string;
    status: string;
    division?: Division;
}

interface Props {
    teams: Team[];
}

export default function TeamsIndex({ teams }: Props) {
    return (
        <AdminLayout title="Team Management">
            <Head title="Teams" />

            <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest">Registered Teams</h3>
                        <p className="mt-1 text-[11px] font-medium uppercase tracking-tight text-zinc-500">Managing {teams.length} participants</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] font-black uppercase text-zinc-600">
                                <th className="px-4 pb-4 font-black">Team</th>
                                <th className="px-4 pb-4 font-black">Division</th>
                                <th className="px-4 pb-4 font-black">Coach</th>
                                <th className="px-4 pb-4 font-black">Contact</th>
                                <th className="px-4 pb-4 text-right font-black">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {teams.map((team) => (
                                <tr key={team.id} className="group transition-all hover:bg-white/[0.02]">
                                    <td className="px-4 py-5">
                                        <div className="text-sm font-black uppercase tracking-tighter text-white transition-colors group-hover:text-brand-gold">{team.name}</div>
                                        <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">ID: #{team.id.toString().padStart(4, '0')}</div>
                                    </td>
                                    <td className="px-4 py-5 text-xs font-black uppercase tracking-widest text-brand-gold/80">{team.division?.name || 'Unassigned'}</td>
                                    <td className="px-4 py-5 text-xs font-bold uppercase text-zinc-300">{team.coach_name}</td>
                                    <td className="px-4 py-5 font-mono text-[11px] font-medium tracking-tighter text-zinc-500">{team.contact_number}</td>
                                    <td className="px-4 py-5 text-right">
                                        <span
                                            className={`inline-flex rounded-md border px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${
                                                team.status === 'approved'
                                                    ? 'border-green-500/20 bg-green-500/10 text-green-500'
                                                    : 'border-brand-gold/20 bg-brand-gold/10 text-brand-gold'
                                            }`}
                                        >
                                            {team.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
