import { useReducer } from "react";

const initialState = {
  currentQuestion: 1
};
export type QuizState = {
  currentQuestion: number;
};
export type QuizAction = { type: "setCurrentQuestion"; payload: number };

function reducer(state: QuizState, action: QuizAction) {
  switch (action.type) {
    case "setCurrentQuestion":
      return { ...state, currentQuestion: action.payload };
    default:
      return state;
  }
}

export function useQuizReducer(): [QuizState, React.Dispatch<QuizAction>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}

