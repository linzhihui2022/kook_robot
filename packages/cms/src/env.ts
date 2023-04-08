import { z } from "zod";

const envSchema = z.object({
  CONTENTFUL_TOKEN: z.string(),
  CONTENTFUL_SPACE: z.string(),
});
export const env = envSchema.parse(process.env);
export const url = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE}`;
