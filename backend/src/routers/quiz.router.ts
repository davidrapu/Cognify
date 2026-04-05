const express = require("express");
const { getQuizData } = require("../controllers/quiz.controller..ts");
const router = express.Router();


router.get("/quiz", getQuizData);

module.exports = router;