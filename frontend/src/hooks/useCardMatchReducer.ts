
import { useReducer } from "react";

const initialState = {
    matchedCards: 0,
    totalAttempts: 0,
    gameLevel: "easy" as const, // can be "easy", "medium", or "hard"
    gameState: "home" as const, // can be "active", intro, or "completed"
    // Sent to the db after game completion
    totalTime: [], // array to store time taken for each attempt (time taken to recall sequence) {time, correct:boolean}
    totalCorrect: 0,
    totalIncorrect: 0,
    highestConsecutiveCorrect: 0, // highscore
    // Gotten from db upon render of game home page
    averageScore: 0, // gotten from backend upon render of game home page
    averageAccuracy: 0, // gotten from backend upon render of game home page
    highScore: 0, // gotten from backend upon render of game home page
}

export type CardMatchState = {
  matchedCards: number;
  totalAttempts: number;
  gameLevel: "easy" | "medium" | "hard";
  gameState: "intro" | "active" | "completed" | "home";
  totalTime: { time: number; correct: boolean }[];
  totalCorrect: number;
  totalIncorrect: number;
  averageScore: number;
  averageAccuracy: number;
  highScore: number;
  highestConsecutiveCorrect: number;
};

export type CardMatchAction =
    | { type: "increaseMatchedCards" }
    | { type: "reset" } | { type: "increaseAttempts" }
    | { type: "setGameLevel", payload: "easy" | "medium" | "hard" }
    | { type: "setGameState", payload: "active" | "intro" | "completed" | "home" }
    | { type: "playGame"}

function reducer(state: CardMatchState, action: CardMatchAction) : CardMatchState {
    switch (action.type) {
        case "increaseMatchedCards":
            return { ...state, matchedCards: state.matchedCards + 1 };
        case "reset":
            return initialState;
        case "playGame":
            return { ...state, gameState: "active", matchedCards: 0, totalAttempts: 0 };
        case "increaseAttempts":
            return { ...state, totalAttempts: state.totalAttempts + 1 };
        case "setGameLevel":
            return { ...state, gameLevel: action.payload };
        case "setGameState":
            return { ...state, gameState: action.payload };
        default:
            return state;
    }
}

export function useCardMatchReducer(): [CardMatchState, React.Dispatch<CardMatchAction>] {
    const [state, dispatch] = useReducer(reducer, initialState);
    return [state, dispatch]
}