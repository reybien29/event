import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import {
    publish as publishStats,
    update as updateStats,
} from '@/actions/App/Http/Controllers/Admin/StatsController';
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

interface DivisionTeam {
    id: number;
    name: string;
    coach_name: string;
    status: string;
    standing: TeamStanding;
}

interface Division {
    id: number;
    name: string;
    teams_count: number;
    tournament: TournamentInfo;
    teams: DivisionTeam[];
    facebook_preview: string;
}

interface Props {
    divisions: Division[];
    facebook_configured: boolean;
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

export default function StatsIndex({ divisions, facebook_configured }: Props) {
    return (
        <AdminLayout title="Stats Management">
            <Head title="Stats Management" />

            <div className="mb-8 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-xl font-black tracking-tight text-white uppercase">
                            Manual Standings Control
                        </h2>
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
                            Update division standings manually, review the
                            generated Facebook copy, then publish the current
                            table to the official page when you are ready.
                        </p>
                    </div>
                    <span
                        className={`inline-flex rounded-full px-4 py-2 text-[10px] font-black tracking-[0.25em] uppercase ${facebook_configured ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-300' : 'border border-red-500/20 bg-red-500/10 text-red-300'}`}
                    >
                        {facebook_configured
                            ? 'Facebook Ready'
                            : 'Facebook Not Configured'}
                    </span>
                </div>
            </div>

            {divisions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                    No divisions with registered teams are available for
                    standings management yet.
                </div>
            ) : (
                <div className="space-y-8">
                    {divisions.map((division) => (
                        <DivisionStatsCard
                            key={division.id}
                            division={division}
                            facebookConfigured={facebook_configured}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}

function DivisionStatsCard({
    division,
    facebookConfigured,
}: {
    division: Division;
    facebookConfigured: boolean;
}) {
    const { data, setData, put, post, processing, errors, isDirty } =
        useForm<FormState>({
            standings: division.teams.map((team) => ({
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
        put(updateStats.url(division.id), {
            preserveScroll: true,
            onSuccess,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        saveStandings();
    };

    const handlePublish = () => {
        const publishNow = () => {
            post(publishStats.url(division.id), {
                preserveScroll: true,
            });
        };

        if (isDirty) {
            saveStandings(publishNow);
            return;
        }

        publishNow();
    };

    const livePreview =
        buildFacebookPreview(division, data.standings) ||
        division.facebook_preview;

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]"
        >
            <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h3 className="text-sm font-black tracking-widest text-brand-gold uppercase">
                            {division.name}
                        </h3>
                        <p className="mt-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                            {division.teams_count} teams •{' '}
                            {formatTournamentWindow(division.tournament)}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[10px] font-black tracking-[0.2em] text-zinc-100 uppercase transition-all hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Saving...' : 'Save Standings'}
                        </button>
                        <button
                            type="button"
                            onClick={handlePublish}
                            disabled={processing}
                            className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-4 py-3 text-[10px] font-black tracking-[0.2em] text-black uppercase shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold-glow disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Post to Official Facebook Page
                        </button>
                    </div>
                </div>

                <div className="mb-4 rounded-2xl border border-brand-gold/10 bg-brand-gold/5 px-4 py-3 text-[11px] font-semibold tracking-wide text-zinc-300 uppercase">
                    Admin-controlled manual input only. Save updates before
                    leaving this page.
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] font-black tracking-widest text-zinc-600 uppercase">
                                <th className="pb-4">Team</th>
                                <th className="pb-4">Group</th>
                                <th className="pb-4 text-center">W</th>
                                <th className="pb-4 text-center">L</th>
                                <th className="pb-4 text-center">D</th>
                                <th className="pb-4 text-center">Pts</th>
                                <th className="pb-4 text-center">Quot</th>
                                <th className="pb-4 text-right">Played</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {division.teams.map((team, index) => {
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
                                    <tr key={team.id} className="align-top">
                                        <td className="py-4 pr-4">
                                            <div className="text-sm font-black tracking-tight text-white uppercase">
                                                {team.name}
                                            </div>
                                            <div className="mt-1 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                                                Coach {team.coach_name}
                                            </div>
                                            {rowError ? (
                                                <div className="mt-2 text-[11px] font-bold text-red-400">
                                                    {rowError}
                                                </div>
                                            ) : null}
                                        </td>
                                        <td className="py-4 pr-3">
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
                                                className="h-11 w-28 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs font-bold tracking-widest text-white uppercase transition-all outline-none focus:border-brand-gold"
                                                placeholder="Group A"
                                            />
                                        </td>
                                        <td className="py-4 pr-3 text-center">
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
                                        <td className="py-4 pr-3 text-center">
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
                                        <td className="py-4 pr-3 text-center">
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
                                        <td className="py-4 pr-3 text-center">
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
                                        <td className="py-4 pr-3 text-center">
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
                                                className="h-11 w-24 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-center text-xs font-bold tracking-widest text-white transition-all outline-none focus:border-brand-gold"
                                            />
                                        </td>
                                        <td className="py-4 text-right text-sm font-black text-brand-gold">
                                            {played}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="space-y-6">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-4">
                        <h4 className="text-sm font-black tracking-widest text-brand-gold uppercase">
                            Facebook Preview
                        </h4>
                        <span
                            className={`rounded-full px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase ${facebookConfigured ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-300' : 'border border-red-500/20 bg-red-500/10 text-red-300'}`}
                        >
                            {facebookConfigured
                                ? 'Connected'
                                : 'Needs Env Keys'}
                        </span>
                    </div>
                    <pre className="mt-4 max-h-[420px] overflow-y-auto rounded-2xl border border-white/5 bg-[#0c1628] p-4 text-xs leading-6 font-medium whitespace-pre-wrap text-zinc-200">
                        {livePreview}
                    </pre>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
                    <h4 className="text-sm font-black tracking-widest text-brand-gold uppercase">
                        Posting Notes
                    </h4>
                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">
                        <p>
                            Unsaved edits are saved automatically before posting
                            so the Facebook copy matches the stored standings.
                        </p>
                        <p>
                            If posting fails, verify `FACEBOOK_PAGE_ID`,
                            `FACEBOOK_PAGE_ACCESS_TOKEN`, and the configured
                            Graph API version.
                        </p>
                    </div>
                </div>
            </div>
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
            className="h-11 w-16 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-center text-xs font-bold tracking-widest text-white transition-all outline-none focus:border-brand-gold"
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

function buildFacebookPreview(
    division: Division,
    standings: FormStanding[],
): string {
    const rows = division.teams.map((team) => {
        const formStanding = standings.find(
            (standing) => standing.team_id === team.id,
        );
        const wins = toNumber(formStanding?.wins);
        const losses = toNumber(formStanding?.losses);
        const draws = toNumber(formStanding?.draws);
        const points = toNumber(formStanding?.points);
        const quotient = toDecimal(formStanding?.quotient);
        const groupName = formStanding?.group_name?.trim() || '';

        return {
            teamName: team.name,
            wins,
            losses,
            draws,
            points,
            quotient,
            groupName,
        };
    });

    rows.sort((left, right) => {
        return (
            right.points - left.points ||
            right.quotient - left.quotient ||
            right.wins - left.wins ||
            left.teamName.localeCompare(right.teamName)
        );
    });

    const heading = division.tournament.name
        ? `${division.tournament.name} Standings Update`
        : 'Standings Update';

    return [
        heading,
        `Division: ${division.name}`,
        '',
        ...rows.map((row, index) => {
            const record =
                row.draws > 0
                    ? `${row.wins}-${row.losses}-${row.draws}`
                    : `${row.wins}-${row.losses}`;
            const groupSuffix = row.groupName ? ` | ${row.groupName}` : '';

            return `${index + 1}. ${row.teamName} | ${record} | ${row.points} pts | Quotient ${row.quotient.toFixed(4)}${groupSuffix}`;
        }),
    ].join('\n');
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

function toDecimal(value?: string | null): number {
    const parsed = Number.parseFloat(value ?? '0');

    return Number.isNaN(parsed) ? 0 : parsed;
}
