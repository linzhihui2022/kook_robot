import { AppCommand, AppFunc } from "kbotify";
import { $t } from "i18n";

class BaseMenu extends AppCommand {
  code = $t("base.code");
  trigger = $t("base.trigger");
  help = $t("base.help");
  intro = $t("base.intro");
  func: AppFunc = async (session) => {
    return session.quote($t("base.pong"));
  };
}

export const baseMenu = new BaseMenu();
