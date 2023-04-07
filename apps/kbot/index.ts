import { bot } from "./src/init";
import { gmsrMenu } from "./src/commands/gmsrMenu";

bot.message.on("text", async (msg) => {
  if (
    msg.mention.user.length >= 1 &&
    msg.mention.user.includes(msg.client.userId)
  ) {
    const args = msg.content.split(" ").slice(1);
    await bot.execute("gmsr", args, msg);
  }
});

bot.connect();
bot.addCommands(gmsrMenu);
bot.addAlias(gmsrMenu, "mxd", "gmsr", "gms", "@");
bot.logger.debug("system init success");
