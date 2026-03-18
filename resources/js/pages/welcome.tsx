import { Head } from '@inertiajs/react';
import LandingLayout from '../Layouts/LandingLayout';
import TournamentOverview from '../Components/Landing/TournamentOverview';
import Scoreboard from '../Components/Landing/Scoreboard';
import Standings from '../Components/Landing/Standings';
import Rules from '../Components/Landing/Rules';
import RegistrationForm from '../Components/Landing/RegistrationForm';

interface Division {
    id: number;
    name: string;
}

interface Tournament {
    id: number;
    name: string;
    logo: string;
    brand_color: string;
    start_date: string;
    description?: string;
    prize_pool?: string;
    divisions: Division[];
}

interface Props {
    tournament: Tournament;
    recent_games: any[];
    standings: any[];
}

export default function Welcome({ tournament, recent_games = [], standings = [] }: Props) {
    const fixedFee = "₱ 3,500.00";

    const defaultTournament = {
        name: "Elite Basketball 2026",
        description: "The premier basketball league where legends are born and careers are made.",
        logo: "",
        prize_pool: "₱500,000.00",
        start_date: "2026-04-02"
    };

    return (
        <LandingLayout logo={tournament?.logo} brandColor={tournament?.brand_color}>
            <Head title={tournament?.name || "Premium Basketball Tournament"} />
            
            <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-32 space-y-32">
                {/* Background Glows within the container */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-brand-gold/5 blur-[150px] pointer-events-none rounded-full" />
                
                {/* 1. OVERVIEW: Description, Fixed Amount, and Rules Summary */}
                <TournamentOverview 
                    tournament={tournament || defaultTournament} 
                    fixedFee={fixedFee} 
                />

                {/* 2. LIVE HUB: Scoreboard & Standings */}
                <div id="live" className="space-y-24">
                     <Scoreboard games={recent_games} />
                     <Standings standings={standings} />
                </div>

                {/* 3. PROTOCOLS: Competition Rules (Detailed) */}
                <Rules />

                {/* 4. REGISTRATION: Integrated Form */}
                <RegistrationForm divisions={tournament?.divisions || []} fixedFee={fixedFee} />
            </div>

            {/* FOOTER NOTE: High Visibility Registration Closing */}
            <section className="bg-zinc-950 py-12 text-center border-t border-white/5 relative z-20">
                 <div className="mx-auto max-w-7xl px-6">
                     <p className="text-[10px] font-black tracking-[0.5em] text-zinc-600 uppercase">
                         Registration Deadline: <span className="text-brand-gold ml-2">March 25, 2026 @ 11:59PM</span>
                     </p>
                 </div>
            </section>
        </LandingLayout>
    );
}
