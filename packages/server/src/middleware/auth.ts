import { env } from "../env";
import { RequestHandler } from "express-serve-static-core";
import { Express } from "express";

const { API_PASSWORD, API_USER } = env;
const token = `Basic ${Buffer.from(`${API_USER}:${API_PASSWORD}`).toString(
  "base64"
)}`;

export const authMiddle: RequestHandler = (req, res, next) => {
  const auth = req.headers["authorization"];
  const $t = req.$t;
  if (!auth) return res.status(401).json({ errors: [$t("system.401")] });
  if (auth !== token) {
    return res.status(403).json({ errors: [$t("system.403")] });
  }
  next();
};

export const setupAuthMiddle = (app: Express) => app.use(authMiddle);
