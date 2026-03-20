import { Head } from '@inertiajs/react';
import RegistrationForm from '../Components/Landing/RegistrationForm';
import Rules from '../Components/Landing/Rules';
import TournamentOverview from '../Components/Landing/TournamentOverview';
import PrizePool from '../Components/Landing/PrizePool';
import LandingLayout from '../Layouts/LandingLayout';


interface Tournament {
    id: number;
    name: string;
    logo: string;
    brand_color: string;
    start_date?: string | null;
    end_date?: string | null;
    description?: string | null;
    prize_pool?: string | null;
}

interface Props {
    tournament?: Tournament | null;
}

const defaultTournament: Tournament = {
    id: 0,
    name: 'Eastern Visayas Collegiate Athletic Association 2026',
    description:
        'UNITING TEAMS, ELEVATING DREAMS!',
    logo: '',
    brand_color: '#B8860B',
    prize_pool: '₱500,000.00',
    start_date: '2026-04-02',
    end_date: '2026-04-25',
};

export default function Welcome({ tournament }: Props) {
    const fixedFee = '₱ 3,500.00';
    const activeTournament = tournament || defaultTournament;

    return (
        <LandingLayout
            logo={activeTournament.logo}
            brandColor={activeTournament.brand_color}
        >
            <Head
                title={activeTournament.name || 'Premium Basketball Tournament'}
            />

            <div className="relative w-full overflow-x-clip">
                <TournamentOverview
                    tournament={activeTournament}
                />
                <PrizePool />
                <Rules />
                
                <div className="bg-white py-24">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                        <RegistrationForm
                            fixedFee={fixedFee}
                        />
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
