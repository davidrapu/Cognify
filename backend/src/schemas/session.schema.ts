const z = require('zod');

const SessionSchema = z.object({
  gameName: z.enum([
    "DIGITAL_SPAN",
    "CARD_MATCH",
    "SEQUENCE_RECALL",
    "VISUAL_SEARCH",
    "STROOP_TEST",
    "GO_NO_GO",
    "CHOICE_REACTION_TIME",
    "PATTERN_RECOGNITION",
    "ARITHMETIC_PATTERN_RECOGNITION"
  ]),
  correct: z.number(),
  accuracy: z.number(), // normalised scores
  gameScore: z.number(), // normalised scores
  reactionScore: z.number(), // normalised scores
  incorrect: z.number(),
  reactionTimeAvg: z.number(),
  reactionTimeStd: z.number(),
  duration: z.number(),
  domain: z.enum([
    "MEMORY",
    "ATTENTION",
    "PROCESSING_SPEED",
    "EXECUTIVE_FUNCTIONS",
    "REASONING",
  ]),
});

module.exports = {
    SessionSchema
}