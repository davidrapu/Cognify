import type dataTypes = require("../types/dataTypes");
import type errorsType = require("../types/errorsType");

const data = require('../data/sessions.json')

async function getSessionsData(userId: number) {
  // check if that user ID exists in the data file, showing if the user has any sessions recorded
  // if it does return all sessions with that ID
  // otherwise throw an error saying no sessions found for that user ID
  const userSessions = data.sessions.filter((session: any ) => session.userId === userId);
  if (userSessions.length === 0) {
    const err: errorsType.HttpError = new Error("No sessions found for the given user ID");
    err.status = 404;
    throw err;
  }
  return userSessions;
}

async function getSessionDataById(userId: number, sessionId: number) {
    // check if that user ID exists in the data file, showing if the user has any sessions recorded
    // if it does return the session with that session ID
    // otherwise throw an error saying no session found for that user ID and session ID
    const session = data.sessions.find((session: any) => session.userId === userId && session.id === sessionId);
    if (!session) {
      const err: errorsType.HttpError = new Error("No session found for the given user ID and session ID");
      err.status = 404;
      throw err;
    }
    return session;
}

async function addNewSession(sessionData: dataTypes.SessionData) {
  // Logic to add a new session to the data file
  data.sessions.push(sessionData);
}

module.exports = {
  getSessionsData,
  getSessionDataById,
  addNewSession
};