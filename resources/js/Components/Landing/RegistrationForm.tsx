import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Division } from '@/types';
import { cn } from '../../lib/utils';
import { store } from '@/actions/App/Http/Controllers/RegistrationController';

interface Props {
    divisions: Division[];
    fixedFee: string;
}

export default function RegistrationForm({ divisions, fixedFee }: Props) {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm({
        team_name: '',
        division_id: '',
        coach_name: '',
        contact_number: '',
        players: [
            { name: '', jersey_number: '', position: '', birth_date: '' },
        ],
        agreed_to_terms: false,
    });

    const [finalDivisions, setFinalDivisions] = useState<Division[]>(divisions);

    useEffect(() => {
        fetch('/api/divisions')
            .then((res) => res.json())
            .then((data) => setFinalDivisions(data))
            .catch((err) => console.error('Failed to fetch divisions', err));
    }, []);

    const addPlayer = () => {
        if (data.players.length < 12) {
            setData('players', [
                ...data.players,
                { name: '', jersey_number: '', position: '', birth_date: '' },
            ]);
        }
    };

    const removePlayer = (index: number) => {
        if (data.players.length > 1) {
            const newPlayers = [...data.players];
            newPlayers.splice(index, 1);
            setData('players', newPlayers);
        }
    };

    const handlePlayerChange = (
        index: number,
        field: string,
        value: string,
    ) => {
        const newPlayers = [...data.players];
        newPlayers[index] = { ...newPlayers[index], [field]: value };
        setData('players', newPlayers);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url);
    };

    const progress = (step / 3) * 100;

    return (
        <div id="register" className="relative overflow-x-clip">
            {/* Background Effects */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-full w-[min(100%,56rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/5 blur-[120px]" />

            <div className="mx-auto max-w-4xl">
                <div className="mb-20 text-center">
                    <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase">
                        Official Entry Form
                    </span>
                    <h2 className="text-4xl font-black tracking-tighter uppercase sm:text-6xl">
                        Register Your{' '}
                        <span className="text-brand-gold italic">Legacy.</span>
                    </h2>
                    <p className="mt-6 text-sm font-medium text-zinc-500">
                        Join the most prestigious basketball tournament in the
                        region. One Fee:{' '}
                        <span className="font-black text-white">
                            {fixedFee}
                        </span>
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-1 shadow-2xl backdrop-blur-3xl md:p-12">
                    {/* Progress Header */}
                    <div className="mb-12 px-6 pt-6 md:p-0">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black tracking-widest text-brand-gold uppercase">
                                    Phase {step} of 3
                                </span>
                                <span className="text-xl font-black tracking-tighter text-white uppercase">
                                    {step === 1
                                        ? 'Command & Team info'
                                        : step === 2
                                          ? 'Personnel Roster'
                                          : 'Verification Gate'}
                                </span>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-zinc-950 text-xs font-black text-brand-gold shadow-inner">
                                {Math.round(progress)}%
                            </div>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full border border-white/5 bg-zinc-900">
                            <div
                                className="h-full bg-brand-gold shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all duration-700 ease-in-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-6 md:p-0">
                        {/* STEP 1: TEAM DETAILS */}
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                                    <div className="md:col-span-2">
                                        <label className="mb-3 block text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                                            Unit / Team Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.team_name}
                                            onChange={(e) =>
                                                setData(
                                                    'team_name',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-white/10 bg-zinc-950/50 p-5 text-sm font-bold text-white transition-all outline-none focus:border-brand-gold/50 focus:ring-4 focus:ring-brand-gold/5"
                                            placeholder="Enter Official Team Name"
                                        />
                                        {errors.team_name && (
                                            <p className="mt-3 text-xs font-black tracking-widest text-red-500 uppercase">
                                                {errors.team_name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                                            Classification / Division
                                        </label>
                                        <select
                                            value={data.division_id}
                                            onChange={(e) =>
                                                setData(
                                                    'division_id',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full appearance-none rounded-xl border border-white/10 bg-zinc-950/50 p-5 text-sm font-bold text-white transition-all outline-none focus:border-brand-gold/50"
                                        >
                                            <option
                                                value=""
                                                className="bg-zinc-900"
                                            >
                                                Select Division
                                            </option>
                                            {finalDivisions.map((d) => (
                                                <option
                                                    key={d.id}
                                                    value={d.id}
                                                    className="bg-zinc-900"
                                                >
                                                    {d.name}
                                                    {d.registration_fee
                                                        ? ` (₱${d.registration_fee})`
                                                        : ''}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.division_id && (
                                            <p className="mt-3 text-xs font-black tracking-widest text-red-500 uppercase">
                                                {errors.division_id}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-2">
                                        <div>
                                            <label className="mb-3 block text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                                                Commanding Officer / Coach
                                            </label>
                                            <input
                                                type="text"
                                                value={data.coach_name}
                                                onChange={(e) =>
                                                    setData(
                                                        'coach_name',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-white/10 bg-zinc-950/50 p-5 text-sm font-bold text-white outline-none focus:border-brand-gold/50"
                                                placeholder="Full Name"
                                            />
                                            {errors.coach_name && (
                                                <p className="mt-3 text-xs font-black tracking-widest text-red-500 uppercase">
                                                    {errors.coach_name}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-3 block text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                                                Direct Comms / Contact
                                            </label>
                                            <input
                                                type="text"
                                                value={data.contact_number}
                                                onChange={(e) =>
                                                    setData(
                                                        'contact_number',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-white/10 bg-zinc-950/50 p-5 text-sm font-bold text-white outline-none focus:border-brand-gold/50"
                                                placeholder="09xx xxx xxxx"
                                            />
                                            {errors.contact_number && (
                                                <p className="mt-3 text-xs font-black tracking-widest text-red-500 uppercase">
                                                    {errors.contact_number}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={
                                        !data.team_name || !data.division_id
                                    }
                                    className="group relative mt-12 flex h-16 w-full items-center justify-center overflow-hidden rounded-xl bg-brand-gold text-xs font-black tracking-[0.2em] text-black uppercase shadow-2xl transition-all hover:scale-[1.02] hover:bg-brand-gold-glow active:scale-95 disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Initialize Personnel Roster
                                        <svg
                                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="3"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        )}

                        {/* STEP 2: PLAYER ROSTER */}
                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                                <div className="space-y-6">
                                    {data.players.map((player, index) => (
                                        <div
                                            key={index}
                                            className="group relative rounded-2xl border border-white/5 bg-zinc-950/30 p-8 transition-all hover:border-brand-gold/20 hover:bg-white/[0.03]"
                                        >
                                            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex h-6 w-6 items-center justify-center rounded bg-brand-gold text-[10px] font-black text-black">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                                                        Personnel #{index + 1}
                                                    </span>
                                                </div>
                                                {data.players.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removePlayer(index)
                                                        }
                                                        className="text-[10px] font-black tracking-widest text-zinc-600 uppercase transition-colors hover:text-red-500"
                                                    >
                                                        Relieve
                                                    </button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                                                <div className="sm:col-span-2">
                                                    <label className="mb-3 block text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                                                        Full Name (PSA Based)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={player.name}
                                                        onChange={(e) =>
                                                            handlePlayerChange(
                                                                index,
                                                                'name',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full border-b border-white/10 bg-transparent py-3 text-sm font-bold text-white transition-all outline-none focus:border-brand-gold"
                                                        placeholder="Enter Player Name"
                                                    />
                                                    {errors[
                                                        `players.${index}.name` as any
                                                    ] && (
                                                        <p className="mt-2 text-[10px] font-bold text-red-500 uppercase">
                                                            {
                                                                errors[
                                                                    `players.${index}.name` as any
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="mb-3 block text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                                                        Unit #
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            player.jersey_number
                                                        }
                                                        onChange={(e) =>
                                                            handlePlayerChange(
                                                                index,
                                                                'jersey_number',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full border-b border-white/10 bg-transparent py-3 text-sm font-bold text-white transition-all outline-none focus:border-brand-gold"
                                                        placeholder="00"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {data.players.length < 12 && (
                                        <button
                                            type="button"
                                            onClick={addPlayer}
                                            className="w-full rounded-2xl border-2 border-dashed border-white/5 py-8 text-xs font-black tracking-[0.2em] text-zinc-600 transition-all hover:border-brand-gold/30 hover:bg-brand-gold/5 hover:text-brand-gold"
                                        >
                                            + Deploy Additional Personnel
                                        </button>
                                    )}
                                </div>

                                <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-12 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 rounded-xl border border-white/10 bg-zinc-950 py-5 text-xs font-black tracking-widest text-white uppercase transition-all hover:bg-white/5"
                                    >
                                        Modify Command
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep(3)}
                                        disabled={data.players.length < 5}
                                        className={cn(
                                            'flex-[2.5] rounded-xl py-5 text-xs font-black tracking-[0.2em] text-black uppercase shadow-2xl transition-all active:scale-95 disabled:opacity-50 disabled:grayscale',
                                            data.players.length >= 5
                                                ? 'bg-brand-gold shadow-brand-gold/30 hover:bg-brand-gold-glow'
                                                : 'bg-zinc-800 text-zinc-600',
                                        )}
                                    >
                                        Proceed to Verification
                                    </button>
                                </div>
                                {data.players.length < 5 && (
                                    <p className="mt-6 animate-pulse text-center text-[10px] font-black tracking-[0.3em] text-red-500 uppercase">
                                        Critical: Minimum 5 units required for
                                        deployment
                                    </p>
                                )}
                            </div>
                        )}

                        {/* STEP 3: CONFIRMATION & COMPLIANCE */}
                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-8 overflow-x-clip duration-700">
                                <div className="shadow-3xl relative overflow-hidden rounded-3xl border border-brand-gold/30 bg-zinc-950/80 p-10">
                                    <div className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 bg-brand-gold/10 blur-[100px]" />

                                    <div className="mb-12 flex flex-col items-start gap-6 sm:flex-row sm:gap-8">
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-gold text-black shadow-2xl shadow-brand-gold/40">
                                            <svg
                                                className="h-8 w-8"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-2xl font-black tracking-tighter text-white uppercase italic">
                                                Integrity Verification.
                                            </h3>
                                            <p className="text-sm leading-relaxed font-medium text-zinc-500">
                                                Finalize your application by
                                                confirming compliance with
                                                league protocols.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-12 space-y-4">
                                        <label className="group block cursor-pointer transition-all">
                                            <div className="flex items-center gap-5 rounded-2xl border border-white/5 bg-zinc-900/50 p-6 transition-all group-hover:border-brand-gold/20 group-hover:bg-brand-gold/5">
                                                <div className="relative flex h-6 w-6 items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            data.agreed_to_terms
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'agreed_to_terms',
                                                                e.target
                                                                    .checked,
                                                            )
                                                        }
                                                        className="peer h-6 w-6 cursor-pointer rounded border-white/10 bg-zinc-950 text-brand-gold transition-all focus:ring-brand-gold/30"
                                                    />
                                                </div>
                                                <span className="text-sm font-black tracking-tight text-zinc-300 transition-colors group-hover:text-white">
                                                    I certify that all personnel
                                                    data is accurate and matches{' '}
                                                    <span className="text-brand-gold">
                                                        Original PSA
                                                        Certificates
                                                    </span>
                                                    .
                                                </span>
                                            </div>
                                        </label>

                                        <div className="rounded-2xl border border-brand-gold/10 bg-brand-gold/5 p-6">
                                            <div className="flex gap-4">
                                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-gold text-[10px] font-black text-black">
                                                    !
                                                </div>
                                                <p className="text-[11px] leading-relaxed font-black tracking-[0.1em] text-brand-gold-glow uppercase">
                                                    NOTICE: Submission of
                                                    falsified documentation will
                                                    result in{' '}
                                                    <span className="border-b border-brand-gold text-white">
                                                        IMMEDIATE
                                                        DISQUALIFICATION
                                                    </span>{' '}
                                                    and legal action.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {errors.agreed_to_terms && (
                                        <p className="mb-6 text-center text-[10px] font-black tracking-widest text-red-500 uppercase">
                                            {errors.agreed_to_terms}
                                        </p>
                                    )}

                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="flex-1 rounded-xl border border-white/10 bg-zinc-950 py-5 font-sans text-xs font-black tracking-widest text-white uppercase transition-all hover:bg-white/5"
                                        >
                                            Review Roster
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={
                                                processing ||
                                                !data.agreed_to_terms
                                            }
                                            className={cn(
                                                'shadow-3xl flex-[2.5] rounded-xl py-5 text-xs font-black tracking-[0.2em] text-black uppercase transition-all active:scale-95',
                                                data.agreed_to_terms
                                                    ? 'bg-brand-gold shadow-brand-gold/40 hover:bg-brand-gold-glow'
                                                    : 'cursor-not-allowed bg-zinc-800 text-zinc-600 grayscale',
                                            )}
                                        >
                                            {processing
                                                ? 'Transmitting...'
                                                : 'Confirm Tournament Entry'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
