
import { useReducer } from "react";

const initialState = {
    matchedCards: 0,
    totalAttempts: 0,
    gameLevel: "easy"
}

export type CardMatchState = {
    matchedCards: number;
    totalAttempts: number;
    gameLevel: string;
}

export type CardMatchAction =
    | { type: "increaseMatchedCards" }
    | { type: "reset" } | { type: "increaseAttempts" }
    | { type: "setGameLevel", payload: string }


function reducer(state: CardMatchState, action: CardMatchAction) {
    switch (action.type) {
        case "increaseMatchedCards":
            return { ...state, matchedCards: state.matchedCards + 1 };
        case "reset":
            return initialState;
        case "increaseAttempts":
            return { ...state, totalAttempts: state.totalAttempts + 1 };
        case "setGameLevel":
            return { ...state, gameLevel: action.payload };
        default:
            return state;
    }
}

export function useCardMatchReducer(): [CardMatchState, React.Dispatch<CardMatchAction>] {
    const [state, dispatch] = useReducer(reducer, initialState);
    return [state, dispatch]
}