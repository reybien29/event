import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { update } from '@/actions/App/Http/Controllers/Admin/SettingController';
import { BentoCard, BentoGrid } from '@/Components/ui/bento';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Tournament {
    id?: number;
    name?: string | null;
    description?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    status?: string | null;
}

interface Props {
    tournament?: Tournament | null;
}

export default function SettingsIndex({ tournament }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: tournament?.name ?? '',
        description: tournament?.description ?? '',
        start_date: tournament?.start_date ?? '',
        end_date: tournament?.end_date ?? '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put(update.url());
    };

    return (
        <AdminLayout title="System Settings">
            <Head title="Settings" />

            <BentoGrid className="max-w-6xl items-start">
                <div className="grid gap-6 md:col-span-12 xl:col-span-7">
                    <BentoCard padding="lg" variant="default">
                        <form onSubmit={submit}>
                            <div className="mb-6 flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-sm font-black tracking-widest text-brand-gold uppercase">
                                        Active Tournament
                                    </h3>
                                    <p className="mt-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                        Landing page title, description, and
                                        deadline copy now sync from this form.
                                    </p>
                                </div>
                                <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-[10px] font-black tracking-widest text-brand-gold uppercase">
                                    {tournament?.status ?? 'active'}
                                </span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                        Tournament Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(event) =>
                                            setData('name', event.target.value)
                                        }
                                        className="h-12 w-full rounded-xl border border-white/5 bg-white/5 px-5 text-sm font-black tracking-tighter text-white uppercase transition-all outline-none focus:border-brand-gold"
                                        placeholder="Elite Basketball League 2026"
                                    />
                                    {errors.name ? (
                                        <p className="mt-2 text-xs font-bold text-red-400">
                                            {errors.name}
                                        </p>
                                    ) : null}
                                </div>

                                <div>
                                    <label className="mb-2 block text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                        Description
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(event) =>
                                            setData(
                                                'description',
                                                event.target.value,
                                            )
                                        }
                                        className="h-32 w-full rounded-xl border border-white/5 bg-white/5 px-5 py-4 text-sm leading-relaxed font-medium text-zinc-300 transition-all outline-none focus:border-brand-gold"
                                        placeholder="Describe the active tournament experience."
                                    />
                                    {errors.description ? (
                                        <p className="mt-2 text-xs font-bold text-red-400">
                                            {errors.description}
                                        </p>
                                    ) : null}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 block text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            value={data.start_date}
                                            onChange={(event) =>
                                                setData(
                                                    'start_date',
                                                    event.target.value,
                                                )
                                            }
                                            className="h-12 w-full rounded-xl border border-white/5 bg-white/5 px-5 text-sm font-black tracking-tighter text-white uppercase transition-all outline-none focus:border-brand-gold"
                                        />
                                        {errors.start_date ? (
                                            <p className="mt-2 text-xs font-bold text-red-400">
                                                {errors.start_date}
                                            </p>
                                        ) : null}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            value={data.end_date}
                                            onChange={(event) =>
                                                setData(
                                                    'end_date',
                                                    event.target.value,
                                                )
                                            }
                                            className="h-12 w-full rounded-xl border border-white/5 bg-white/5 px-5 text-sm font-black tracking-tighter text-white uppercase transition-all outline-none focus:border-brand-gold"
                                        />
                                        {errors.end_date ? (
                                            <p className="mt-2 text-xs font-bold text-red-400">
                                                {errors.end_date}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex h-12 w-full items-center justify-center rounded-xl bg-brand-gold text-[10px] font-black tracking-[0.25em] text-black uppercase shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold-glow disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {processing
                                        ? 'Saving...'
                                        : 'Save Active Tournament'}
                                </button>
                            </div>
                        </form>
                    </BentoCard>

                    <BentoCard padding="lg" variant="subtle">
                        <h3 className="mb-6 text-sm font-black tracking-widest text-brand-gold uppercase">
                            Application Platform
                        </h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-gold text-black">
                                    <span className="text-xs font-black uppercase">
                                        E
                                    </span>
                                </div>
                                <div>
                                    <div className="text-xs font-black tracking-widest text-white uppercase">
                                        Elite League OS
                                    </div>
                                    <div className="text-[10px] font-medium text-zinc-500">
                                        Live Settings Sync Enabled
                                    </div>
                                </div>
                            </div>
                            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                        </div>
                    </BentoCard>
                </div>

                <div className="grid gap-6 md:col-span-12 xl:col-span-5">
                    <BentoCard padding="lg" variant="accent" glow>
                        <h3 className="mb-6 text-sm font-black tracking-widest text-brand-gold uppercase">
                            Sync Preview
                        </h3>
                        <div className="space-y-5">
                            <PreviewItem
                                label="Landing Title"
                                value={data.name || 'No tournament title yet'}
                            />
                            <PreviewItem
                                label="Landing Description"
                                value={data.description || 'No description yet'}
                            />
                            <PreviewItem
                                label="Tournament Window"
                                value={formatDateRange(
                                    data.start_date,
                                    data.end_date,
                                )}
                            />
                        </div>
                    </BentoCard>

                    <BentoCard padding="lg" variant="danger">
                        <h3 className="mb-6 text-sm font-black tracking-widest text-red-400 uppercase">
                            System Note
                        </h3>
                        <p className="text-sm leading-relaxed font-medium text-red-100/80">
                            Schedule generation is available, and
                            the Teams menu can now regenerate randomized
                            elimination brackets for all registered teams
                            at once.
                        </p>
                    </BentoCard>
                </div>
            </BentoGrid>
        </AdminLayout>
    );
}

function PreviewItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                {label}
            </div>
            <div className="mt-2 text-sm leading-relaxed font-semibold text-white">
                {value}
            </div>
        </div>
    );
}

function formatDateRange(
    startDate?: string | null,
    endDate?: string | null,
): string {
    if (!startDate && !endDate) {
        return 'No tournament dates configured yet.';
    }

    if (startDate && endDate) {
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }

    return formatDate(startDate ?? endDate ?? '');
}

function formatDate(value: string): string {
    if (!value) {
        return 'TBD';
    }

    return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}
