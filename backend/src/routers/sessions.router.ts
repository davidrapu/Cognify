const express = require("express");
const { addSession, getSession, getSessions } = require("../controllers/sessions.controller");

const router = express.Router();
// @desc Get all sessions
// @route GET /sessions
// @route GET /sessions?gameName=gameName
router.get("/", getSessions);

// @desc Get a specific session by ID
// @route GET /sessions/:id
router.get("/:id", getSession);

// @desc Create a new session
// @route POST /sessions
router.post("/", addSession);





module.exports = router;