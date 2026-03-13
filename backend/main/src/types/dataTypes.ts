export interface UserData {
  id: number;
};

export interface SessionData {
  id: number;
  userId: number;
  gameName: string;
  correct: number;
  incorrect: number;
  reactionTimeAvg: number;
  reactionTimeStd: number;
  duration: number;
  domain: string;
  date: string;
}