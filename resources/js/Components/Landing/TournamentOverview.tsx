import {
    BentoCard,
    BentoGrid,
    BentoHeading,
    BentoMetric,
} from '@/Components/ui/bento';
import { cn } from '@/lib/utils';

interface Props {
    tournament: {
        name: string;
        description?: string | null;
        prize_pool?: string | null;
        start_date?: string | null;
        end_date?: string | null;
    };
    fixedFee: string;
}

export default function TournamentOverview({ tournament, fixedFee }: Props) {
    const podiumTiers = [
        {
            rank: 'Champion',
            amount: '₱250,000',
            badge: '1st',
            featured: true,
        },
        {
            rank: 'Runner Up',
            amount: '₱120,000',
            badge: '2nd',
        },
        {
            rank: 'Third Place',
            amount: '₱80,000',
            badge: '3rd',
        },
    ];

    const benefits = [
        'Official league onboarding',
        'Minimum 5 guaranteed matches',
        'Division-based bracket scheduling',
        'Professional officiating support',
    ];

    const tournamentName = tournament.name || 'Elite Basketball League 2026';
    const words = tournamentName.split(' ');
    const midpoint = Math.ceil(words.length / 2);
    const headlineStart = words.slice(0, midpoint).join(' ');
    const headlineEnd = words.slice(midpoint).join(' ');

    return (
        <section id="overview" className="relative">
            <BentoGrid className="items-stretch">
                <BentoCard
                    className="md:col-span-12 lg:col-span-7 lg:row-span-2"
                    padding="lg"
                    variant="accent"
                    glow
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(188,166,115,0.18),transparent_32%)]" />

                    <div className="relative flex h-full flex-col justify-between gap-10">
                        <div className="space-y-8">
                            <BentoHeading
                                eyebrow="Welcome To"
                                title={
                                    <>
                                        <span className="block">
                                            {headlineStart}
                                        </span>
                                        {headlineEnd ? (
                                            <span className="block text-brand-gold italic">
                                                {headlineEnd}
                                            </span>
                                        ) : null}
                                    </>
                                }
                                description={
                                    tournament.description ||
                                    'The premier basketball league where legends are born and careers are made.'
                                }
                            />

                            <div className="flex flex-wrap gap-3">
                                <InfoPill>
                                    {formatDateRange(
                                        tournament.start_date,
                                        tournament.end_date,
                                    )}
                                </InfoPill>
                                <InfoPill accent>Season 1</InfoPill>
                                <InfoPill>
                                    High-intensity amateur hoops
                                </InfoPill>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                            <div className="space-y-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                                <div className="text-[10px] font-black tracking-[0.24em] text-zinc-500 uppercase">
                                    Entry Protocol
                                </div>
                                <div className="text-4xl font-black tracking-[-0.05em] text-brand-gold sm:text-5xl">
                                    {fixedFee}
                                </div>
                                <p className="max-w-md text-sm leading-relaxed text-zinc-300">
                                    One team fee unlocks tournament access,
                                    schedule placement, and administrative
                                    processing.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href="#register"
                                        className="inline-flex h-12 items-center justify-center rounded-full bg-brand-gold px-6 text-[10px] font-black tracking-[0.24em] text-black uppercase transition-all hover:scale-[1.02] hover:bg-brand-gold-glow active:scale-[0.98]"
                                    >
                                        Register Now
                                    </a>
                                    <a
                                        href="#rules"
                                        className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-[10px] font-black tracking-[0.24em] text-white uppercase transition-all hover:border-white/20 hover:bg-white/10"
                                    >
                                        View Rules
                                    </a>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <BentoMetric
                                    label="Prize Pool"
                                    value={tournament.prize_pool || '₱500,000'}
                                    valueClassName="text-brand-gold text-4xl sm:text-5xl"
                                    helper="Distributed across podium finishers."
                                    className="h-full border-brand-gold/15 bg-brand-gold/6"
                                />
                                <BentoMetric
                                    label="Tournament Window"
                                    value={formatDate(tournament.start_date)}
                                    helper={formatDateRange(
                                        tournament.start_date,
                                        tournament.end_date,
                                    )}
                                    className="h-full"
                                />
                            </div>
                        </div>
                    </div>
                </BentoCard>

                <BentoCard
                    className="md:col-span-6 lg:col-span-5"
                    padding="lg"
                    variant="default"
                >
                    <div className="space-y-6">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-[10px] font-black tracking-[0.24em] text-zinc-500 uppercase">
                                    Prize Breakdown
                                </div>
                                <div className="mt-2 text-2xl font-black tracking-[-0.04em] text-white uppercase">
                                    Podium Rewards
                                </div>
                            </div>
                            <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-[10px] font-black tracking-[0.2em] text-brand-gold uppercase">
                                Competitive Pool
                            </span>
                        </div>

                        <div className="grid gap-4">
                            {podiumTiers.map((tier) => (
                                <div
                                    key={tier.rank}
                                    className={cn(
                                        'rounded-[1.35rem] border p-5 transition-transform hover:-translate-y-1',
                                        tier.featured
                                            ? 'border-brand-gold/25 bg-brand-gold/8'
                                            : 'border-white/8 bg-black/15',
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                                                {tier.badge}
                                            </div>
                                            <div className="mt-2 text-lg font-black text-white uppercase">
                                                {tier.rank}
                                            </div>
                                        </div>
                                        <div
                                            className={cn(
                                                'text-right text-2xl font-black tracking-[-0.04em]',
                                                tier.featured
                                                    ? 'text-brand-gold'
                                                    : 'text-white',
                                            )}
                                        >
                                            {tier.amount}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </BentoCard>

                <BentoCard
                    className="md:col-span-6 lg:col-span-5"
                    padding="lg"
                    variant="subtle"
                    glow
                >
                    <div className="space-y-6">
                        <div>
                            <div className="text-[10px] font-black tracking-[0.24em] text-zinc-500 uppercase">
                                Team Benefits
                            </div>
                            <div className="mt-2 text-2xl font-black tracking-[-0.04em] text-white uppercase">
                                What Each Entry Unlocks
                            </div>
                        </div>

                        <div className="grid gap-3">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={benefit}
                                    className="flex items-center gap-4 rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4"
                                >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold text-[10px] font-black text-black">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm font-semibold text-zinc-200">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </BentoCard>

                <BentoCard
                    className="md:col-span-12 lg:col-span-7"
                    padding="lg"
                    variant="default"
                >
                    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="space-y-4">
                            <div className="text-[10px] font-black tracking-[0.24em] text-zinc-500 uppercase">
                                Tournament Window
                            </div>
                            <div className="text-3xl font-black tracking-[-0.04em] text-white uppercase sm:text-4xl">
                                {formatDateRange(
                                    tournament.start_date,
                                    tournament.end_date,
                                )}
                            </div>
                            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
                                Active tournament dates and landing-page copy
                                sync directly from the admin settings panel, so
                                the public experience stays aligned with the
                                control room.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <BentoMetric
                                label="Registration Fee"
                                value={fixedFee}
                                valueClassName="text-brand-gold"
                            />
                            <BentoMetric
                                label="Season Status"
                                value="Open"
                                helper="Registration is accepting new teams."
                            />
                        </div>
                    </div>
                </BentoCard>
            </BentoGrid>
        </section>
    );
}

function InfoPill({
    children,
    accent = false,
}: {
    children: string;
    accent?: boolean;
}) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border px-4 py-2 text-[10px] font-black tracking-[0.22em] uppercase',
                accent
                    ? 'border-brand-gold/25 bg-brand-gold/10 text-brand-gold'
                    : 'border-white/10 bg-white/5 text-zinc-300',
            )}
        >
            {children}
        </span>
    );
}

function formatDate(value?: string | null): string {
    if (!value) {
        return 'TBD';
    }

    return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
    });
}

function formatDateRange(startDate?: string | null, endDate?: string | null) {
    if (startDate && endDate) {
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }

    if (endDate) {
        return formatDate(endDate);
    }

    if (startDate) {
        return formatDate(startDate);
    }

    return 'Dates to be announced';
}
