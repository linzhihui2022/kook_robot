import express from "express";
import { authMiddle, i18nMiddle, setupMiddleware } from "server";
import { botMiddle, botWebhookRouter } from "./src/middleware/bot";
import { bot } from "./src/bot";

const app = express();
const PORT = 3000;

setupMiddleware(app, [i18nMiddle, authMiddle, botMiddle(bot)]);
app.use("/webhook/mvp", botWebhookRouter);

app.listen(PORT, () => {
  bot.connect();
  console.log(`Example app listening on port ${PORT}`);
  console.log(`bot app run success`);
});
