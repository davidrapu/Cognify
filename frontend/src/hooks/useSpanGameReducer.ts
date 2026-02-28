import { useReducer } from "react";

const initialState: SpanGameState = {
    gameState: "home",
    totalAllowedTries: 6,
    // Sent to the db after game completion
    totalTime: [], // array to store time taken for each attempt (time taken to recall sequence) {time, correct:boolean}
    totalCorrect: 0,
    totalIncorrect: 0,
    totalAttempts: 0,
    highestConsecutiveCorrect: 0, // highscore
    // Gotten from db upon render of game home page
    averageScore: 0, // gotten from backend upon render of game home page
    averageAccuracy: 0, // gotten from backend upon render of game home page
    highScore: 0, // gotten from backend upon render of game home page
}
export type SpanGameState = {
    gameState: "intro" | "active" | "completed" | "home";
    totalAttempts: number;
    totalTime: { time: number; correct: boolean }[];
    totalCorrect: number;
    totalIncorrect: number;
    totalAllowedTries: number;
    averageScore: number;
    averageAccuracy: number;
    highScore: number;
    highestConsecutiveCorrect: number;
}
export type SpanGameAction =
    | { type: "startGame" } // Set the game state to "intro"
    | {type: "playGame"} // Set the game state to "active"
    | { type: "endGame"} // Set the game state to "completed"
    | { type: "home"} // Set the game state to "home"
    | { type: "increaseAttempts" } // Increment the total attempts by 1
    | { type: "addTimeTaken", payload: { time: number; correct: boolean } } // add the time taken for an attempt to the totalTime array
    | { type: "reduceAllowedTries" } // reduce the total allowed tries by 1
    | { type: "incrementCorrect" } // increment total correct by 1
    | { type: "incrementIncorrect" } // increment total incorrect by 1
    | { type: "setHighestConsecutiveCorrect", payload: number } // set the highest consecutive correct count
    | { type: "setAverages", payload: { averageScore: number; averageAccuracy: number } } // set the average score and accuracy
    | { type: "setHighScore", payload: number } // set the high score
    | { type: "resetGame" } // reset the game to initial state but keep gameState as "active"
function reducer (state: SpanGameState, action: SpanGameAction): SpanGameState {
    switch (action.type) {
        case "startGame":
            return { ...state, gameState: "intro" };
        case "playGame":
            return { ...state, gameState: "active" };
        case "endGame":
            return { ...state, gameState: "completed"};
        case "home":
            return { ...state, gameState: "home", totalAttempts: 0, totalTime: [], totalCorrect: 0, totalIncorrect: 0, totalAllowedTries: 6, highestConsecutiveCorrect: 0 };
        case "resetGame":
            return { ...state, totalAttempts: 0, totalTime: [], totalCorrect: 0, totalIncorrect: 0, totalAllowedTries: 6, highestConsecutiveCorrect: 0, gameState: "intro" };
        case "increaseAttempts":
            return { ...state, totalAttempts: state.totalAttempts + 1 };
        case "addTimeTaken":
            return { ...state, totalTime: [...state.totalTime, { time: action.payload.time, correct: action.payload.correct }] };
        case "reduceAllowedTries":
            return { ...state, totalAllowedTries: state.totalAllowedTries - 1 };
        case "incrementCorrect":
            return { ...state, totalCorrect: state.totalCorrect + 1 };
        case "incrementIncorrect":
            return { ...state, totalIncorrect: state.totalIncorrect + 1 };
        case "setHighestConsecutiveCorrect":
            return { ...state, highestConsecutiveCorrect: action.payload };
        case "setAverages":
            return { ...state, averageScore: action.payload.averageScore, averageAccuracy: action.payload.averageAccuracy };
        case "setHighScore":
            return { ...state, highScore: action.payload };
        default:
            return state;
    }
}

export function useSpanGameReducer() : [SpanGameState, React.Dispatch<SpanGameAction>] {
    const [state, dispatch] = useReducer(reducer, initialState);
    return [state, dispatch]
}
