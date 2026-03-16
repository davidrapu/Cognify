const z = require('zod');

const SessionSchema = z.object({
  gameName: z.string(),
  correct: z.number(),
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