export type SessionData = {
  id: number;
  gameName: string;
  correct: number;
  incorrect: number;
  reactionTimeAvg: number;
  reactionTimeStd: number;
  duration: number;
  domain: string;
  createdAt: Date;
};

export type SessionStats = {
  highscore: number;
  accuracy: number;
  averageScore: number;
};

export type SessionsResponse = {
  message: string;
  data: {
    sessions: SessionData[];
    stats: SessionStats;
  };
};
