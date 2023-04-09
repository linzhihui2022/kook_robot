import { z } from "zod";

const envSchema = z.object({
  API_USER: z.string(),
  API_PASSWORD: z.string(),
  EXPRESS_API: z.string().regex(/[^/]$/),
});
export const env = envSchema.parse(process.env);
