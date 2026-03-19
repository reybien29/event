import { useState } from 'react';
import { BentoCard, BentoGrid, BentoHeading } from '@/Components/ui/bento';
import { cn } from '@/lib/utils';

interface RuleCategory {
    title: string;
    description: string;
    rules: string[];
}

export default function Rules() {
    const [openCategory, setOpenCategory] = useState<number | null>(0);

    const categories: RuleCategory[] = [
        {
            title: 'Player Eligibility',
            description: 'Strict age and documentation verification protocols.',
            rules: [
                'All players must have valid government IDs for age verification.',
                'PSA Birth Certificate is mandatory for all divisions.',
                'Players found using fake identities will be disqualified immediately.',
                'Original PSA copy must be presented upon request by officials.',
            ],
        },
        {
            title: 'Team Composition',
            description: 'Squad size and substitution regulations.',
            rules: [
                'Team roster must consist of 5 to 12 active players.',
                'No player substitution after the first game tip-off.',
                'Coaches must be registered in the official team roster.',
                'Maximum of 2 bench personnel allowed per team.',
            ],
        },
        {
            title: 'Compliance & Technicals',
            description: 'Financial and on-court conduct standards.',
            rules: [
                'Proof of payment must be uploaded within 24 hours of registration.',
                'Uniforms must strictly follow the league-defined color palette.',
                'Late arrivals after 15 minutes result in automatic forfeit.',
                'Unsportsmanlike conduct leads to immediate game suspension.',
            ],
        },
    ];

    return (
        <section id="rules" className="relative py-2">
            <BentoGrid className="items-start">
                <BentoCard
                    className="md:col-span-12 lg:col-span-8"
                    padding="lg"
                    variant="default"
                >
                    <BentoHeading
                        eyebrow="League Protocols"
                        title={
                            <>
                                Rules Of The{' '}
                                <span className="text-brand-gold italic">
                                    Court.
                                </span>
                            </>
                        }
                        description="A cleaner competition starts with explicit eligibility, roster, and conduct standards. Review every protocol before submitting a team."
                    />

                    <div className="mt-8 space-y-4">
                        {categories.map((category, index) => {
                            const isOpen = openCategory === index;

                            return (
                                <div
                                    key={category.title}
                                    className={cn(
                                        'overflow-hidden rounded-[1.5rem] border transition-all duration-300',
                                        isOpen
                                            ? 'border-brand-gold/25 bg-brand-gold/6'
                                            : 'border-white/8 bg-black/15',
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenCategory(
                                                isOpen ? null : index,
                                            )
                                        }
                                        className="flex w-full items-center justify-between gap-6 p-6 text-left"
                                    >
                                        <div className="space-y-2">
                                            <div className="text-lg font-black tracking-[-0.03em] text-white uppercase">
                                                {category.title}
                                            </div>
                                            <p className="text-sm text-zinc-400">
                                                {category.description}
                                            </p>
                                        </div>

                                        <div
                                            className={cn(
                                                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all',
                                                isOpen
                                                    ? 'rotate-180 border-brand-gold/40 text-brand-gold'
                                                    : 'border-white/10 text-zinc-500',
                                            )}
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.5"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                    </button>

                                    <div
                                        className={cn(
                                            'grid transition-all duration-300 ease-out',
                                            isOpen
                                                ? 'grid-rows-[1fr] opacity-100'
                                                : 'grid-rows-[0fr] opacity-0',
                                        )}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="grid gap-4 border-t border-white/8 p-6">
                                                {category.rules.map((rule) => (
                                                    <div
                                                        key={rule}
                                                        className="flex items-start gap-4 rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4"
                                                    >
                                                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                                                        <p className="text-sm leading-relaxed text-zinc-300">
                                                            {rule}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </BentoCard>

                <div className="grid gap-5 md:col-span-12 lg:col-span-4">
                    <BentoCard padding="lg" variant="accent" glow>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold text-black">
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
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-lg font-black tracking-[-0.03em] text-white uppercase">
                                        Documentation
                                    </div>
                                    <div className="text-[10px] font-black tracking-[0.24em] text-brand-gold uppercase">
                                        Mandatory Submission
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                {[
                                    {
                                        label: "Voter's or Postal ID",
                                        sub: 'For all 21+ divisions',
                                    },
                                    {
                                        label: 'Original PSA Certificate',
                                        sub: 'Clear digital copy required',
                                    },
                                    {
                                        label: 'Signed Parental Waiver',
                                        sub: 'Mandatory for 21U players',
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-[1.35rem] border border-white/10 bg-black/18 p-4"
                                    >
                                        <div className="text-sm font-semibold text-white">
                                            {item.label}
                                        </div>
                                        <div className="mt-1 text-xs text-zinc-400">
                                            {item.sub}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </BentoCard>

                    <BentoCard padding="lg" variant="danger">
                        <div className="space-y-4">
                            <div className="text-[10px] font-black tracking-[0.24em] text-red-300 uppercase">
                                Compliance Notice
                            </div>
                            <p className="text-sm leading-relaxed text-red-50/85">
                                Failure to comply with documentation and roster
                                protocols can delay approval or trigger
                                disqualification.
                            </p>
                            <button
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById('register')
                                        ?.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                }
                                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-gold px-6 text-[10px] font-black tracking-[0.24em] text-black uppercase transition-all hover:scale-[1.02] hover:bg-brand-gold-glow active:scale-[0.98]"
                            >
                                Start Team Entry
                            </button>
                        </div>
                    </BentoCard>
                </div>
            </BentoGrid>
        </section>
    );
}
