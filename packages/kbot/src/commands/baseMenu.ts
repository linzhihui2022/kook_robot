import { AppCommand, AppFunc } from "kbotify";
import { $t } from "i18n";

class BaseMenu extends AppCommand {
  code = "base";
  trigger = "base";
  help = $t("base.help");
  intro = $t("base.intro");
  hitMap: Record<string, AppFunc> = {
    [$t("base.ping")]: (session) => session.quote($t("base.pong")),
    [$t("base.roll")]: (session) =>
      session.quote(`${Math.ceil(Math.random() * 100)}`),
  };

  func: AppFunc = async (session) => {
    const key = session.args[0];
    if (Object.keys(key).includes(key)) {
      return this.hitMap[session.args[0]]?.(session);
    }
    return session.send($t("system.wip"));
  };
}

export const baseMenu = new BaseMenu();
