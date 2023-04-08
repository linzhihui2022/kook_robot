import express from "express";
import { authMiddle, i18nMiddle, setupMiddleware } from "server";
import { botMiddle, botWebhookRouter } from "./src/middleware/bot";
import { bot } from "./src/bot";
import { getMessages } from "./src/api/get-messages";
import { getEvents } from "./src/api/get-events";

const app = express();
const PORT = 3000;

setupMiddleware(app, [i18nMiddle, authMiddle, botMiddle(bot)]);

app.use("/webhook/mvp", botWebhookRouter);
app.use("/events", getEvents);
app.use("/messages", getMessages);

app.listen(PORT, () => {
  bot.connect();
  console.log(`Example app listening on port ${PORT}`);
  console.log(`bot app run success`);
});
