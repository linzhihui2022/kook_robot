import { z } from "zod";
import zh from "./zh.json";
import get from "lodash/get";

const envSchema = z.object({
  LANG: z.enum(["zh"]).default("zh"),
});
const lang = envSchema.parse(process.env).LANG;
type Transition = Record<string, Record<string, string> | string>;
const transitions: Record<string, Transition> = {
  zh,
};

export const $t = (key: string) => get(transitions[lang], key) as string;
