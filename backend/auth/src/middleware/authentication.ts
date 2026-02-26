import type {
  Request,
  Response,
  NextFunction,
} from "express"
const jwt = require("jsonwebtoken");
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.accessToken;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
