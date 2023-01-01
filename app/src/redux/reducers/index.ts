import { alertAction } from '../actions';
import { Game, Player, SA, DateValue } from "../../models";
import * as ActionTypes from '../actions/types';
import dayjs, { Dayjs } from 'dayjs';

export interface IState {
    snackAlert: SA;
    dateValue: DateValue;
    game: Game;
    player: Player;
}
const initState: IState = {
    snackAlert: { open: false, severity: 'success', message: "", title: "" },
    dateValue: { date: dayjs(), dateString: dayjs().format('YYYYMMDD') },
    game: { betCount: 0, oracle: -1, bump: 0, bets: [], pda: '' },
    player: { bump: 0, betCount: 0, pda: '', playerBets: [] },
}

export const snackReducer = (state = initState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.NEW_ALERT:
            return {
                ...state,
                snackAlert: payload,
            }
        case ActionTypes.CHANGE_DATE:
            return {
                ...state,
                dateValue: payload,
            }
        case ActionTypes.SET_GAME:
            return {
                ...state,
                game: payload,
            }
        case ActionTypes.SET_PLAYER:
            return {
                ...state,
                player: payload,
            }
        default:
            return state;
    }
}

