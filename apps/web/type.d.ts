import { KBotify } from "kbotify";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Logger } from "logger";

declare global {
  namespace Express {
    interface Request<
      P = ParamsDictionary,
      ResBody = any,
      ReqBody = any,
      ReqQuery = ParsedQs,
      LocalsObj extends Record<string, any> = Record<string, any>
    > extends Request<P, ResBody, ReqBody, ReqQuery, LocalsObj> {
      $t: typeof $t;
      bot: KBotify;
      logger: Logger;
    }
  }
}
