import { Express } from "express";

import { RequestHandler } from "express-serve-static-core";

export const setupMiddleware = (app: Express, middlewares: RequestHandler[]) =>
  middlewares.forEach((m) => app.use(m));

export * from "./auth";
export * from "./i18n";
