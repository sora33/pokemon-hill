import { z } from "zod";

// パスワードのバリデーション
export const passwordValidation = z
	.string()
	.min(8, "パスワードは8文字以上で入力してください")
	.max(50, "パスワードは50文字以下で入力してください")
	.regex(
		/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d!@#$%^&*().,?<>]{8,50}$/,
		"大文字英字、小文字英字、数字を混合して8文字以上で入力してください",
	);

// 必須項目
export const requiredValidation = (maxLength = 50) =>
	z
		.string()
		.trim()
		.min(1, "入力してください")
		.max(maxLength, `${maxLength}文字以下で入力してください`);

// 電話番号のバリデーション
export const phoneValidation = z
	.string()
	.regex(/^\d{10,11}$/, "半角数字で10桁または11桁で入力してください");

// メールアドレスのバリデーション
export const emailValidation = z
	.string()
	.email("メールアドレスの形式で入力してください");

// 利用規約
export const termsValidation = z.boolean().refine((value) => value === true, {
	message: "利用規約に同意してください",
});

// プライバシーポリシー
export const privacyPolicyValidation = z
	.boolean()
	.refine((value) => value === true, {
		message: "プライバシーポリシーに同意してください",
	});
