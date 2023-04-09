import express from "express";
import {
  authMiddle,
  i18nMiddle,
  setupMiddleware,
  getEvents,
  getEventsRoute,
  getMessages,
  getMessagesRoute,
} from "server";
import { botMiddle, botWebhookRouter } from "./src/middleware/bot";
import { bot } from "./src/bot";
import { loggerMiddle } from "server/src/middleware/logger";
import { logger } from "./src/logger";

const app = express();
const PORT = 8001;

setupMiddleware(app, [
  i18nMiddle,
  authMiddle,
  loggerMiddle(logger),
  botMiddle(bot),
]);

app.get("/webhook/mvp", botWebhookRouter);
app.get(getEventsRoute, getEvents);
app.get(getMessagesRoute, getMessages);

app.listen(PORT, () => {
  bot.connect();
  console.log(`Example app listening on port ${PORT}`);
  console.log(`bot app run success`);
});
