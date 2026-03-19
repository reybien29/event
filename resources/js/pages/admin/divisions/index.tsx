import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import {
    show,
    store,
} from '@/actions/App/Http/Controllers/Admin/DivisionController';
import { BentoCard, BentoGrid } from '@/Components/ui/bento';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Division {
    id: number;
    name: string;
    registration_fee: number;
    teams_count?: number;
    games_count?: number;
}

interface Tournament {
    id: number;
    name: string;
}

interface Props {
    divisions: Division[];
    active_tournament?: Tournament | null;
}

export default function DivisionsIndex({
    divisions,
    active_tournament,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        registration_fee: '0',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(store.url(), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout title="Division Management">
            <Head title="Divisions" />

            <BentoGrid className="items-start">
                <BentoCard
                    className="md:col-span-12 xl:col-span-4"
                    padding="lg"
                    variant="accent"
                    glow
                >
                    <form onSubmit={submit}>
                        <div className="mb-6">
                            <h3 className="text-sm font-black tracking-widest text-brand-gold uppercase">
                                Create Division
                            </h3>
                            <p className="mt-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                {active_tournament
                                    ? `Adding divisions to ${active_tournament.name}.`
                                    : 'Create an active tournament first to enable division management.'}
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="mb-2 block text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                    Division Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(event) =>
                                        setData('name', event.target.value)
                                    }
                                    className="h-12 w-full rounded-xl border border-white/5 bg-white/5 px-5 text-sm font-black tracking-tighter text-white uppercase transition-all outline-none focus:border-brand-gold"
                                    placeholder="Under 18"
                                    disabled={!active_tournament || processing}
                                />
                                {errors.name ? (
                                    <p className="mt-2 text-xs font-bold text-red-400">
                                        {errors.name}
                                    </p>
                                ) : null}
                            </div>

                            <div>
                                <label className="mb-2 block text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                    Registration Fee
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.registration_fee}
                                    onChange={(event) =>
                                        setData(
                                            'registration_fee',
                                            event.target.value,
                                        )
                                    }
                                    className="h-12 w-full rounded-xl border border-white/5 bg-white/5 px-5 text-sm font-black tracking-tight text-white transition-all outline-none focus:border-brand-gold"
                                    placeholder="3500"
                                    disabled={!active_tournament || processing}
                                />
                                {errors.registration_fee ? (
                                    <p className="mt-2 text-xs font-bold text-red-400">
                                        {errors.registration_fee}
                                    </p>
                                ) : null}
                            </div>

                            <button
                                type="submit"
                                disabled={!active_tournament || processing}
                                className="flex h-12 w-full items-center justify-center rounded-xl bg-brand-gold text-[10px] font-black tracking-[0.25em] text-black uppercase shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold-glow disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? 'Creating...' : 'Create Division'}
                            </button>
                        </div>
                    </form>
                </BentoCard>

                <BentoCard
                    className="md:col-span-12 xl:col-span-8"
                    padding="lg"
                    variant="default"
                >
                    <div className="mb-6 flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-sm font-black tracking-widest uppercase">
                                Division Library
                            </h3>
                            <p className="mt-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                View a division to edit details, manage teams,
                                and AI-generate its bracket schedule.
                            </p>
                        </div>
                        <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                            {divisions.length} Total
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {divisions.map((division) => (
                            <Link
                                key={division.id}
                                href={show.url(division.id)}
                                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#060d1b] p-6 transition-all hover:scale-[1.02] hover:border-brand-gold/30 hover:bg-white/[0.08]"
                            >
                                <div className="absolute top-0 right-0 p-5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-xs font-black tracking-tight uppercase shadow-inner transition-all group-hover:bg-brand-gold group-hover:text-black">
                                        {division.teams_count || 0}
                                    </div>
                                </div>

                                <div className="mt-8 space-y-3">
                                    <h4 className="text-xl font-black tracking-tighter text-white uppercase transition-colors group-hover:text-brand-gold">
                                        {division.name}
                                    </h4>
                                    <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                        Fee:{' '}
                                        {formatCurrency(
                                            division.registration_fee,
                                        )}
                                    </p>
                                    <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                        {division.games_count || 0} scheduled
                                        bracket games
                                    </p>
                                </div>

                                <div className="mt-6 flex items-center gap-4">
                                    <div className="h-px flex-1 bg-white/5" />
                                    <span className="text-[10px] font-black tracking-widest text-brand-gold uppercase">
                                        View Division
                                    </span>
                                </div>
                            </Link>
                        ))}

                        {divisions.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase md:col-span-2">
                                No divisions created yet.
                            </div>
                        ) : null}
                    </div>
                </BentoCard>
            </BentoGrid>
        </AdminLayout>
    );
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'PHP',
        maximumFractionDigits: 2,
    }).format(value || 0);
}
