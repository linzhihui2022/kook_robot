import { AppCommand, AppFunc } from "kbotify";
import { $t } from "i18n";

class BaseMenu extends AppCommand {
  code = "base";
  trigger = "base";
  help = $t("base.help");
  intro = $t("base.intro");
  func: AppFunc = async (session) => {
    return session.quote($t("base.pong"));
  };
}

export const baseMenu = new BaseMenu();
