import type { Request, Response, NextFunction } from "express";
const {getAnalyticsData} = require("../services/analytics.service");

async function getAnalytics(req: Request, res: Response, next: NextFunction) {
  // Implementation for fetching analytics data
  try{
      const {cognitiveScore, riskLevel, comment, domainScores, trend, domainTrends, dailyGoal, recommendations, quizScore} = await getAnalyticsData(req.user);
      // console.log(quizScore)
      
      res.status(200).json({message: "Analytics retrieved successfully", data: {cognitiveScore, riskLevel, comment, domainScores, trend, domainTrends, dailyGoal, recommendations, quizScore}});
  } catch (error) {
      next(error);
  }
}

module.exports = {
  getAnalytics,
};