import { Head, Link, router, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import {
    destroy as destroyDivision,
    destroyTeam,
    generateBracket,
    index as divisionsIndex,
    update as updateDivision,
} from '@/actions/App/Http/Controllers/Admin/DivisionController';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Team {
    id: number;
    name: string;
    coach_name: string;
    contact_number: string;
    status: string;
}

interface BracketGame {
    id: number;
    court_name?: string | null;
    scheduled_at?: string | null;
    group_name?: string | null;
    status: string;
    team_a?: { name: string } | null;
    team_b?: { name: string } | null;
}

interface Tournament {
    id: number;
    name: string;
    start_date?: string | null;
    end_date?: string | null;
}

interface Division {
    id: number;
    name: string;
    registration_fee: number;
    teams_count: number;
    games_count: number;
    tournament?: Tournament | null;
    teams: Team[];
    games: BracketGame[];
}

interface Props {
    division: Division;
}

export default function DivisionShow({ division }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: division.name,
        registration_fee: division.registration_fee.toString(),
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put(updateDivision.url(division.id));
    };

    const handleGenerateBracket = () => {
        if (!confirm(`Generate a new AI bracket and schedule for ${division.name}? Existing bracket games for this division will be replaced.`)) {
            return;
        }

        router.post(generateBracket.url(division.id));
    };

    const handleDeleteDivision = () => {
        if (!confirm(`Delete ${division.name}? This only works when the division has no teams or generated games.`)) {
            return;
        }

        router.delete(destroyDivision.url(division.id));
    };

    const handleDeleteTeam = (teamId: number, teamName: string) => {
        if (!confirm(`Delete ${teamName} from ${division.name}?`)) {
            return;
        }

        router.delete(destroyTeam.url([division.id, teamId]));
    };

    return (
        <AdminLayout title="Division Management">
            <Head title={`${division.name} Division`} />

            <div className="space-y-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <Link href={divisionsIndex.url()} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 transition-colors hover:text-brand-gold">
                            Back to Divisions
                        </Link>
                        <h2 className="mt-3 text-3xl font-black uppercase tracking-tighter">
                            {division.name} <span className="text-brand-gold italic">Division</span>
                        </h2>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            {division.teams_count} registered teams, {division.games_count} generated bracket games, {formatTournamentWindow(division.tournament)}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={handleGenerateBracket}
                            className="flex h-11 items-center justify-center rounded-xl bg-brand-gold px-6 text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold-glow"
                        >
                            AI Generate Bracket &amp; Schedule
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteDivision}
                            className="flex h-11 items-center justify-center rounded-xl border border-red-500/20 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-red-400 transition-all hover:bg-red-500/10"
                        >
                            Delete Division
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.4fr]">
                    <form onSubmit={submit} className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-brand-gold">Edit Division</h3>

                        <div className="space-y-5">
                            <div>
                                <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-zinc-500">Division Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(event) => setData('name', event.target.value)}
                                    className="h-12 w-full rounded-xl border border-white/5 bg-white/5 px-5 text-sm font-black uppercase tracking-tighter text-white outline-none transition-all focus:border-brand-gold"
                                />
                                {errors.name ? <p className="mt-2 text-xs font-bold text-red-400">{errors.name}</p> : null}
                            </div>

                            <div>
                                <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-zinc-500">Registration Fee</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.registration_fee}
                                    onChange={(event) => setData('registration_fee', event.target.value)}
                                    className="h-12 w-full rounded-xl border border-white/5 bg-white/5 px-5 text-sm font-black tracking-tight text-white outline-none transition-all focus:border-brand-gold"
                                />
                                {errors.registration_fee ? <p className="mt-2 text-xs font-bold text-red-400">{errors.registration_fee}</p> : null}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <StatCard label="Teams" value={division.teams_count.toString()} />
                                <StatCard label="Bracket Games" value={division.games_count.toString()} />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex h-12 w-full items-center justify-center rounded-xl bg-white/10 text-[10px] font-black uppercase tracking-[0.25em] text-white transition-all hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? 'Saving...' : 'Save Division'}
                            </button>
                        </div>
                    </form>

                    <div className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl">
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest">Registered Teams</h3>
                                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Remove teams directly from this division before deleting the division itself.
                                </p>
                            </div>
                            <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                {division.teams.length} Teams
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                        <th className="pb-4">Team</th>
                                        <th className="pb-4">Coach</th>
                                        <th className="pb-4">Contact</th>
                                        <th className="pb-4">Status</th>
                                        <th className="pb-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {division.teams.map((team) => (
                                        <tr key={team.id} className="group">
                                            <td className="py-4 text-sm font-black uppercase tracking-tight text-white transition-colors group-hover:text-brand-gold">
                                                {team.name}
                                            </td>
                                            <td className="py-4 text-xs font-semibold uppercase text-zinc-400">{team.coach_name}</td>
                                            <td className="py-4 text-xs font-semibold text-zinc-500">{team.contact_number}</td>
                                            <td className="py-4">
                                                <span className="inline-flex rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-[10px] font-black uppercase text-brand-gold">
                                                    {team.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteTeam(team.id, team.name)}
                                                    className="text-[10px] font-black uppercase tracking-widest text-red-400 transition-colors hover:text-red-300"
                                                >
                                                    Delete Team
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {division.teams.length === 0 ? (
                                <div className="py-16 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    No teams registered in this division yet.
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl">
                    <div className="mb-6 flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest">Generated Bracket Schedule</h3>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Each generated game is scheduled per division and mirrored automatically in the admin dashboard.
                            </p>
                        </div>
                        <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                            {division.games.length} Matches
                        </span>
                    </div>

                    {division.games.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            No bracket schedule generated yet.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                            {division.games.map((game) => (
                                <div key={game.id} className="rounded-2xl border border-white/5 bg-[#0c1628] p-5">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-gold/80">{game.group_name || 'Bracket Match'}</div>
                                    <div className="mt-2 text-lg font-black uppercase tracking-tight text-white">
                                        {game.team_a?.name || 'TBD'} <span className="px-2 text-zinc-500">vs</span> {game.team_b?.name || 'TBD'}
                                    </div>
                                    <div className="mt-4 space-y-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                        <div>{formatScheduledAt(game.scheduled_at)}</div>
                                        <div>{game.court_name || 'TBD Court'} • {game.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</div>
            <div className="mt-2 text-2xl font-black uppercase tracking-tighter text-white">{value}</div>
        </div>
    );
}

function formatTournamentWindow(tournament?: Tournament | null): string {
    if (!tournament?.start_date || !tournament?.end_date) {
        return tournament?.name ? `${tournament.name} schedule window pending` : 'tournament window pending';
    }

    return `${formatDate(tournament.start_date)} - ${formatDate(tournament.end_date)}`;
}

function formatDate(value: string): string {
    return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function formatScheduledAt(value?: string | null): string {
    if (!value) {
        return 'Schedule pending';
    }

    return new Date(value).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
