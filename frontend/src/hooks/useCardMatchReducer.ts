import { useReducer } from "react";

const initialState = {
  gameState: "home" as const, // can be "active", intro, or "completed"
  matchedCards: 0,
  totalAttempts: 0,
  gameLevel: "easy" as const, // can be "easy", "medium", or "hard"
  // Sent to the db after game completion
  totalTime: [], // array to store time taken for each attempt (time taken to recall sequence) {time, correct:boolean}
  totalCorrect: 0,
  totalIncorrect: 0,
  highestConsecutiveCorrect: 0, // highscore
  // Gotten from db upon render of game home page
  averageScore: 0, // gotten from backend upon render of game home page
  averageAccuracy: 0, // gotten from backend upon render of game home page
  highScore: 0, // gotten from backend upon render of game home page
};

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
  | { type: "reset" }
  | { type: "increaseAttempts" }
  | { type: "setGameLevel"; payload: "easy" | "medium" | "hard" }
  | { type: "setGameState"; payload: "active" | "intro" | "completed" | "home" }
  | {
      type: "setAverages";
      payload: { averageScore: number; averageAccuracy: number };
    }
  | { type: "setHighScore"; payload: number }
  | { type: "updateTotalTime"; payload: { time: number; correct: boolean } }
  | { type: "increaseMatchedCards" }
  | { type: "increaseTotalCorrect" }
  | { type: "increaseTotalIncorrect" }
  | { type: "updateHighestConsecutiveCorrect"; payload: number }
  | { type: "playGame" }
  | { type: "startGame" }
  | { type: "endGame" }
  | { type: "home" };

function reducer(
  state: CardMatchState,
  action: CardMatchAction,
): CardMatchState {
  switch (action.type) {
    case "increaseMatchedCards":
      return { ...state, matchedCards: state.matchedCards + 1 };
    case "reset":
      return initialState;
    case "playGame":
      return {
        ...state,
        gameState: "active",
        totalTime: [],
        totalCorrect: 0,
        totalIncorrect: 0,
      };
    case "startGame":
      return {
        ...state,
        gameState: "intro",
        matchedCards: 0,
        totalAttempts: 0,
        highestConsecutiveCorrect: 0,
      };
    case "endGame":
      return { ...state, gameState: "completed" };
    case "home":
      return { ...state, gameState: "home" };
    case "increaseAttempts":
      return { ...state, totalAttempts: state.totalAttempts + 1 };
    case "setGameLevel":
      return { ...state, gameLevel: action.payload };
    case "setGameState":
      return { ...state, gameState: action.payload };
    case "setAverages":
      return {
        ...state,
        averageScore: action.payload.averageScore,
        averageAccuracy: action.payload.averageAccuracy,
      };
    case "setHighScore":
      return { ...state, highScore: action.payload };
    case "updateTotalTime":
      return { ...state, totalTime: [...state.totalTime, action.payload] };
    case "increaseTotalCorrect":
      return { ...state, totalCorrect: state.totalCorrect + 1 };
    case "increaseTotalIncorrect":
      return { ...state, totalIncorrect: state.totalIncorrect + 1 };
    case "updateHighestConsecutiveCorrect":
      return { ...state, highestConsecutiveCorrect: action.payload };
    default:
      return state;
  }
}

export function useCardMatchReducer(): [
  CardMatchState,
  React.Dispatch<CardMatchAction>,
] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
