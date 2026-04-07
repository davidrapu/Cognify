const express = require("express");
const { getQuizData, submitQuizResults } = require("../controllers/quiz.controller");
const router = express.Router();


router.get("/", getQuizData);
router.post("/", submitQuizResults);


module.exports = router;