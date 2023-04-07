import { AppCommand, AppFunc } from "kbotify";
import { $t } from "i18n";

class GmsrMenu extends AppCommand {
  code = $t("gmsr.code");
  trigger = $t("gmsr.trigger");
  help = $t("gmsr.help");
  intro = $t("gmsr.intro");
  func: AppFunc = async (session) => {
    return session.quote($t("gmsr.not_found"));
  };
}

export const gmsrMenu = new GmsrMenu();
