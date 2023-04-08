import { RequestHandler } from "express-serve-static-core";
import { $t } from "i18n";
import { Express } from "express";

export const i18nMiddle: RequestHandler = (req, res, next) => {
  req.$t = $t;
  next();
};

export const setupI18nMiddle = (app: Express) => app.use(i18nMiddle);
