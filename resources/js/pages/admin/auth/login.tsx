import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#020617] p-4 text-zinc-100 font-sans antialiased">
            <Head title="Admin Login" />

            <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Logo Area */}
                <div className="mb-12 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold text-black shadow-2xl shadow-brand-gold/20">
                        <span className="text-2xl font-black">E</span>
                    </div>
                    <h1 className="text-xl font-black tracking-widest uppercase">Elite <span className="text-brand-gold">Console</span></h1>
                    <p className="mt-2 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Management Access</p>
                </div>

                <div className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 px-1">Email Address</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full h-14 px-6 rounded-2xl border border-white/5 bg-white/5 text-sm font-bold text-white outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 transition-all"
                                placeholder="name@example.com"
                                required
                            />
                            {errors.email && (
                                <p className="mt-2 text-[10px] font-black uppercase text-red-500 px-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 px-1">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full h-14 px-6 rounded-2xl border border-white/5 bg-white/5 text-sm font-bold text-white outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 transition-all"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && (
                                <p className="mt-2 text-[10px] font-black uppercase text-red-500 px-1">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-14 bg-brand-gold hover:bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg shadow-brand-gold/10 transition-all transform active:scale-[0.98] disabled:opacity-50"
                        >
                            {processing ? 'Authenticating...' : 'Enter Console'}
                        </button>
                    </form>
                </div>

                <div className="mt-12 flex justify-center">
                    <a href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors">Return to Landing</a>
                </div>
            </div>
        </div>
    );
}
