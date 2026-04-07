import { Domain, GameName } from "../database/generated/prisma/enums";
export interface UserData {
  id: number;
};

// for creating a session - no createdAt needed
export interface SessionDataType {
  id?: string;
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
}

// for reading from db - createdAt always present
export interface SessionDataTypeWithDate extends SessionDataType {
  createdAt: Date;
}

export interface PredictionDataType {
  reactionScore: number;
  gameScore: number;
  accuracy: number;
  stroopErrorRate: number;
  stroopAccuracy: number;
  goNoGoAccuracy: number;
  goNoGoErrorRate: number;
  memoryScore: number;
  attentionScore: number;
  problemSolvingScore: number;
}

export interface QuizSessionDataType {
  id?: number;
  userId: string
  score: number;
}