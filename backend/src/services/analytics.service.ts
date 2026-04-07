import { QuizSessionDataType, SessionDataTypeWithDate } from "@/types/dataTypes";
import { Domain, GameName } from "../database/generated/prisma/enums";
import { HttpError } from "@/types/errorsType";

const {
  getAllGameSessions,
} = require("../database/repositories/gameSession.repository");
const {
  getQuizSessionsByUserId,
} = require("../database/repositories/quizSession.repository");

const commentMap: Record<string, string> = {
  Low: "Your cognitive performance is strong across all domains.",
  Moderate: "Your cognitive performance shows some areas for improvement.",
  High: "Your cognitive performance indicates significant challenges across multiple domains.",
};

function calculateTrend(gameSessions: SessionDataTypeWithDate[]) {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const thisWeekSessions = gameSessions.filter(
    (session) => new Date(session.createdAt) >= oneWeekAgo,
  );
  const lastWeekSessions = gameSessions.filter(
    //
    (session) =>
      new Date(session.createdAt) >= twoWeeksAgo &&
      new Date(session.createdAt) < oneWeekAgo,
  );

  const thisWeekAvg =
    thisWeekSessions.reduce((acc, session) => acc + session.gameScore, 0) /
    thisWeekSessions.length;
  const lastWeekAvg =
    lastWeekSessions.reduce((acc, session) => acc + session.gameScore, 0) /
    lastWeekSessions.length;

  const trend =
    lastWeekSessions.length > 0
      ? ((thisWeekAvg - lastWeekAvg) / lastWeekAvg) * 100
      : null;

  return trend;
}

function getDailyGoal(gameSessions: SessionDataTypeWithDate[]) {
  const dailyGoal = 8; // 2 sessions per domain
  // get today's sessions
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const todaySessions = gameSessions.filter(
    (session) => new Date(session.createdAt) >= now,
  );

  // count per domain (cap at 2 each)
  const domainCounts = {
    memory: Math.min(
      todaySessions.filter((session) => session.domain === "MEMORY").length,
      2,
    ),
    attention: Math.min(
      todaySessions.filter((session) => session.domain === "ATTENTION").length,
      2,
    ),
    reaction: Math.min(
      todaySessions.filter((session) => session.domain === "REACTION").length,
      2,
    ),
    problemSolving: Math.min(
      todaySessions.filter((session) => session.domain === "PROBLEM_SOLVING")
        .length,
      2,
    ),
  };

  const completedSessions = Object.values(domainCounts).reduce(
    (a, b) => a + b,
    0,
  );
  const goalProgress = completedSessions / dailyGoal; // 0 to 1
  return { dailyGoal, domainCounts, completedSessions, goalProgress };
}

type DomainKey = "memory" | "attention" | "problemSolving" | "reaction";

function getDailyRecommendations(
  memoryScore: number,
  attentionScore: number,
  problemSolvingScore: number,
  reactionScore: number,
) {
  const today = new Date().toDateString(); // e.g. "Sat Apr 04 2026"
  const daySeed = today.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  // sort domains by score ascending (weakest first)
  const domainRankings: { domain: DomainKey; score: number }[] = [
    { domain: "memory" as DomainKey, score: memoryScore },
    { domain: "attention" as DomainKey, score: attentionScore },
    { domain: "problemSolving" as DomainKey, score: problemSolvingScore },
    { domain: "reaction" as DomainKey, score: reactionScore },
  ].sort((a, b) => a.score - b.score);

  // console.log("Domain Rankings:", domainRankings);

  // weakest domain gets the featured game
  const weakestDomain = domainRankings[0].domain;
  // console.log("Weakest Domain:", weakestDomain);

  const domainToGames: Record<DomainKey, string[]> = {
    memory: ["CARD_MATCH", "DIGITAL_SPAN", "SEQUENCE_RECALL"],
    attention: ["STROOP_TEST", "GO_NO_GO", "VISUAL_SEARCH"],
    problemSolving: ["ARITHMETIC_PATTERN_PUZZLE", "PATTERN_PUZZLE"],
    reaction: ["CHOICE_REACTION_TIME", "GO_NO_GO"],
  };

  // featured = first game from weakest domain
  // use seed to pick consistently from the domain's games
  const featuredGameName =
    domainToGames[weakestDomain][daySeed % domainToGames[weakestDomain].length];
  // console.log("Featured Game Name:", featuredGameName)
  // other 3 = first game from next 3 weakest domains
  const otherGameNames = domainRankings
    .slice(1, 3)
    .map((d) => domainToGames[d.domain][0]);
  console.log("Other Game Names:",otherGameNames)
  return {
    featured: featuredGameName,
    others: otherGameNames,
  };
}
async function getAnalyticsData(userId: string) {
  // Implementation for fetching analytics data;

  // get all the data from the database for the user
  const [gameSessions, quizSessions] :  [SessionDataTypeWithDate[], QuizSessionDataType[]] = await Promise.all([getAllGameSessions(userId), getQuizSessionsByUserId(userId)]);

  const bestQuizScore = quizSessions.length > 0 ? Math.max(...quizSessions.map((s) => s.score)) : 0;

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
  const reactionGameSessions = gameSessions.filter(
    (session) => session.domain === Domain.REACTION,
  );
  const stroopGameSessions = gameSessions.filter(
    (session) => session.gameName === GameName.STROOP_TEST,
  );
  const goNoGoGameSessions = gameSessions.filter(
    (session) => session.gameName === GameName.GO_NO_GO,
  );

  // new user
    // return default values if no sessions yet
  if (gameSessions.length === 0) {
    return {
      cognitiveScore: 0,
      riskLevel: 'Low',
      comment: 'Complete some games to see your cognitive assessment.',
      domainScores: {
        memory: 0,
        attention: 0,
        problemSolving: 0,
        reactionScore: 0,
      },
      trend: null,
      domainTrends: {
        memory: [],
        attention: [],
        problemSolving: [],
        reaction: [],
      },
      dailyGoal: {
        completed: 0,
        total: 8,
        progress: 0,
        domainCounts: { memory: 0, attention: 0, reaction: 0, problemSolving: 0 }
      },
      recommendations: {
        featured: 'CARD_MATCH',
        others: ['STROOP_TEST', 'CHOICE_REACTION_TIME']
      }, 
      quizScore: 0,
    }}

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
  // Setting users daily goal progress - the goal is to complete 2 sessions in each domain per day (8 total)

  // Getting trends comparing this week vs last week for the overall game score as an example.
  const trend = calculateTrend(gameSessions);

  // Getting daily recommendations based on the predictions
  const { dailyGoal, domainCounts, completedSessions, goalProgress } =
    getDailyGoal(gameSessions);

  const recommendations = getDailyRecommendations(memoryScore, attentionScore, problemSolvingScore, reactionScore);

  const mlURL = process.env.ML_SERVER_URL || "http://127.0.0.1:8000";
  const resp = await fetch(`${mlURL}/predict`,
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
    domainScores: {
      memory: memoryScore,
      attention: attentionScore,
      problemSolving: problemSolvingScore,
      reactionScore: reactionScore,
    },
    domainTrends: {
      memory: memoryGameSessions.slice(0, 10),
      attention: attentionGameSessions.slice(0, 10),
      problemSolving: problemSolvingGameSessions.slice(0, 10),
      reaction: reactionGameSessions.slice(0, 10),
    },
    dailyGoal: {
      completed: completedSessions,
      total: dailyGoal,
      progress: goalProgress,
      domainCounts,
    },
    recommendations,
    trend: trend,
    quizScore: bestQuizScore,
  };
}

module.exports = {
  getAnalyticsData,
};
