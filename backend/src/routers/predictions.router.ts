const express = require("express");
const { getPredictions } = require("../controllers/predictions.controller");


const router = express.Router();


router.get("/", getPredictions);


module.exports = router;