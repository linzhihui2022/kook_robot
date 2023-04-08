import { GmsrMenu } from "kbot";
import { contentful } from "cms";
import { Card } from "kbotify";
import { CardObject, Theme } from "kbotify/dist/core/card";
import { typedBoolean } from "helper";
import { getMaintenance } from "crawler";
import { $t } from "i18n";
import { env } from "../env";

export const gmsrMenu = new GmsrMenu({
  getCard: async (slug) => {
    const card = new Card();
    const cms = await contentful().fetchCard(slug);
    if (!cms) return card;
    const { size, theme, modulesCollection } = cms;
    size && card.setSize(size as CardObject["size"]);
    theme && card.setTheme(theme as Theme);
    if (modulesCollection?.items) {
      const cardModule: (
        | {
            func: "addTitle";
            params: Parameters<Card["addTitle"]>;
          }
        | { func: "addDivider"; params: Parameters<Card["addDivider"]> }
        | { func: "addText"; params: Parameters<Card["addText"]> }
      )[] = [];

      modulesCollection?.items.forEach((module, index, array) => {
        const divider =
          (module?.divider as "both" | "top" | "bottom" | "none") || "none";
        if (
          ["top", "both"].includes(divider) &&
          cardModule.at(-1)?.func !== "addDivider" &&
          index !== 0
        ) {
          cardModule.push({ func: "addDivider", params: [] });
        }
        switch (module?.__typename) {
          case "HeaderModule": {
            cardModule.push({
              func: "addTitle",
              params: [module?.content || "", !!module?.emoji],
            });
            break;
          }
          case "SectionModule": {
            const image =
              module.accessory?.imageUrl || module.accessory?.image?.url;
            const accessory = image
              ? {
                  type: "image",
                  src: image,
                  size: module.accessory?.size || "lg",
                }
              : undefined;
            module.content
              ?.split("\n")
              .filter(typedBoolean)
              .forEach((content, index) => {
                cardModule.push({
                  func: "addText",
                  params: [
                    content || "",
                    !!module.emoji,
                    (module?.mode as "right" | "left") || "left",
                    index === 0 && accessory,
                  ],
                });
              });
            break;
          }
        }
        if (
          ["bottom", "both"].includes(divider) &&
          index !== array.length - 1
        ) {
          cardModule.push({ func: "addDivider", params: [] });
        }
      });
      cardModule.forEach((module) => {
        switch (module.func) {
          case "addDivider":
            return card.addDivider();
          case "addText":
            return card.addText(...module.params);
          case "addTitle":
            return card.addTitle(...module.params);
        }
      });
    }
    return card;
  },
  getMaintenance: async ({ page, after }, fallback) => {
    const res = await getMaintenance(page, after);
    const card = new Card();
    card.setSize("lg");
    const returnVal = {
      type: "maintenance",
      last: { after: "", page: 1 },
    };
    const button = {
      type: "button",
      theme: "primary",
      value: JSON.stringify(returnVal),
      click: "return-val",
      text: {
        type: "plain-text",
        content: "",
      },
    };
    if (res) {
      card.setTheme("secondary");
      card.addTitle($t("gmsr.maintenance.title", { title: res.title }));
      if (res.index === 5) {
        returnVal.last.page = page + 1;
        returnVal.last.after = "";
      } else {
        returnVal.last.page = page;
        returnVal.last.after = res.link;
      }
      button.value = JSON.stringify(returnVal);
      button.text.content = $t("system.next");
      card.addText(res.text, false, "right", {
        type: "button",
        theme: "info",
        value: res.fullLink,
        click: "link",
        text: {
          type: "plain-text",
          content: $t("system.read_more"),
        },
      });
      card.addText("", false, "right", button);
    } else {
      card.setTheme("warning");
      button.text.content = $t("system.retry");
      returnVal.last.page = page + 1;
      returnVal.last.after = "";
      button.value = JSON.stringify(returnVal);
      if (page > env.MAX_MAINTENANCE_PAGE) {
        card.addText($t("gmsr.maintenance.notFound"), false, "right");
      } else {
        return fallback(returnVal.last);
        // card.addText($t("gmsr.maintenance.notFound"), false, "right", button);
      }
    }
    return card;
  },
});
