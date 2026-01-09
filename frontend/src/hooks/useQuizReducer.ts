import { useReducer } from "react";

const initialState = {
  currentQuestion: 1,
  totalPoints: 0
};
export type QuizState = {
  currentQuestion: number;
  totalPoints: number;
};
export type QuizAction = { type: "next"} | {type: "increaseTotalPoints", payload: number};

function reducer(state: QuizState, action: QuizAction) {
  switch (action.type) {
    case "next":
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    case "increaseTotalPoints":
      return {...state, totalPoints: state.totalPoints + action.payload}
    default:
      return state;
  }
}

export function useQuizReducer(): [QuizState, React.Dispatch<QuizAction>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}

