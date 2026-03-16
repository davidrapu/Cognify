import { Domain } from "../database/generated/prisma/enums";
export interface UserData {
  id: number;
};

export interface SessionDataType {
  gameName: string;
  correct: number;
  incorrect: number;
  reactionTimeAvg: number;
  reactionTimeStd: number;
  duration: number;
  domain: Domain;
}