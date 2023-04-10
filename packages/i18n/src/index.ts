import { z } from "zod";
import zh from "./zh";
import en from "./en";
import get from "lodash/get";
import { Lang } from "./type";
import { NestedKeyOf } from "helper";

const envSchema = z.object({
  KOOK_LANG: z.enum(["zh", "en"]).default("zh"),
});
const env = envSchema.parse(process.env);
const transitions: Record<string, Lang> = {
  zh,
  en,
};

export const $t = (
  key: NestedKeyOf<Lang>,
  replace: Record<string, string> = {}
) =>
  ((get(transitions[env.KOOK_LANG], key) as string) || key)?.replace(
    /{{([^}]+)}}/g,
    (ori, k) => replace[k] || ori
  );
