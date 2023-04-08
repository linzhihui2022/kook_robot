import { GmsrMenu } from "kbot";
import { contentful } from "cms";
import { Card } from "kbotify";
import { CardObject, Theme } from "kbotify/dist/core/card";
import { typedBoolean } from "helper";

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
});
