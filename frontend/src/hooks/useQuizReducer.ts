import { useReducer } from "react";

const initialState = {
  currentQuestion: 1,
  totalPoints: 0,
  quizState: "intro", // Intro | Active | Finish
};
export type QuizState = {
  currentQuestion: number;
  totalPoints: number;
  quizState: string;
};
export type QuizAction =
  | { type: "next" }
  | { type: "increaseTotalPoints"; payload: number }
  | { type: "start" }
  | { type: "end" }
  | { type: "reset" };

function reducer(state: QuizState, action: QuizAction) {
  switch (action.type) {
    case "next":
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    case "increaseTotalPoints":
      return { ...state, totalPoints: state.totalPoints + action.payload };
    case "start":
      return { ...state, quizState: "active" };
    case "end":
      return { ...state, quizState: "finish" };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export function useQuizReducer(): [QuizState, React.Dispatch<QuizAction>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
