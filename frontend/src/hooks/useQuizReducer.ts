import { useReducer } from "react";

const initialState = {
  currentQuestion: 1,
  totalPoints: 0,
  quizState: 'intro' // Intro | Active | Inactive
};
export type QuizState = {
  currentQuestion: number;
  totalPoints: number;
  quizState: string;
};
export type QuizAction = { type: "next"} | {type: "increaseTotalPoints", payload: number} | {type: 'start'} | {type: 'end'} | {type: 'reset'};

function reducer(state: QuizState, action: QuizAction) {
  switch (action.type) {
    case "next":
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    case "increaseTotalPoints":
      return {...state, totalPoints: state.totalPoints + action.payload}
    case 'start':
      return {...state, quizState: 'Active'}
    case 'end':
      return {...state, quizState: 'Inactive'}
    case 'reset':
      return {...state, quizState: 'Intro'}
    default:
      return state;
  }
}

export function useQuizReducer(): [QuizState, React.Dispatch<QuizAction>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}

