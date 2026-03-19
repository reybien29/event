import { Head } from '@inertiajs/react';
import TournamentOverview from '../Components/Landing/TournamentOverview';
import RegistrationForm from '../Components/Landing/RegistrationForm';
import Rules from '../Components/Landing/Rules';
import LandingLayout from '../Layouts/LandingLayout';

interface Division {
    id: number;
    name: string;
}

interface Tournament {
    id: number;
    name: string;
    logo: string;
    brand_color: string;
    start_date?: string | null;
    end_date?: string | null;
    description?: string | null;
    prize_pool?: string | null;
    divisions: Division[];
}

interface Props {
    tournament?: Tournament | null;
}

const defaultTournament: Tournament = {
    id: 0,
    name: 'Elite Basketball League 2026',
    description:
        'The premier basketball league where legends are born and careers are made.',
    logo: '',
    brand_color: '#B8860B',
    prize_pool: '₱500,000.00',
    start_date: '2026-04-02',
    end_date: '2026-04-25',
    divisions: [],
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

            <div className="relative mx-auto max-w-7xl space-y-28 overflow-x-clip px-6 py-20 lg:py-32">
                <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[800px] w-[min(100%,80rem)] rounded-full bg-brand-gold/5 blur-[150px]" />

                <TournamentOverview
                    tournament={activeTournament}
                />
                <Rules />
                <RegistrationForm
                    divisions={activeTournament.divisions || []}
                    fixedFee={fixedFee}
                />
            </div>
        </LandingLayout>
    );
}
