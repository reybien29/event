import { Head, Link } from '@inertiajs/react';
import LandingLayout from '../../Layouts/LandingLayout';

interface Props {
    reference: string;
}

export default function Success({ reference }: Props) {
    return (
        <LandingLayout>
            <Head title="Registration Successful" />

            <div className="mx-auto max-w-2xl px-6 py-32 text-center">
                <div className="mb-12 flex flex-col items-center">
                    <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-brand-gold text-black shadow-2xl shadow-brand-gold/30">
                        <svg
                            className="h-12 w-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.2em] text-brand-gold uppercase">
                        Transaction Complete
                    </span>
                    <h1 className="text-4xl font-black tracking-tighter uppercase sm:text-6xl">
                        Victory{' '}
                        <span className="text-brand-gold italic">Awaits.</span>
                    </h1>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-12 shadow-2xl backdrop-blur-3xl">
                    <p className="mb-8 text-sm leading-relaxed font-medium text-zinc-400">
                        Your registration has been submitted and is currently{' '}
                        <span className="font-black text-white underline">
                            Pending Verification.
                        </span>
                        Please secure your reference number and proceed to
                        payment to finalize your slot.
                    </p>

                    <div className="mb-12 flex flex-col items-center gap-2">
                        <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                            Registration ID
                        </span>
                        <div className="text-4xl font-black tracking-tighter text-brand-gold tabular-nums drop-shadow-lg">
                            {reference}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <button className="flex h-16 items-center justify-center rounded bg-brand-gold text-xs font-black tracking-[0.2em] text-black uppercase shadow-lg shadow-brand-gold/20 transition-all hover:scale-105 hover:bg-brand-gold-glow active:scale-95">
                            Pay with GCash
                        </button>
                        <button className="flex h-16 items-center justify-center rounded border border-white/10 bg-white/5 text-xs font-black tracking-[0.2em] text-white uppercase backdrop-blur-md transition-all hover:bg-white/10 active:scale-95">
                            Bank Transfer
                        </button>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-6">
                    <Link
                        href="/"
                        className="text-xs font-bold tracking-widest text-zinc-500 uppercase transition-colors hover:text-brand-gold"
                    >
                        Return to Homepage
                    </Link>
                    <p className="text-[10px] font-bold text-zinc-700 uppercase italic">
                        Our team will contact you via mobile within 48 hours for
                        document verification.
                    </p>
                </div>
            </div>
        </LandingLayout>
    );
}
