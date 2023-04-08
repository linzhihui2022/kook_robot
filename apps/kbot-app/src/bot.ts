import kbotInit, { baseMenu, KBotify } from "kbot";
import { gmsrMenu } from "./commands/gmsr";

export const bot: KBotify = kbotInit();

bot.message.on("text", async (msg) => {
  if (
    msg.mention.user.length >= 1 &&
    msg.mention.user.includes(msg.client.userId)
  ) {
    const args = msg.content.split(" ").slice(1);
    let hit = false;
    for (const menu of [baseMenu, gmsrMenu]) {
      if (Object.keys(menu.hitMap).includes(args[0])) {
        hit = true;
        await bot.execute(menu.code, args, msg);
      }
    }
    if (!hit) {
      await bot.execute(baseMenu.code, args, msg);
    }
  }
});

bot.addCommands(baseMenu);
bot.addCommands(gmsrMenu);
