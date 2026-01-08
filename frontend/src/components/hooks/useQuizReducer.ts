import { useReducer } from "react";

const initialState = {
  currentQuestion: 1
};
export type QuizState = {
  currentQuestion: number;
};
export type QuizAction = { type: "next"};

function reducer(state: QuizState, action: QuizAction) {
  switch (action.type) {
    case "next":
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    default:
      return state;
  }
}

export function useQuizReducer(): [QuizState, React.Dispatch<QuizAction>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}

