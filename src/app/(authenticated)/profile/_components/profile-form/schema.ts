import type { z } from "zod";
import { userSchema } from "~/schema/user-schema";

export const profileFormSchema = userSchema;

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
