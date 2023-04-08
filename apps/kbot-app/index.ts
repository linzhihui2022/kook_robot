import kbotInit, { baseMenu, GmsrMenu, KBotify } from "kbot";
import { $t } from "i18n";
import { contentful } from "cms";
import { gmsrMenu } from "./src/commands/gmsr";

export const bot: KBotify = kbotInit();

bot.message.on("text", async (msg) => {
  if (
    msg.mention.user.length >= 1 &&
    msg.mention.user.includes(msg.client.userId)
  ) {
    const args = msg.content.split(" ").slice(1);
    if (args[0] === $t("base.ping")) {
      await bot.execute("base", args, msg);
      return;
    }
    await bot.execute("gmsr", args, msg);
  }
});

bot.addCommands(baseMenu);
bot.addCommands(gmsrMenu);
bot.connect();
