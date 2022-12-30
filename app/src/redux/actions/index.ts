import dayjs, { Dayjs } from 'dayjs';
import { DateValue, Game, Player, SA } from "../../models";
import * as ActionTypes from '../actions/types';

export const alertAction = (snackAlert: SA) => {
    return {
        type: ActionTypes.NEW_ALERT,
        payload: snackAlert,
    }
}


export const dateAction = (newDate: DateValue) => {
    return {
        type: ActionTypes.CHANGE_DATE,
        payload: newDate,
    }
}

export const setGame = (game: Game) => {
    return {
        type: ActionTypes.SET_GAME,
        payload: game,
    }
}
export const setPlayer = (player: Player) => {
    return {
        type: ActionTypes.SET_PLAYER,
        payload: player,
    }
}
