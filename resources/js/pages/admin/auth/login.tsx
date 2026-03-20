import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { BentoCard, BentoGrid } from '@/Components/ui/bento';

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
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(188,166,115,0.14),transparent_24%),linear-gradient(180deg,#09090b_0%,#0a0a0a_100%)] p-4 font-sans text-zinc-100 antialiased">
            <Head title="Admin Login" />

            <div className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-4xl duration-700">
                <BentoGrid className="items-stretch">
                    <BentoCard
                        className="md:col-span-12 lg:col-span-5"
                        padding="lg"
                        variant="accent"
                        glow
                    >
                        <div className="flex h-full flex-col justify-between gap-8">
                            <div>
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-gold text-black shadow-2xl shadow-brand-gold/20">
                                    <span className="text-2xl font-black">
                                        E
                                    </span>
                                </div>
                                <h1 className="text-3xl font-black tracking-[-0.04em] uppercase">
                                    Elite{' '}
                                    <span className="text-brand-gold">
                                        Console
                                    </span>
                                </h1>
                                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                                    Secure access for tournament operations,
                                    tournament configuration, standings updates, and
                                    schedule oversight.
                                </p>
                            </div>

                            <div className="rounded-[1.5rem] border border-white/10 bg-black/18 p-5">
                                <div className="text-[10px] font-black tracking-[0.24em] text-brand-gold uppercase">
                                    Management Access
                                </div>
                                <div className="mt-2 text-sm text-zinc-300">
                                    Sign in with your administrator account to
                                    continue.
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    <BentoCard
                        className="md:col-span-12 lg:col-span-7"
                        padding="lg"
                        variant="default"
                    >
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="mb-2 block px-1 text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="h-14 w-full rounded-2xl border border-white/5 bg-white/5 px-6 text-sm font-bold text-white transition-all outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20"
                                    placeholder="name@example.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-2 px-1 text-[10px] font-black text-red-500 uppercase">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block px-1 text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className="h-14 w-full rounded-2xl border border-white/5 bg-white/5 px-6 text-sm font-bold text-white transition-all outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-2 px-1 text-[10px] font-black text-red-500 uppercase">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="h-14 w-full rounded-2xl bg-brand-gold text-xs font-black tracking-widest text-black uppercase shadow-lg shadow-brand-gold/10 transition-all hover:bg-brand-gold-glow active:scale-[0.98] disabled:opacity-50"
                            >
                                {processing
                                    ? 'Authenticating...'
                                    : 'Enter Console'}
                            </button>
                        </form>

                        <div className="mt-10 flex justify-center">
                            <a
                                href="/"
                                className="text-[10px] font-black tracking-[0.2em] text-zinc-600 uppercase transition-colors hover:text-white"
                            >
                                Return to Landing
                            </a>
                        </div>
                    </BentoCard>
                </BentoGrid>
            </div>
        </div>
    );
}
