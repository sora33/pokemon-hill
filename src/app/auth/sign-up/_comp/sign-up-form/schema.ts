import type { z } from "zod";
import {
	emailValidation,
	passwordValidation,
	requiredValidation,
} from "~/lib/zod";
import { userSchema } from "~/schema/user-schema";

export const signUpFormSchema = userSchema
	.extend({
		email: emailValidation.describe("メールアドレス"),
		password: passwordValidation,
		confirmPassword: requiredValidation(50).describe("確認用パスワード"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "パスワードが一致しません",
		path: ["confirmPassword"],
	});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
