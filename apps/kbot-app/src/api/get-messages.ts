import { RequestHandler } from "express-serve-static-core";
import { logger } from "../logger";

export const getMessages: RequestHandler = (req, res) => {
  if (req.method.toUpperCase() !== "GET") return res.status(405).send();
  const after = +(req.query.after as string) || 0;
  const data = logger.getMessage(after);
  res.status(200).json({ data });
};
