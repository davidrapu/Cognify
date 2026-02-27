import { useReducer } from "react";

const initialState: SpanGameState = {
    gameState: "home",
    totalAttempts: 0,
    totalTime: [], // array to store time taken for each attempt
    totalCorrect: 0,
    totalIncorrect: 0,
    totalAllowedTries: 6,
    highestConsecutiveCorrect: 0,
}
export type SpanGameState = {
    gameState: "intro" | "active" | "completed" | "home";
    totalAttempts: number;
    totalTime: number[];
    totalCorrect: number;
    totalIncorrect: number;
    totalAllowedTries: number;
    highestConsecutiveCorrect: number;
}
export type SpanGameAction =
    | { type: "startGame" } // Set the game state to "active"
    | { type: "endGame"} // Set the game state to "completed"
    | { type: "increaseAttempts" } // Increment the total attempts by 1
    | { type: "addTimeTaken", payload: number } // add the time taken for an attempt to the totalTime array
    | { type: "reduceAllowedTries" } // reduce the total allowed tries by 1
    | { type: "incrementCorrect" } // increment total correct by 1
    | { type: "incrementIncorrect" } // increment total incorrect by 1
    | { type: "setHighestConsecutiveCorrect", payload: number } // set the highest consecutive correct count

function reducer (state: SpanGameState, action: SpanGameAction): SpanGameState {
    switch (action.type) {
        case "startGame":
            return { ...state, gameState: "active" };
        case "endGame":
            return { ...state, gameState: "completed" };
        case "increaseAttempts":
            return { ...state, totalAttempts: state.totalAttempts + 1 };
        case "addTimeTaken":
            return { ...state, totalTime: [...state.totalTime, action.payload] };
        case "reduceAllowedTries":
            return { ...state, totalAllowedTries: state.totalAllowedTries - 1 };
        case "incrementCorrect":
            return { ...state, totalCorrect: state.totalCorrect + 1 };
        case "incrementIncorrect":
            return { ...state, totalIncorrect: state.totalIncorrect + 1 };
        case "setHighestConsecutiveCorrect":
            return { ...state, highestConsecutiveCorrect: action.payload };
        default:
            return state;
    }
}

export function useSpanGameReducer() : [SpanGameState, React.Dispatch<SpanGameAction>] {
    const [state, dispatch] = useReducer(reducer, initialState);
    return [state, dispatch]
}
