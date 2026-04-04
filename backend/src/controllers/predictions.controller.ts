import type { Request, Response, NextFunction } from "express";
const {getPredictionsData} = require("../services/predictions.service");

async function getPredictions(req: Request, res: Response, next: NextFunction) {
  // Implementation for fetching predictions
  try{
      const {cognitiveScore, riskLevel, comment, domainScores, trend, domainTrends, dailyGoal, recommendations} = await getPredictionsData(req.user);
      
      res.status(200).json({message: "Predictions retrieved successfully", data: {cognitiveScore, riskLevel, comment, domainScores, trend, domainTrends, dailyGoal, recommendations}});
  } catch (error) {
      next(error);
  }
}

module.exports = {
  getPredictions
};