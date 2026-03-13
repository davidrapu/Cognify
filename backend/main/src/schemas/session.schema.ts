const z = require('zod');

const SessionSchema = z.object({
    id: z.number(),
    userId: z.number(),
    gameName: z.string(),
    correct: z.number(),
    incorrect: z.number(),
    reactionTimeAvg: z.number(),
    reactionTimeStd: z.number(),
    duration: z.number(),
    domain: z.string(),
    date: z.string(),
})

module.exports = {
    SessionSchema
}