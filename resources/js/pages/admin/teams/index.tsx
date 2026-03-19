import { Head, router } from '@inertiajs/react';
import { generateBrackets } from '@/actions/App/Http/Controllers/Admin/TeamController';
import { BentoCard, BentoGrid } from '@/Components/ui/bento';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Division {
    id: number;
    name: string;
}

interface Team {
    id: number;
    name: string;
    coach_name: string;
    contact_number: string;
    status: string;
    division?: Division;
}

interface Props {
    teams: Team[];
}

export default function TeamsIndex({ teams }: Props) {
    const handleGenerateBrackets = () => {
        if (
            !window.confirm(
                'Generate randomized elimination brackets for all registered teams with assigned divisions? Existing elimination brackets will be replaced.',
            )
        ) {
            return;
        }

        router.post(generateBrackets.url(), {}, { preserveScroll: true });
    };

    return (
        <AdminLayout title="Team Management">
            <Head title="Teams" />

            <BentoGrid className="items-start">
                <BentoCard
                    className="md:col-span-12 xl:col-span-4"
                    padding="lg"
                    variant="accent"
                    glow
                >
                    <div className="space-y-5">
                        <div>
                            <div className="text-[10px] font-black tracking-[0.24em] text-brand-gold uppercase">
                                Team Registry
                            </div>
                            <div className="mt-2 text-2xl font-black tracking-[-0.04em] text-white uppercase">
                                Manage {teams.length} Active Participants
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-300">
                            Review registered squads and trigger bracket
                            generation when enough approved teams are ready to
                            compete.
                        </p>
                        <button
                            type="button"
                            onClick={handleGenerateBrackets}
                            disabled={teams.length < 2}
                            className="inline-flex items-center justify-center rounded-full bg-brand-gold px-5 py-3 text-[10px] font-black tracking-[0.25em] text-black uppercase shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold-glow disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            AI Generation Bracketing
                        </button>
                    </div>
                </BentoCard>

                <BentoCard
                    className="md:col-span-12 xl:col-span-8"
                    padding="lg"
                    variant="default"
                >
                    <div className="mb-6 flex flex-col gap-2">
                        <h3 className="text-sm font-black tracking-widest uppercase">
                            Registered Teams
                        </h3>
                        <p className="text-[11px] font-medium tracking-tight text-zinc-500 uppercase">
                            Live roster with coach contacts, division
                            assignment, and registration status.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] font-black text-zinc-600 uppercase">
                                    <th className="px-4 pb-4 font-black">
                                        Team
                                    </th>
                                    <th className="px-4 pb-4 font-black">
                                        Division
                                    </th>
                                    <th className="px-4 pb-4 font-black">
                                        Coach
                                    </th>
                                    <th className="px-4 pb-4 font-black">
                                        Contact
                                    </th>
                                    <th className="px-4 pb-4 text-right font-black">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {teams.map((team) => (
                                    <tr
                                        key={team.id}
                                        className="group transition-all hover:bg-white/[0.02]"
                                    >
                                        <td className="px-4 py-5">
                                            <div className="text-sm font-black tracking-tighter text-white uppercase transition-colors group-hover:text-brand-gold">
                                                {team.name}
                                            </div>
                                            <div className="mt-0.5 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                                                ID: #
                                                {team.id
                                                    .toString()
                                                    .padStart(4, '0')}
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-xs font-black tracking-widest text-brand-gold/80 uppercase">
                                            {team.division?.name ||
                                                'Unassigned'}
                                        </td>
                                        <td className="px-4 py-5 text-xs font-bold text-zinc-300 uppercase">
                                            {team.coach_name}
                                        </td>
                                        <td className="px-4 py-5 font-mono text-[11px] font-medium tracking-tighter text-zinc-500">
                                            {team.contact_number}
                                        </td>
                                        <td className="px-4 py-5 text-right">
                                            <span
                                                className={`inline-flex rounded-md border px-2.5 py-1 text-[9px] font-black tracking-widest uppercase ${
                                                    team.status === 'approved'
                                                        ? 'border-green-500/20 bg-green-500/10 text-green-500'
                                                        : 'border-brand-gold/20 bg-brand-gold/10 text-brand-gold'
                                                }`}
                                            >
                                                {team.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </BentoCard>
            </BentoGrid>
        </AdminLayout>
    );
}
