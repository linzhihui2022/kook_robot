import { z } from "zod";

const envSchema = z.object({
  MVP_MESSAGE_CHANNELS: z
    .string()
    .regex(/^(\d*,\d*)*$/)
    .transform((v) => [...new Set(v.split(","))]),
  API_USER: z.string(),
  API_PASSWORD: z.string(),
  MAX_MAINTENANCE_PAGE: z.string().regex(/^\d*$/).transform(Number),
});
export const env = envSchema.parse(process.env);
