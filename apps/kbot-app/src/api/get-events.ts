import { RequestHandler } from "express-serve-static-core";
import { logger } from "../logger";

export const getEvents: RequestHandler = (req, res) => {
  if (req.method.toUpperCase() !== "GET") return res.status(405).send();
  const after = +(req.query.after as string) || 0;
  const data = logger.getEvent(after);
  res.status(200).json({ data });
};
