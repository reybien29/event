import { useState } from 'react';
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
                'PSA Birth Certificate is mandatory for all tournaments.',
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
        <section id="rules" className="relative py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="flex flex-col mb-16">
                    <h2 className="text-[#c1121f] text-sm font-black tracking-widest uppercase mb-3 border-l-[3px] border-[#c1121f] pl-3">
                        League Protocols
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tight">
                        Rules Of The Court
                    </h3>
                    <p className="max-w-xl text-gray-600 mt-6 leading-relaxed text-lg">
                        A cleaner competition starts with explicit eligibility, roster, and conduct standards. Review every protocol before submitting a team.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Categories Accordion */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {categories.map((category, index) => {
                            const isOpen = openCategory === index;

                            return (
                                <div
                                    key={category.title}
                                    className={cn(
                                        'border-b transition-colors duration-300',
                                        isOpen ? 'border-[#c1121f]' : 'border-gray-200'
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenCategory(isOpen ? null : index)}
                                        className="flex w-full items-center justify-between py-6 text-left group"
                                    >
                                        <div>
                                            <div className={cn(
                                                "text-xl md:text-2xl font-black uppercase tracking-tight transition-colors",
                                                isOpen ? "text-[#c1121f]" : "text-gray-900 group-hover:text-[#c1121f]"
                                            )}>
                                                {category.title}
                                            </div>
                                            <p className="text-gray-500 mt-2 font-medium">
                                                {category.description}
                                            </p>
                                        </div>
                                        <div className={cn(
                                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border-2 transition-transform duration-300",
                                            isOpen ? "border-[#c1121f] text-[#c1121f] rotate-180" : "border-gray-300 text-gray-400 group-hover:border-gray-400 group-hover:text-gray-600"
                                        )}>
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>

                                    <div
                                        className={cn(
                                            'grid transition-all duration-300 ease-in-out',
                                            isOpen ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'
                                        )}
                                    >
                                        <div className="overflow-hidden">
                                            <ul className="space-y-4 pt-4">
                                                {category.rules.map((rule) => (
                                                    <li key={rule} className="flex items-start gap-4">
                                                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-none bg-[#c1121f]" />
                                                        <span className="text-gray-700 leading-relaxed text-base md:text-lg">{rule}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right column - Documentation & Notice */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Documentation Box */}
                        <div className="bg-[#1a1a1a] p-8 md:p-10 shadow-xl border-t-[4px] border-[#c1121f]">
                            <h4 className="text-white text-xl md:text-2xl font-black uppercase tracking-tight mb-2">
                                Documentation
                            </h4>
                            <div className="text-[#c1121f] text-[10px] md:text-xs font-black uppercase tracking-widest mb-8">
                                Mandatory Submission
                            </div>
                            
                            <ul className="space-y-6">
                                {[
                                    { label: "Voter's or Postal ID", sub: 'For all 21+ leagues' },
                                    { label: 'Original PSA Certificate', sub: 'Clear digital copy required' },
                                    { label: 'Signed Parental Waiver', sub: 'Mandatory for 21U players' },
                                ].map((item) => (
                                    <li key={item.label} className="border-l-2 border-gray-700 pl-4 py-1 hover:border-[#c1121f] transition-colors">
                                        <div className="text-white font-black text-sm uppercase">{item.label}</div>
                                        <div className="text-gray-400 text-sm mt-1">{item.sub}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Notice Box */}
                        <div className="bg-[#c1121f] p-8 md:p-10 shadow-xl">
                            <h4 className="text-white/90 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4">
                                Compliance Notice
                            </h4>
                            <p className="text-white text-base font-medium leading-relaxed mb-8">
                                Failure to comply with documentation and roster protocols can delay approval or trigger disqualification.
                            </p>
                            <button
                                type="button"
                                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full bg-white text-[#c1121f] py-4 text-xs font-black tracking-widest uppercase hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                Start Team Entry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
