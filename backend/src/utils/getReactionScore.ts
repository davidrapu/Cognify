import { GameName } from "@/database/generated/prisma/enums";


// Define bounds for each game
const reactionBoundsMap: Record<
  (typeof GameName)[keyof typeof GameName],
  { min: number; max: number }
> = {
  DIGITAL_SPAN: { min: 300, max: 2000 },
  CARD_MATCH: { min: 300, max: 2000 },
  SEQUENCE_RECALL: { min: 300, max: 2000 },
  VISUAL_SEARCH: { min: 200, max: 1500 },
  STROOP_TEST: { min: 400, max: 2500 },
  GO_NO_GO: { min: 200, max: 1500 },
  CHOICE_REACTION_TIME: { min: 200, max: 1500 },
  PATTERN_RECOGNITION: { min: 300, max: 2000 },
  ARITHMETIC_PATTERN_RECOGNITION: { min: 400, max: 2500 },
};

/**
 * Computes a normalized reaction score (0-1) based on reactionTimeAvg in ms.
 * Lower reaction time = higher score.
 */
export function getReactionScore(
  gameName: (typeof GameName)[keyof typeof GameName],
  reactionTimeAvg: number,
): number {
  const bounds = reactionBoundsMap[gameName];

  const { min, max } = bounds;

  // Normalize and invert (lower RT is better)
  let score = 1 - (reactionTimeAvg - min) / (max - min);

  // Clamp between 0 and 1
  return Math.max(0, Math.min(1, score));
}
