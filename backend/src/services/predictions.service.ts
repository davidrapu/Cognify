import { SessionDataType } from "@/types/dataTypes";
import { Domain, GameName } from "../database/generated/prisma/enums";
import { HttpError } from "@/types/errorsType";

const {
  getAllGameSessions,
} = require("../database/repositories/gameSession.repository");

const commentMap: Record<string, string> = {
  Low: "Your cognitive performance is strong across all domains.",
  Moderate: "Your cognitive performance shows some areas for improvement.",
  High: "Your cognitive performance indicates significant challenges across multiple domains.",
};

async function getPredictionsData(userId: string) {
  // Implementation for fetching predictions;

  // get all the data from the database for the user
  const gameSessions: SessionDataType[] = await getAllGameSessions(userId);

  // filter the data by game type
  const memoryGameSessions = gameSessions.filter(
    (session) => session.domain === Domain.MEMORY,
  );
  const attentionGameSessions = gameSessions.filter(
    (session) => session.domain === Domain.ATTENTION,
  );
  const problemSolvingGameSessions = gameSessions.filter(
    (session) => session.domain === Domain.PROBLEM_SOLVING,
  );
  const stroopGameSessions = gameSessions.filter(
    (session) => session.gameName === GameName.STROOP_TEST,
  );
  const goNoGoGameSessions = gameSessions.filter(
    (session) => session.gameName === GameName.GO_NO_GO,
  );

  //   "reaction_score","game_score","accuracy","stroop_error_rate","stroop_accuracy","go_nogo_accuracy","go_nogo_error_rate","memory_score","attention_score","problem_solving_score"

  // The model requires the above

  // process the data to calculate the predictions

  // reactionScore
  const totalAttempts = gameSessions.reduce(
    (acc, s) => acc + s.correct + s.incorrect,
    0,
  );
  const reactionScore =
    gameSessions.reduce(
      (acc, s) => acc + s.reactionScore * (s.correct + s.incorrect),
      0,
    ) / totalAttempts;

  // gameScore
  const gameScore =
    gameSessions.reduce((acc, session) => acc + session.gameScore, 0) /
    gameSessions.length;

  // accuracy
  const accuracy =
    gameSessions.reduce((acc, session) => acc + session.accuracy, 0) /
    gameSessions.length;

  // stroopErrorRate
  const stroopErrorRate =
    stroopGameSessions.length > 0
      ? stroopGameSessions.reduce((acc, s) => acc + s.incorrect, 0) /
        stroopGameSessions.reduce((acc, s) => acc + s.correct + s.incorrect, 0)
      : 0; // default to mid range if no data

  // stroopAccuracy
  const stroopAccuracy =
    stroopGameSessions.length > 0
      ? stroopGameSessions.reduce((acc, session) => acc + session.correct, 0) /
        stroopGameSessions.reduce(
          (acc, session) => acc + session.correct + session.incorrect,
          0,
        )
      : 0; // default to mid range if no data

  // goNoGoAccuracy
  const goNoGoAccuracy =
    goNoGoGameSessions.length > 0
      ? goNoGoGameSessions.reduce((acc, session) => acc + session.correct, 0) /
        goNoGoGameSessions.reduce(
          (acc, session) => acc + session.correct + session.incorrect,
          0,
        )
      : 0; // default to mid range if no data

  // goNoGoErrorRate
  const goNoGoErrorRate =
    goNoGoGameSessions.length > 0
      ? goNoGoGameSessions.reduce(
          (acc, session) => acc + session.incorrect,
          0,
        ) /
        goNoGoGameSessions.reduce(
          (acc, session) => acc + session.correct + session.incorrect,
          0,
        )
      : 0; // default to mid range if no data

  // memoryScore
  const memoryScore =
    memoryGameSessions.length > 0
      ? memoryGameSessions.reduce(
          (acc, session) => acc + session.gameScore,
          0,
        ) / memoryGameSessions.length
      : 0; // default to mid range if no data

  // attentionScore
  const attentionScore =
    attentionGameSessions.length > 0
      ? attentionGameSessions.reduce(
          (acc, session) => acc + session.gameScore,
          0,
        ) / attentionGameSessions.length
      : 0; // default to mid range if no data

  // problemSolvingScore
  const problemSolvingScore =
    problemSolvingGameSessions.length > 0
      ? problemSolvingGameSessions.reduce(
          (acc, session) => acc + session.gameScore,
          0,
        ) / problemSolvingGameSessions.length
      : 0; // default to mid range if no data

  const cognitiveScore =
    memoryScore * 0.3 +
    attentionScore * 0.3 +
    problemSolvingScore * 0.25 +
    reactionScore * 0.15;

  const resp = await fetch(
    process.env.ML_SERVER_URL || "http://127.0.0.1:8000/predict",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reaction_score: reactionScore,
        game_score: gameScore,
        accuracy: accuracy,
        stroop_error_rate: stroopErrorRate,
        stroop_accuracy: stroopAccuracy,
        go_nogo_accuracy: goNoGoAccuracy,
        go_nogo_error_rate: goNoGoErrorRate,
        memory_score: memoryScore,
        attention_score: attentionScore,
        problem_solving_score: problemSolvingScore,
      }),
    },
  );

  if (!resp.ok) {
    const err: HttpError = new Error(
      "Failed to fetch predictions from ML server",
    );
    err.status = resp.status;
    throw err;
  }

  const predictions = await resp.json();

  // return the predictions predictions {cognitiveScore: number, RiskLevel: string, comment?: string}
  return {
    cognitiveScore: cognitiveScore,
    riskLevel: predictions.predicted_cognitive_level,
    comment: commentMap[predictions.predicted_cognitive_level], // This is a placeholder comment. In a real application, you would generate this comment based on the predictions and the user's data.
  };
}

module.exports = {
  getPredictionsData,
};
