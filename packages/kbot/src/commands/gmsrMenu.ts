import { AppCommand, AppFunc } from "kbotify";
import { $t } from "i18n";
import { Card, CardObject } from "kbotify/dist/core/card";

export class GmsrMenu extends AppCommand {
  code = $t("gmsr.code");
  trigger = $t("gmsr.trigger");
  help = $t("gmsr.help");
  intro = $t("gmsr.intro");

  constructor(public api: { getCard: (slug: string) => Promise<Card> }) {
    super();
  }

  func: AppFunc = async (session) => {
    const fun = session.args[0];
    if (!fun) return session.quote($t("gmsr.empty"));
    switch (fun) {
      case $t("gmsr.cmd"): {
        return session.sendCard(await this.api.getCard("gmsr_help_card"));
      }
    }
    return session.quote($t("gmsr.not_found"));
  };
}
