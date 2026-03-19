import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { store } from '@/actions/App/Http/Controllers/RegistrationController';
import type { Division } from '@/types';
import LandingLayout from '../../Layouts/LandingLayout';
import { cn } from '../../lib/utils';

interface Props {
    divisions: Division[];
}

export default function Create({ divisions }: Props) {
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
        <LandingLayout>
            <Head title="Register Your Team" />

            <div className="mx-auto max-w-2xl px-6 py-20">
                {/* Progress Indicator */}
                <div className="mb-12">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-[10px] font-black tracking-widest text-brand-gold uppercase">
                            Step {step} of 3
                        </span>
                        <span className="text-[10px] font-black tracking-widest text-zinc-600 uppercase">
                            {step === 1
                                ? 'Team Details'
                                : step === 2
                                  ? 'Player Roster'
                                  : 'Verification'}
                        </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full border border-white/5 bg-zinc-900">
                        <div
                            className="h-full bg-brand-gold shadow-[0_0_15px_rgba(188,166,115,0.5)] transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-12">
                    {/* STEP 1: TEAM DETAILS */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="mb-8 text-3xl font-black tracking-tighter uppercase sm:text-4xl">
                                Establish your{' '}
                                <span className="text-brand-gold">
                                    Identity.
                                </span>
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                                        Team Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.team_name}
                                        onChange={(e) =>
                                            setData('team_name', e.target.value)
                                        }
                                        className="w-full rounded border border-white/5 bg-zinc-900/50 p-4 text-white outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20"
                                        placeholder="e.g. Manila Warriors"
                                    />
                                    {errors.team_name && (
                                        <p className="mt-2 text-xs font-bold text-red-500">
                                            {errors.team_name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                                        Select Division
                                    </label>
                                    <select
                                        value={data.division_id}
                                        onChange={(e) =>
                                            setData(
                                                'division_id',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded border border-white/5 bg-zinc-900/50 p-4 text-white outline-none focus:border-brand-gold/50"
                                    >
                                        <option value="">
                                            Choose a division
                                        </option>
                                        {finalDivisions.map((d) => (
                                            <option key={d.id} value={d.id}>
                                                {d.name}
                                                {d.registration_fee
                                                    ? ` (₱${d.registration_fee})`
                                                    : ''}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.division_id && (
                                        <p className="mt-2 text-xs font-bold text-red-500">
                                            {errors.division_id}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                                            Coach Name
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
                                            className="w-full rounded border border-white/5 bg-zinc-900/50 p-4 text-white outline-none focus:border-brand-gold/50"
                                            placeholder="Head Coach"
                                        />
                                        {errors.coach_name && (
                                            <p className="mt-2 text-xs font-bold text-red-500">
                                                {errors.coach_name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                                            Contact Number
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
                                            className="w-full rounded border border-white/5 bg-zinc-900/50 p-4 text-white outline-none focus:border-brand-gold/50"
                                            placeholder="09xx xxx xxxx"
                                        />
                                        {errors.contact_number && (
                                            <p className="mt-2 text-xs font-bold text-red-500">
                                                {errors.contact_number}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="mt-12 w-full rounded bg-brand-gold py-4 text-xs font-black tracking-widest text-black uppercase shadow-lg shadow-brand-gold/20 hover:bg-brand-gold-glow"
                            >
                                Continue to Roster
                            </button>
                        </div>
                    )}

                    {/* STEP 2: PLAYER ROSTER */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-8 flex items-center justify-between">
                                <h2 className="text-3xl font-black tracking-tighter uppercase sm:text-4xl">
                                    Assemble your{' '}
                                    <span className="text-brand-gold">
                                        Roster.
                                    </span>
                                </h2>
                                <span
                                    className={cn(
                                        'rounded border bg-zinc-900 px-3 py-1 text-[10px] font-black uppercase',
                                        data.players.length < 5
                                            ? 'border-red-500/20 text-red-500'
                                            : 'border-brand-gold/20 text-brand-gold',
                                    )}
                                >
                                    {data.players.length} / 12 Players
                                </span>
                            </div>

                            <div className="space-y-6">
                                {data.players.map((player, index) => (
                                    <div
                                        key={index}
                                        className="relative rounded-xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/[0.07]"
                                    >
                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                                                Player #{index + 1}
                                            </span>
                                            {data.players.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removePlayer(index)
                                                    }
                                                    className="text-xs font-bold text-zinc-500 transition-colors hover:text-red-500"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div className="sm:col-span-2">
                                                <label className="mb-2 block text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                                                    Full Name
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
                                                    className="w-full border-b border-white/10 bg-transparent py-2 text-sm text-white outline-none focus:border-brand-gold"
                                                    placeholder="As seen on PSA"
                                                />
                                                {errors[
                                                    `players.${index}.name` as any
                                                ] && (
                                                    <p className="mt-1 text-[10px] font-bold text-red-500">
                                                        {
                                                            errors[
                                                                `players.${index}.name` as any
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                                                    Jersey #
                                                </label>
                                                <input
                                                    type="text"
                                                    value={player.jersey_number}
                                                    onChange={(e) =>
                                                        handlePlayerChange(
                                                            index,
                                                            'jersey_number',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full border-b border-white/10 bg-transparent py-2 text-sm text-white outline-none focus:border-brand-gold"
                                                    placeholder="00"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                                                    Position
                                                </label>
                                                <select
                                                    value={player.position}
                                                    onChange={(e) =>
                                                        handlePlayerChange(
                                                            index,
                                                            'position',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full border-b border-white/10 bg-transparent py-2 text-sm text-white outline-none focus:border-brand-gold"
                                                >
                                                    <option
                                                        value=""
                                                        className="bg-zinc-900"
                                                    >
                                                        Position
                                                    </option>
                                                    <option
                                                        value="PG"
                                                        className="bg-zinc-900"
                                                    >
                                                        Point Guard
                                                    </option>
                                                    <option
                                                        value="SG"
                                                        className="bg-zinc-900"
                                                    >
                                                        Shooting Guard
                                                    </option>
                                                    <option
                                                        value="SF"
                                                        className="bg-zinc-900"
                                                    >
                                                        Small Forward
                                                    </option>
                                                    <option
                                                        value="PF"
                                                        className="bg-zinc-900"
                                                    >
                                                        Power Forward
                                                    </option>
                                                    <option
                                                        value="C"
                                                        className="bg-zinc-900"
                                                    >
                                                        Center
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {data.players.length < 12 && (
                                    <button
                                        type="button"
                                        onClick={addPlayer}
                                        className="w-full rounded border border-dashed border-white/10 py-6 text-xs font-bold tracking-widest text-zinc-500 transition-all hover:border-brand-gold/30 hover:text-brand-gold"
                                    >
                                        + Add Another Player
                                    </button>
                                )}
                            </div>

                            <div className="mt-12 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex-1 rounded border border-white/10 py-4 text-xs font-black tracking-widest text-white uppercase hover:bg-white/5"
                                >
                                    Go Back
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className={cn(
                                        'flex-[2] rounded py-4 text-xs font-black tracking-widest text-black uppercase shadow-lg transition-all',
                                        data.players.length >= 5
                                            ? 'bg-brand-gold shadow-brand-gold/20 hover:bg-brand-gold-glow'
                                            : 'cursor-not-allowed bg-zinc-800 text-zinc-500',
                                    )}
                                >
                                    Confirm Roster
                                </button>
                            </div>
                            {data.players.length < 5 && (
                                <p className="mt-4 text-center text-[10px] font-bold tracking-widest text-red-400 uppercase">
                                    Minimum 5 players required to proceed
                                </p>
                            )}
                        </div>
                    )}

                    {/* STEP 3: CONFIRMATION & COMPLIANCE */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="mb-8 text-3xl font-black tracking-tighter text-brand-gold uppercase sm:text-4xl">
                                Validation{' '}
                                <span className="text-white">Gate.</span>
                            </h2>

                            <div className="relative overflow-hidden rounded-2xl border border-brand-gold/30 bg-zinc-900 p-8 shadow-2xl">
                                <div className="absolute top-0 right-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-[80px]" />

                                <div className="mb-8 flex items-start gap-6">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-brand-gold text-black shadow-lg">
                                        <svg
                                            className="h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.5"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-black tracking-tighter text-white uppercase">
                                            Attention Coach!
                                        </h3>
                                        <p className="text-sm leading-relaxed font-medium text-zinc-400">
                                            To maintain the integrity of the
                                            league, all teams MUST present the
                                            following documents during the
                                            orientation:
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-10 space-y-4">
                                    <div className="flex items-center gap-4 rounded border border-white/5 bg-black/20 p-4">
                                        <input
                                            type="checkbox"
                                            checked={data.agreed_to_terms}
                                            onChange={(e) =>
                                                setData(
                                                    'agreed_to_terms',
                                                    e.target.checked,
                                                )
                                            }
                                            id="psa"
                                            className="h-5 w-5 rounded border-white/10 bg-zinc-800 text-brand-gold focus:ring-brand-gold"
                                        />
                                        <label
                                            htmlFor="psa"
                                            className="text-sm font-bold tracking-tight text-white/90"
                                        >
                                            I agree to bring{' '}
                                            <span className="text-brand-gold">
                                                Original PSA Birth Certificates
                                            </span>{' '}
                                            for my players.
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-4 rounded border border-white/5 bg-black/20 p-4">
                                        <input
                                            type="checkbox"
                                            checked={data.agreed_to_terms}
                                            onChange={(e) =>
                                                setData(
                                                    'agreed_to_terms',
                                                    e.target.checked,
                                                )
                                            }
                                            id="ids"
                                            className="h-5 w-5 rounded border-white/10 bg-zinc-800 text-brand-gold focus:ring-brand-gold"
                                        />
                                        <label
                                            htmlFor="ids"
                                            className="text-sm font-bold tracking-tight text-white/90"
                                        >
                                            I agree that all players will bring{' '}
                                            <span className="text-brand-gold">
                                                Valid Government-issued IDs
                                            </span>
                                            .
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-10 rounded-lg border border-brand-gold/20 bg-brand-gold/10 p-4">
                                    <p className="text-[11px] leading-relaxed font-bold tracking-widest text-brand-gold-glow uppercase">
                                        CRITICAL: SUBMISSION OF FAKE OR ALTERED
                                        DOCUMENTS WILL RESULT IN PERMANENT
                                        DISQUALIFICATION AND FORFEITURE OF
                                        REGISTRATION FEES.
                                    </p>
                                </div>

                                {errors.agreed_to_terms && (
                                    <p className="mb-4 text-xs font-black tracking-widest text-red-500 uppercase">
                                        {errors.agreed_to_terms}
                                    </p>
                                )}

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="flex-1 rounded border border-white/10 py-4 text-xs font-black tracking-widest text-white uppercase hover:bg-white/5"
                                    >
                                        Edit Roster
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={
                                            processing || !data.agreed_to_terms
                                        }
                                        className={cn(
                                            'flex-[2] rounded py-4 text-xs font-black tracking-widest text-black uppercase shadow-lg transition-all',
                                            data.agreed_to_terms
                                                ? 'bg-brand-gold shadow-brand-gold/20 hover:bg-brand-gold-glow'
                                                : 'cursor-not-allowed bg-zinc-800 text-zinc-500',
                                        )}
                                    >
                                        {processing
                                            ? 'Processing...'
                                            : 'Complete Registration'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </LandingLayout>
    );
}
