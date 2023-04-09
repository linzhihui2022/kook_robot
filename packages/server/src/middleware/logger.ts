import { RequestHandler } from "express-serve-static-core";
import { Express } from "express";
import { Logger } from "logger";

export const loggerMiddle =
  (logger: Logger): RequestHandler =>
  (req, res, next) => {
    req.logger = logger;
    next();
  };

export const setupLoggerMiddle = (app: Express, logger: Logger) =>
  app.use(loggerMiddle(logger));
