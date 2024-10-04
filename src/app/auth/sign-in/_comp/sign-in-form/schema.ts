import { z } from "zod";
import { requiredValidation } from "~/lib/zod";

export const signInFormSchema = z.object({
	email: requiredValidation(50).email("有効なメールアドレスを入力してください"),
	password: requiredValidation(50),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
