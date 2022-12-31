import { AlertColor } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';

export type SA = { open: boolean; severity: AlertColor; message: string; title: string; };

export type Game = {
    pda: String;
    bump: number;
    betCount: number;
    oracle: number,
    bets: Array<Bets>;
}
export type Bets = {
    fng: number;
    lamport: number;
    day: number;
}

export type Player = {
    bump: Number;
    pda: string;
    betCount: number;
    playerBets: Array<Bets>;
}

export type Rating = {
    id: Number;
    fng: Number;
    rating: Number;
    bet: string,
}

export type DateValue = {
    date: Dayjs;
    dateString: string;
}

export type FngData = {
    name?: string,
    data?: [{
        value: string,
        value_classification: string,
        timestamp: string,
        time_until_update: string,
    }],
    metadata?:  {
        error: string,
    }
}