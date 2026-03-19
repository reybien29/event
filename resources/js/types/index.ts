export type * from './auth';

export interface Division {
    id: number;
    name: string;
    registration_fee?: number;
    tournament_id?: number;
}
