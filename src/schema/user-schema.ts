import { z } from "zod";
import { requiredValidation } from "~/lib/zod";

export const userSchema = z.object({
	id: z.string().optional().describe("ID"),
	name: requiredValidation(50).describe("名前"),
});

export type UserSchema = z.infer<typeof userSchema>;
