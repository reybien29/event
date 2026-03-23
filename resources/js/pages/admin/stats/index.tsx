import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { update as updateStats } from '@/actions/App/Http/Controllers/Admin/StatsController';
import { BentoCard } from '@/Components/ui/bento';
import AdminLayout from '../../../Layouts/AdminLayout';

interface TournamentInfo {
    name?: string | null;
    start_date?: string | null;
    end_date?: string | null;
}

interface TeamStanding {
    group_name?: string | null;
    wins: number;
    losses: number;
    draws: number;
    points: number;
    quotient: number;
    played: number;
}

interface TournamentTeam {
    id: number;
    name: string;
    coach_name: string;
    status: string;
    standing: TeamStanding;
}

interface Tournament {
    id: number;
    name: string;
    teams_count: number;
    start_date: string | null;
    end_date: string | null;
    teams: TournamentTeam[];
}

interface Props {
    tournaments: Tournament[];
}

type FormStanding = {
    team_id: number;
    group_name: string;
    wins: string;
    losses: string;
    draws: string;
    points: string;
    quotient: string;
};

type FormState = {
    standings: FormStanding[];
};

type EditableField = Exclude<keyof FormStanding, 'team_id'>;

export default function StatsIndex({ tournaments }: Props) {
    return (
        <AdminLayout title="Stats Management">
            <Head title="Stats Management" />

            <BentoCard className="mb-8" padding="lg" variant="accent" glow>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-xl font-black tracking-tight text-white uppercase">
                            Manual Standings Control
                        </h2>
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
                            Update tournament standings manually. Save updates to immediately reflect on the dashboard and main page.
                        </p>
                    </div>
                </div>
            </BentoCard>

            {tournaments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                    No tournaments with registered teams are available for
                    standings management yet.
                </div>
            ) : (
                <div className="space-y-8">
                    {tournaments.map((tournament) => (
                        <TournamentStatsCard
                            key={tournament.id}
                            tournament={tournament}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}

function TournamentStatsCard({ tournament }: { tournament: Tournament }) {
    const { data, setData, put, processing, errors } =
        useForm<FormState>({
            standings: tournament.teams.map((team) => ({
                team_id: team.id,
                group_name: team.standing.group_name ?? '',
                wins: team.standing.wins.toString(),
                losses: team.standing.losses.toString(),
                draws: team.standing.draws.toString(),
                points: team.standing.points.toString(),
                quotient: team.standing.quotient.toFixed(4),
            })),
        });

    const updateField = (
        index: number,
        field: EditableField,
        value: string,
    ) => {
        setData(
            'standings',
            data.standings.map((standing, standingIndex) =>
                standingIndex === index
                    ? { ...standing, [field]: value }
                    : standing,
            ),
        );
    };

    const saveStandings = (onSuccess?: () => void) => {
        put(updateStats.url({ tournament: tournament.id }), {
            preserveScroll: true,
            onSuccess,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        saveStandings();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
        >
            <BentoCard padding="md" variant="default">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h3 className="text-sm font-black tracking-widest text-brand-gold uppercase">
                            {tournament.name}
                        </h3>
                        <p className="mt-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                            {tournament.teams_count} teams •{' '}
                            {formatTournamentWindow(tournament)}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-[10px] font-black tracking-[0.2em] text-zinc-100 uppercase transition-all hover:bg-white/[0.06] hover:text-brand-gold disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Saving...' : 'Save Standings'}
                        </button>
                    </div>
                </div>

                <div className="mb-4 rounded-2xl border border-brand-gold/10 bg-brand-gold/5 px-4 py-3 text-[11px] font-semibold tracking-wide text-zinc-300 uppercase">
                    Admin-controlled manual input only. Save updates before
                    leaving this page.
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/5">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-900/40 text-[10px] font-black tracking-widest text-brand-gold uppercase">
                            <tr>
                                <th className="px-4 py-3">Team</th>
                                <th className="px-4 py-3 text-center">Group</th>
                                <th className="px-4 py-3 text-center">W</th>
                                <th className="px-4 py-3 text-center">D</th>
                                <th className="px-4 py-3 text-center">L</th>
                                <th className="px-4 py-3 text-center">Pts</th>
                                <th className="px-4 py-3 text-center">Quot</th>
                                <th className="px-4 py-3 text-center">MP</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-zinc-900/20">
                            {tournament.teams.map((team, index) => {
                                const standing = data.standings[index];
                                const played =
                                    toNumber(standing.wins) +
                                    toNumber(standing.losses) +
                                    toNumber(standing.draws);
                                const rowError = getRowError(
                                    errors as Record<string, string>,
                                    index,
                                );

                                return (
                                    <tr key={team.id} className="transition-colors hover:bg-white/[0.02]">
                                        <td className="px-4 py-3 align-middle">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-bold text-zinc-600">
                                                    {index + 1}
                                                </span>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-white uppercase">
                                                        {team.name}
                                                    </span>
                                                    <span className="mt-0.5 text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
                                                        Coach {team.coach_name}
                                                    </span>
                                                </div>
                                            </div>
                                            {rowError ? (
                                                <div className="mt-2 text-[11px] font-bold text-red-400">
                                                    {rowError}
                                                </div>
                                            ) : null}
                                        </td>
                                        <td className="px-4 py-3 text-center align-middle">
                                            <input
                                                type="text"
                                                value={standing.group_name}
                                                onChange={(event) =>
                                                    updateField(
                                                        index,
                                                        'group_name',
                                                        event.target.value,
                                                    )
                                                }
                                                className="h-10 w-24 rounded-lg border border-white/10 bg-zinc-900/50 px-2 text-center text-[10px] font-bold tracking-widest text-white uppercase transition-all outline-none focus:border-brand-gold focus:bg-white/[0.02]"
                                                placeholder="Group A"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center align-middle">
                                            <NumberInput
                                                value={standing.wins}
                                                onChange={(value) =>
                                                    updateField(
                                                        index,
                                                        'wins',
                                                        value,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center align-middle">
                                            <NumberInput
                                                value={standing.draws}
                                                onChange={(value) =>
                                                    updateField(
                                                        index,
                                                        'draws',
                                                        value,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center align-middle">
                                            <NumberInput
                                                value={standing.losses}
                                                onChange={(value) =>
                                                    updateField(
                                                        index,
                                                        'losses',
                                                        value,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center align-middle">
                                            <NumberInput
                                                value={standing.points}
                                                onChange={(value) =>
                                                    updateField(
                                                        index,
                                                        'points',
                                                        value,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center align-middle">
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.0001"
                                                value={standing.quotient}
                                                onChange={(event) =>
                                                    updateField(
                                                        index,
                                                        'quotient',
                                                        event.target.value,
                                                    )
                                                }
                                                className="h-10 w-20 rounded-lg border border-white/10 bg-zinc-900/50 px-2 text-center text-[10px] font-bold tracking-widest text-white transition-all outline-none focus:border-brand-gold focus:bg-white/[0.02]"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center align-middle text-xs font-black text-brand-gold">
                                            {played}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </BentoCard>
        </form>
    );
}

function NumberInput({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <input
            type="number"
            min="0"
            step="1"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="h-10 w-14 rounded-lg border border-white/10 bg-zinc-900/50 px-2 text-center text-[10px] font-bold tracking-widest text-white transition-all outline-none focus:border-brand-gold focus:bg-white/[0.02]"
        />
    );
}

function getRowError(
    errors: Record<string, string>,
    index: number,
): string | null {
    return (
        errors[`standings.${index}.group_name`] ??
        errors[`standings.${index}.wins`] ??
        errors[`standings.${index}.losses`] ??
        errors[`standings.${index}.draws`] ??
        errors[`standings.${index}.points`] ??
        errors[`standings.${index}.quotient`] ??
        null
    );
}

function formatTournamentWindow(tournament: TournamentInfo): string {
    if (!tournament.start_date && !tournament.end_date) {
        return tournament.name || 'Tournament window pending';
    }

    if (tournament.start_date && tournament.end_date) {
        return `${tournament.name || 'Tournament'} • ${formatDate(tournament.start_date)} - ${formatDate(tournament.end_date)}`;
    }

    return `${tournament.name || 'Tournament'} • ${formatDate(tournament.start_date || tournament.end_date || '')}`;
}

function formatDate(value: string): string {
    return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function toNumber(value?: string | null): number {
    const parsed = Number.parseInt(value ?? '0', 10);

    return Number.isNaN(parsed) ? 0 : parsed;
}
