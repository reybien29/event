import React from 'react';

interface Props {
    tournament: {
        name: string;
        description?: string | null;
        prize_pool?: string | null;
        start_date?: string | null;
        end_date?: string | null;
    };
}

export default function TournamentOverview({ tournament }: Props) {
    return (
        <section id="overview" className="relative w-full h-[650px] lg:h-[700px] bg-[#111] overflow-hidden flex items-center">
            {/* Background Image Setup */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity grayscale"
                style={{ backgroundImage: "url('/images/hero.png')" }}
            />
            
            {/* Red Angled Overlay */}
            <div className="absolute top-0 right-0 bottom-0 w-[60%] lg:w-[45%] opacity-[0.85] hidden md:block" style={{ zIndex: 1 }}>
                <div 
                    className="absolute inset-0 bg-gradient-to-l from-[#a30b18] to-[#600000]"
                    style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-center">
                
                {/* Badge */}
                <div 
                    className="bg-[#c1121f] text-white text-[10px] md:text-[11px] font-black px-5 py-2 uppercase tracking-widest inline-flex w-max mb-6 lg:mb-8"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 93% 100%, 0 100%)' }}
                >
                    Summer 2026 Edition
                </div>

                {/* Main Heading */}
                <h1 className="flex flex-col uppercase font-black tracking-tight leading-[0.95] mb-6 md:mb-8">
                    <span className="text-white text-[3.5rem] md:text-[5rem] lg:text-[7.5rem]">CEBU</span>
                    <span className="text-[#c1121f] text-[3.5rem] md:text-[5rem] lg:text-[7.5rem] italic -mt-2 sm:-mt-4 relative" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>
                        INVITATIONAL
                    </span>
                    <span className="text-white text-[3.5rem] md:text-[5rem] lg:text-[7.5rem] -mt-2 sm:-mt-4">BASKETBALL</span>
                </h1>

                {/* Subtitle */}
                <p className="text-gray-300 max-w-[550px] text-sm md:text-base lg:text-lg font-medium leading-relaxed mb-8 md:mb-12 border-l-[3px] border-gray-600 pl-4 lg:pl-5 py-1">
                    The ultimate showcase of hoop talent in the South. 32 Elite Teams. 1 Championship Title. Magnum Sports Complex Main Arena.
                </p>

                {/* Info Boxes */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Dates Box */}
                    <div className="bg-white px-6 md:px-8 py-4 md:py-5 min-w-[240px] shadow-lg">
                        <div className="text-[#c1121f] text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-1.5">
                            Tournament Dates
                        </div>
                        <div className="text-black text-xl md:text-2xl font-black uppercase">
                            July 15 - 28
                        </div>
                    </div>
                    
                    {/* Venue Box */}
                    <div className="bg-[#222] px-6 md:px-8 py-4 md:py-5 min-w-[240px] shadow-lg">
                        <div className="text-[#c1121f] text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-1.5">
                            Venue Location
                        </div>
                        <div className="text-white text-xl md:text-2xl font-black uppercase">
                            Magnum Complex
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}