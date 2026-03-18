import { useState } from "react";
import { cn } from "../../lib/utils";

interface RuleCategory {
    title: string;
    description: string;
    rules: string[];
}

export default function Rules() {
    const [openCategory, setOpenCategory] = useState<number | null>(0);

    const categories: RuleCategory[] = [
        {
            title: "Player Eligibility",
            description: "Strict age and documentation verification protocols.",
            rules: [
                "All players must have valid government IDs for age verification.",
                "PSA Birth Certificate is mandatory for all divisions.",
                "Players found using fake identities will be disqualified immediately.",
                "Original PSA copy must be presented upon request by officials."
            ]
        },
        {
            title: "Team Composition",
            description: "Squad size and substitution regulations.",
            rules: [
                "Team roster must consist of 5 to 12 active players.",
                "No player substitution after the first game tip-off.",
                "Coaches must be registered in the official team roster.",
                "Maximum of 2 bench personnel allowed per team."
            ]
        },
        {
            title: "Compliance & Technicals",
            description: "Financial and on-court conduct standards.",
            rules: [
                "Proof of payment must be uploaded within 24 hours of registration.",
                "Uniforms must strictly follow the league-defined color palette.",
                "Late arrivals (after 15 mins) result in automatic forfeit.",
                "Unsportsmanlike conduct leads to immediate game suspension."
            ]
        }
    ];

    return (
        <section id="rules" className="relative py-12">
            <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
                {/* Left: Interactive Rules Accordion */}
                <div className="flex-1 lg:max-w-2xl">
                    <div className="mb-12">
                        <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.4em] text-brand-gold uppercase">League Protocols</span>
                        <h2 className="text-4xl font-black tracking-tighter uppercase sm:text-6xl">Rules of the <span className="text-brand-gold italic">Court.</span></h2>
                    </div>

                    <div className="space-y-4">
                        {categories.map((category, idx) => (
                            <div 
                                key={idx} 
                                className={cn(
                                    "overflow-hidden rounded-2xl border transition-all duration-500",
                                    openCategory === idx 
                                        ? "border-brand-gold/40 bg-zinc-900/50 shadow-2xl shadow-brand-gold/5" 
                                        : "border-white/5 bg-transparent hover:border-white/10"
                                )}
                            >
                                <button
                                    onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
                                    className="flex w-full items-center justify-between p-6 text-left"
                                >
                                    <div className="flex flex-col gap-1">
                                        <h3 className={cn(
                                            "text-lg font-black uppercase tracking-tighter transition-colors",
                                            openCategory === idx ? "text-brand-gold" : "text-white"
                                        )}>
                                            {category.title}
                                        </h3>
                                        <p className="text-xs font-medium text-zinc-500">{category.description}</p>
                                    </div>
                                    <div className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-500",
                                        openCategory === idx ? "rotate-180 border-brand-gold/50 text-brand-gold" : "border-white/10 text-zinc-600"
                                    )}>
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                <div className={cn(
                                    "grid transition-all duration-500 ease-in-out",
                                    openCategory === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                )}>
                                    <div className="overflow-hidden">
                                        <div className="border-t border-white/5 p-6 space-y-4">
                                            {category.rules.map((rule, rIdx) => (
                                                <div key={rIdx} className="flex items-start gap-4 group">
                                                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                                                    <p className="text-[13px] font-medium leading-relaxed text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                                        {rule}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick CTA to Registration */}
                    <div className="mt-12 group">
                        <a 
                            href="#register" 
                            className="inline-flex items-center gap-4 text-xs font-black tracking-[0.3em] text-brand-gold uppercase transition-all hover:gap-6"
                        >
                            Complete Registration Form
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <div className="mt-2 h-0.5 w-12 bg-brand-gold transition-all group-hover:w-full opacity-50" />
                    </div>
                </div>

                {/* Right: Mandatory Documentation Card */}
                <div className="lg:sticky lg:top-8 w-full lg:max-w-md">
                    <div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 border border-white/5 p-10 shadow-3xl">
                        {/* Abstract Background Element */}
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-gold/10 blur-[80px]" />
                        
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold text-black shadow-2xl shadow-brand-gold/30">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-tighter text-white">Documentation</h3>
                                    <p className="text-[10px] font-bold tracking-widest text-brand-gold uppercase italic opacity-70">Mandatory Submission</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: "Voter's or Postal ID", sub: "For all 21+ divisions" },
                                    { label: "Original PSA Certificate", sub: "Clear digital copy required" },
                                    { label: "Signed Parental Waiver", sub: "Mandatory for 21U players" }
                                ].map((item, idx) => (
                                    <div key={idx} className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05] hover:border-white/10">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-white/5 text-brand-gold">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-zinc-100">{item.label}</p>
                                            <p className="text-[10px] font-medium text-zinc-500 italic">{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-2xl bg-zinc-900/50 p-6 border border-white/5">
                                <p className="text-[11px] font-bold leading-relaxed text-zinc-500 text-center">
                                    "Failure to comply with these protocols will result in delayed registration or disqualification. <span className="text-brand-gold italic">No exceptions.</span>"
                                </p>
                            </div>

                            <button 
                                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full rounded-xl bg-brand-gold py-5 text-xs font-black tracking-[0.2em] text-black uppercase shadow-2xl transition-all hover:scale-[1.02] hover:bg-brand-gold-glow active:scale-[0.98]"
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

