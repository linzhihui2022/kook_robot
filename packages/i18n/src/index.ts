import { z } from "zod";
import zh from "./zh.json";
import en from "./en.json";
import get from "lodash/get";

const envSchema = z.object({
  LANG: z.enum(["zh", "en"]).default("zh"),
});
const env = envSchema.parse(process.env);
type Transition = Record<string, Record<string, string> | string>;
const transitions: Record<string, Transition> = {
  zh,
  en,
};

export const $t = (key: string, lang: string = env.LANG) =>
  (get(transitions[lang || env.LANG], key) as string) || key;
