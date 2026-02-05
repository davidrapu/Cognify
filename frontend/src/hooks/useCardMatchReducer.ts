
import { useReducer } from "react";

const initialState = {
    matchedCards: 0,
    totalAttempts: 0,
}

export type CardMatchState = {
    matchedCards: number;
    totalAttempts: number;
}

export type CardMatchAction =
    | { type: "increaseMatchedCards" }
    | { type: "reset" } | { type: "increaseAttempts" };


function reducer(state: CardMatchState, action: CardMatchAction) {
    switch (action.type) {
        case "increaseMatchedCards":
            return { ...state, matchedCards: state.matchedCards + 1 };
        case "reset":
            return initialState;
        case "increaseAttempts":
            return { ...state, totalAttempts: state.totalAttempts + 1 };
        default:
            return state;
    }
}

export function useCardMatchReducer(): [CardMatchState, React.Dispatch<CardMatchAction>] {
    const [state, dispatch] = useReducer(reducer, initialState);
    return [state, dispatch]
}