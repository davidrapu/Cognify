import type { Domain } from "@/enums/domain";
import type { GameName } from "@/enums/gameName";

export type SessionData = {
  id: string;
  gameName: GameName;
  correct: number;
  incorrect: number;
  accuracy: number;
  gameScore: number;
  reactionScore: number;
  reactionTimeAvg: number;
  reactionTimeStd: number;
  duration: number;
  domain: Domain;
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
