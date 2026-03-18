import { Head } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Tournament {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
}

interface Props {
    tournament: Tournament;
}

export default function SettingsIndex({ tournament }: Props) {
    return (
        <AdminLayout title="System Settings">
            <Head title="Settings" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                <div className="space-y-8">
                     {/* Tournament Profile */}
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-brand-gold">Active Tournament</h3>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Tournament Name</label>
                                <input 
                                    type="text" 
                                    readOnly
                                    className="w-full h-12 px-5 rounded-xl border border-white/5 bg-white/5 text-sm font-black uppercase tracking-tighter text-white appearance-none outline-none focus:border-brand-gold transition-all"
                                    defaultValue={tournament?.name || 'Loading...'}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Description</label>
                                <textarea 
                                    readOnly
                                    className="w-full px-5 py-4 rounded-xl border border-white/5 bg-white/5 text-sm font-medium leading-relaxed text-zinc-400 appearance-none outline-none focus:border-brand-gold transition-all h-32"
                                    defaultValue={tournament?.description || 'No description set.'}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Start Date</label>
                                    <input 
                                        type="date" 
                                        readOnly
                                        className="w-full h-12 px-5 rounded-xl border border-white/5 bg-white/5 text-sm font-black uppercase tracking-tighter text-white appearance-none outline-none focus:border-brand-gold transition-all"
                                        defaultValue={tournament?.start_date || ''}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">End Date</label>
                                    <input 
                                        type="date" 
                                        readOnly
                                        className="w-full h-12 px-5 rounded-xl border border-white/5 bg-white/5 text-sm font-black uppercase tracking-tighter text-white appearance-none outline-none focus:border-brand-gold transition-all"
                                        defaultValue={tournament?.end_date || ''}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/[0.08] group">
                         <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-brand-gold">Application Platform</h3>
                         <div className="flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                 <div className="h-10 w-10 flex items-center justify-center rounded bg-brand-gold text-black">
                                     <span className="text-xs font-black uppercase">E</span>
                                 </div>
                                 <div>
                                     <div className="text-xs font-black uppercase tracking-widest text-white">Elite League OS</div>
                                     <div className="text-[10px] font-medium text-zinc-500">v1.24.4 (LATEST)</div>
                                 </div>
                             </div>
                             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                         </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Admin Users */}
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-brand-gold">Access Management</h3>
                        <div className="space-y-4">
                            <AdminUserItem name="Admin User" role="System Administrator" primary />
                        </div>
                        <button className="mt-8 w-full border border-white/5 bg-white/5 h-12 flex items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all transform active:scale-95">Add Administrator</button>
                    </div>

                    {/* DANGER ZONE */}
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-xl">
                         <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-red-500">System Danger Zone</h3>
                         <div className="space-y-4">
                             <button className="w-full h-12 px-6 rounded-xl border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all transform active:scale-95">Reset Season Data</button>
                             <button className="w-full h-12 px-6 rounded-xl border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all transform active:scale-95">Pause Registration</button>
                         </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function AdminUserItem({ name, role, primary = false }: { name: string; role: string; primary?: boolean }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-brand-gold" />
                </div>
                <div>
                    <div className="text-xs font-black uppercase tracking-tighter text-white">{name}</div>
                    <div className="text-[10px] font-medium text-zinc-500">{role}</div>
                </div>
            </div>
            {primary && (
                <span className="text-[8px] font-black px-1.5 py-0.5 rounded border border-brand-gold text-brand-gold uppercase">Super</span>
            )}
        </div>
    );
}
