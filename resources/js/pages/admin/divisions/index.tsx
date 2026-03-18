import { Head } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Division {
    id: number;
    name: string;
    description: string;
    teams_count?: number;
}

interface Props {
    divisions: Division[];
}

export default function DivisionsIndex({ divisions }: Props) {
    return (
        <AdminLayout title="Division Management">
            <Head title="Divisions" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {divisions.map((division) => (
                    <div key={division.id} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl transition-all hover:scale-[1.02] hover:bg-white/[0.08] hover:border-brand-gold/30">
                        <div className="absolute top-0 right-0 p-6">
                            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-zinc-900 shadow-inner group-hover:bg-brand-gold group-hover:text-black transition-all">
                                <span className="text-xs font-black tracking-tighter uppercase">{division.teams_count || 0}</span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-black uppercase tracking-tighter text-white group-hover:text-brand-gold transition-colors">{division.name}</h3>
                            <p className="mt-2 text-xs font-medium leading-relaxed text-zinc-500 uppercase tracking-tight">{division.description || 'No description provided.'}</p>
                        </div>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-px flex-1 bg-white/5" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Active Division</span>
                        </div>
                    </div>
                ))}

                {/* Add Division Placeholder */}
                <button className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-white/5 p-8 transition-all hover:border-brand-gold/50 hover:bg-brand-gold/5 group">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-brand-gold group-hover:text-black transition-all">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">Create New Division</span>
                </button>
            </div>
        </AdminLayout>
    );
}
