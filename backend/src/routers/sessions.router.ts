const express = require("express");
const { addSession, getSessions, getSessionsByGameName } = require("../controllers/sessions.controller");

const router = express.Router();
// @desc Get all sessions
// @route GET /sessions
// @route GET /sessions?gameName=gameName
router.get("/", getSessions);

// @desc Get all sessions for a specific game type
// @route GET /sessions/:gameName
router.get("/:gameName", getSessionsByGameName);

// @desc Create a new session
// @route POST /sessions
router.post("/", addSession);





module.exports = router;