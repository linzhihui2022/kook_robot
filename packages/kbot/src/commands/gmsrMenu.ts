import { AppCommand, AppFunc } from "kbotify";
import { $t } from "i18n";
import { Card } from "kbotify/dist/core/card";

export class GmsrMenu extends AppCommand {
  code = "gmsr";
  trigger = "gmsr";
  help = $t("gmsr.help");
  intro = $t("gmsr.intro");
  hitMap: Record<string, AppFunc> = {
    [$t("gmsr.cmd")]: async (session) =>
      session.sendCard(await this.api.getCard("gmsr_help_card")),
  };

  constructor(public api: { getCard: (slug: string) => Promise<Card> }) {
    super();
  }

  func: AppFunc = async (session) => this.hitMap[session.args[0]]?.(session);
}
