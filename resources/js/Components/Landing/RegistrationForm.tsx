import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { store } from '@/actions/App/Http/Controllers/RegistrationController';
import {
    BentoCard,
    BentoGrid,
    BentoHeading,
    BentoMetric,
} from '@/Components/ui/bento';
import type { Division } from '@/types';
import { cn } from '../../lib/utils';

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

    /* Shared input class — large tap target, no iOS zoom (font-size ≥ 16px) */
    const inputCls = cn(
        'w-full rounded-xl border border-white/10 bg-zinc-950/60',
        'px-5 py-4 text-base font-bold text-white outline-none',
        'min-h-[56px] transition-all',
        'placeholder:font-normal placeholder:text-zinc-600',
        'focus:border-brand-gold/50 focus:ring-4 focus:ring-brand-gold/5',
    );

    return (
        <div id="register" className="relative overflow-x-clip">
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-full w-[min(100%,56rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/5 blur-[120px]" />

            <div className="mx-auto max-w-7xl">
                <BentoGrid className="items-start">
                    <BentoCard
                        className="md:col-span-12 lg:sticky lg:top-28 lg:col-span-4"
                        padding="lg"
                        variant="accent"
                        glow
                    >
                        <div className="space-y-8">
                            <BentoHeading
                                eyebrow="Official Entry Form"
                                title={
                                    <>
                                        Register Your{' '}
                                        <span className="text-brand-gold italic">
                                            Legacy.
                                        </span>
                                    </>
                                }
                                description={
                                    <>
                                        Join the tournament with one fee of{' '}
                                        <span className="font-black text-white">
                                            {fixedFee}
                                        </span>{' '}
                                        and move through a guided three-phase
                                        entry flow.
                                    </>
                                }
                            />

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                                <BentoMetric
                                    label="Current Phase"
                                    value={`0${step}`}
                                    helper={
                                        step === 1
                                            ? 'Command and team details'
                                            : step === 2
                                              ? 'Personnel roster setup'
                                              : 'Final compliance review'
                                    }
                                    className="border-brand-gold/15 bg-brand-gold/6"
                                    valueClassName="text-brand-gold"
                                />
                                <BentoMetric
                                    label="Roster Count"
                                    value={`${data.players.length}/12`}
                                    helper="Minimum of 5 players required before verification."
                                />
                                <BentoMetric
                                    label="Divisions"
                                    value={finalDivisions.length}
                                    helper="Live division choices sync from the platform."
                                />
                            </div>

                            <div className="rounded-[1.5rem] border border-white/10 bg-black/18 p-5">
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <span className="text-[10px] font-black tracking-[0.24em] text-zinc-500 uppercase">
                                        Submission Progress
                                    </span>
                                    <span className="text-sm font-black text-brand-gold">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    {[1, 2, 3].map((s) => (
                                        <div
                                            key={s}
                                            className={cn(
                                                'h-2 flex-1 rounded-full transition-all duration-500',
                                                s <= step
                                                    ? 'bg-brand-gold shadow-[0_0_10px_rgba(188,166,115,0.45)]'
                                                    : 'bg-zinc-800',
                                            )}
                                        />
                                    ))}
                                </div>
                                <div className="mt-5 space-y-3">
                                    {[
                                        'Command & Team Info',
                                        'Personnel Roster',
                                        'Verification Gate',
                                    ].map((label, index) => (
                                        <div
                                            key={label}
                                            className="flex items-center gap-3"
                                        >
                                            <span
                                                className={cn(
                                                    'flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-black',
                                                    index + 1 <= step
                                                        ? 'border-brand-gold/30 bg-brand-gold text-black'
                                                        : 'border-white/10 bg-white/5 text-zinc-500',
                                                )}
                                            >
                                                {index + 1}
                                            </span>
                                            <span
                                                className={cn(
                                                    'text-sm font-semibold',
                                                    index + 1 <= step
                                                        ? 'text-white'
                                                        : 'text-zinc-500',
                                                )}
                                            >
                                                {label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    <BentoCard
                        className="md:col-span-12 lg:col-span-8"
                        padding="lg"
                        variant="default"
                    >
                        <div className="mb-12">
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black tracking-widest text-brand-gold uppercase">
                                        Phase {step} of 3
                                    </span>
                                    <span className="text-xl font-black tracking-tighter text-white uppercase">
                                        {step === 1
                                            ? 'Command & Team Info'
                                            : step === 2
                                              ? 'Personnel Roster'
                                              : 'Verification Gate'}
                                    </span>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-zinc-950 text-xs font-black text-brand-gold shadow-inner">
                                    {Math.round(progress)}%
                                </div>
                            </div>
                            <div className="flex gap-1.5">
                                {[1, 2, 3].map((s) => (
                                    <div
                                        key={s}
                                        className={cn(
                                            'h-1.5 flex-1 rounded-full transition-all duration-500',
                                            s <= step
                                                ? 'bg-brand-gold shadow-[0_0_8px_rgba(188,166,115,0.5)]'
                                                : 'bg-zinc-800',
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        <form onSubmit={submit}>
                            {/* ══════════════════════════════
                            STEP 1 — TEAM DETAILS
                        ══════════════════════════════ */}
                            {step === 1 && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        {/* Team name */}
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
                                                className={inputCls}
                                                placeholder="Enter Official Team Name"
                                            />
                                            {errors.team_name && (
                                                <p className="mt-3 text-xs font-black tracking-widest text-red-500 uppercase">
                                                    {errors.team_name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Division */}
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
                                                className={cn(
                                                    inputCls,
                                                    'appearance-none',
                                                )}
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

                                        {/* Coach + Contact */}
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
                                                    className={inputCls}
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
                                                    type="tel"
                                                    value={data.contact_number}
                                                    onChange={(e) =>
                                                        setData(
                                                            'contact_number',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={inputCls}
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

                            {/* ══════════════════════════════
                            STEP 2 — PLAYER ROSTER
                        ══════════════════════════════ */}
                            {step === 2 && (
                                <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                                    <div className="space-y-4">
                                        {data.players.map((player, index) => (
                                            <div
                                                key={index}
                                                className="group relative rounded-2xl border border-white/5 bg-zinc-950/30 p-6 transition-all hover:border-brand-gold/20 hover:bg-white/[0.03]"
                                            >
                                                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex h-6 w-6 items-center justify-center rounded bg-brand-gold text-[10px] font-black text-black">
                                                            {index + 1}
                                                        </span>
                                                        <span className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                                                            Personnel #
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                    {data.players.length >
                                                        1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removePlayer(
                                                                    index,
                                                                )
                                                            }
                                                            className="text-[10px] font-black tracking-widest text-zinc-600 uppercase transition-colors hover:text-red-500"
                                                        >
                                                            Relieve
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                                    {/* Full name — spans 2 cols */}
                                                    <div className="sm:col-span-2">
                                                        <label className="mb-2 block text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                                                            Full Name (PSA
                                                            Based)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={player.name}
                                                            onChange={(e) =>
                                                                handlePlayerChange(
                                                                    index,
                                                                    'name',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className={inputCls}
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
                                                    {/* Jersey # */}
                                                    <div>
                                                        <label className="mb-2 block text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                                                            Jersey #
                                                        </label>
                                                        <input
                                                            type="text"
                                                            inputMode="numeric"
                                                            value={
                                                                player.jersey_number
                                                            }
                                                            onChange={(e) =>
                                                                handlePlayerChange(
                                                                    index,
                                                                    'jersey_number',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className={inputCls}
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

                                    {/* Player count indicator */}
                                    <div className="mt-6 flex items-center justify-between rounded-xl border border-white/5 bg-zinc-950/40 px-5 py-3">
                                        <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                            Roster size
                                        </span>
                                        <span
                                            className={cn(
                                                'text-sm font-black tabular-nums',
                                                data.players.length < 5
                                                    ? 'text-red-400'
                                                    : 'text-brand-gold',
                                            )}
                                        >
                                            {data.players.length} / 12
                                            {data.players.length < 5 && (
                                                <span className="ml-2 text-[10px] font-bold tracking-widest text-red-400 uppercase">
                                                    — need{' '}
                                                    {5 - data.players.length}{' '}
                                                    more
                                                </span>
                                            )}
                                        </span>
                                    </div>

                                    <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-8 sm:flex-row">
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
                                </div>
                            )}

                            {/* ══════════════════════════════
                            STEP 3 — CONFIRMATION
                        ══════════════════════════════ */}
                            {step === 3 && (
                                <div className="animate-in fade-in slide-in-from-right-8 overflow-x-clip duration-700">
                                    <div className="relative overflow-hidden rounded-3xl border border-brand-gold/30 bg-zinc-950/80 p-8 shadow-2xl sm:p-10">
                                        <div className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 bg-brand-gold/10 blur-[100px]" />

                                        <div className="mb-10 flex flex-col items-start gap-6 sm:flex-row sm:gap-8">
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

                                        <div className="mb-10 space-y-4">
                                            <label className="group block cursor-pointer transition-all">
                                                <div className="flex items-center gap-5 rounded-2xl border border-white/5 bg-zinc-900/50 p-5 transition-all group-hover:border-brand-gold/20 group-hover:bg-brand-gold/5">
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
                                                        /* Large tap target */
                                                        className="h-6 w-6 shrink-0 cursor-pointer rounded border-white/10 bg-zinc-950 text-brand-gold transition-all focus:ring-brand-gold/30"
                                                    />
                                                    <span className="text-sm font-black tracking-tight text-zinc-300 transition-colors group-hover:text-white">
                                                        I certify that all
                                                        personnel data is
                                                        accurate and matches{' '}
                                                        <span className="text-brand-gold">
                                                            Original PSA
                                                            Certificates
                                                        </span>
                                                        .
                                                    </span>
                                                </div>
                                            </label>

                                            <div className="rounded-2xl border border-brand-gold/10 bg-brand-gold/5 p-5">
                                                <div className="flex gap-4">
                                                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-gold text-[10px] font-black text-black">
                                                        !
                                                    </div>
                                                    <p className="text-[11px] leading-relaxed font-black tracking-[0.1em] text-brand-gold-glow uppercase">
                                                        NOTICE: Submission of
                                                        falsified documentation
                                                        will result in{' '}
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
                                                    'flex-[2.5] rounded-xl py-5 text-xs font-black tracking-[0.2em] text-black uppercase transition-all active:scale-95',
                                                    data.agreed_to_terms
                                                        ? 'bg-brand-gold shadow-2xl shadow-brand-gold/40 hover:bg-brand-gold-glow'
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
                    </BentoCard>
                </BentoGrid>
            </div>
        </div>
    );
}
