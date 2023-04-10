import { RequestHandler } from "express-serve-static-core";
import { KBotify } from "KBotify";
import { env } from "../env";
import { MessageType } from "kaiheila-bot-root/dist/types/MessageType";

export const botMiddle =
  (bot: KBotify): RequestHandler =>
  (req, res, next) => {
    req.bot = bot;
    next();
  };

export const botWebhookRouter: RequestHandler = (req, res) => {
  const message = (req.query.msg as string) || req.$t("system.hello");
  Promise.all(
    env.MVP_MESSAGE_CHANNELS.map((channel) =>
      req.bot.API.message.create(MessageType.text, channel, message)
    )
  )
    .then(() => {
      res.send(message);
    })
    .catch((e) => {
      res.status(400).json({ errors: [e.toString()] });
    });
};
