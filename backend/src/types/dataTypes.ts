import { Domain, GameName } from "../database/generated/prisma/enums";
export interface UserData {
  id: number;
};

export interface SessionDataType {
  id?: string;
  gameName: GameName;
  correct: number;
  incorrect: number;
  reactionTimeAvg: number;
  reactionTimeStd: number;
  duration: number;
  domain: Domain;
}