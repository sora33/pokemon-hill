import { z } from "zod";
import { emailValidation } from "~/lib/zod";

export const changeEmailFormSchema = z.object({
	email: emailValidation.describe("メールアドレス"),
});

export type ChangeEmailFormSchema = z.infer<typeof changeEmailFormSchema>;
