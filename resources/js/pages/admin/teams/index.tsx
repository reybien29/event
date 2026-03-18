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
    coach_phone: string;
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
                        <h3 className="text-sm font-black tracking-widest uppercase">Registered Teams</h3>
                        <p className="text-[11px] font-medium text-zinc-500 mt-1 uppercase tracking-tight">Managing {teams.length} participants</p>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] font-black uppercase text-zinc-600">
                                <th className="pb-4 px-4 font-black">Team</th>
                                <th className="pb-4 px-4 font-black">Division</th>
                                <th className="pb-4 px-4 font-black">Coach</th>
                                <th className="pb-4 px-4 font-black">Contact</th>
                                <th className="pb-4 px-4 text-right font-black">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {teams.map((team) => (
                                <tr key={team.id} className="group hover:bg-white/[0.02] transition-all">
                                    <td className="py-5 px-4">
                                        <div className="text-sm font-black tracking-tighter text-white uppercase group-hover:text-brand-gold transition-colors">{team.name}</div>
                                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">ID: #{team.id.toString().padStart(4, '0')}</div>
                                    </td>
                                    <td className="py-5 px-4 text-xs font-black text-brand-gold/80 uppercase tracking-widest">{team.division?.name || 'Unassigned'}</td>
                                    <td className="py-5 px-4 text-xs font-bold text-zinc-300 uppercase">{team.coach_name}</td>
                                    <td className="py-5 px-4 text-[11px] font-medium text-zinc-500 font-mono tracking-tighter">{team.coach_phone}</td>
                                    <td className="py-5 px-4 text-right">
                                        <span className={`inline-flex rounded-md px-2.5 py-1 text-[9px] font-black uppercase tracking-widest border ${
                                            team.status === 'approved' 
                                            ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                                            : 'bg-brand-gold/10 text-brand-gold border-brand-gold/20'
                                        }`}>
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
