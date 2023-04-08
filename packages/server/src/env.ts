import { z } from "zod";

const envSchema = z.object({
  API_USER: z.string(),
  API_PASSWORD: z.string(),
});
export const env = envSchema.parse(process.env);
