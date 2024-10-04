"use client";

import {
	Button,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useTransition } from "react";
import { NextjsAnchor } from "~/components/ui/nextjs-anchor";
import { signUpAction } from "./action";
import { type SignUpFormSchema, signUpFormSchema } from "./schema";

export const SignUpForm = () => {
	const [isPending, startTransition] = useTransition();
	const form = useForm<SignUpFormSchema>({
		initialValues: {
			id: "",
			email: "",
			password: "",
			confirmPassword: "",
			name: "",
		},
		validate: zodResolver(signUpFormSchema),
	});

	const handleSubmit = async (values: SignUpFormSchema) => {
		// バリデーションエラーがある場合は処理を中断
		if (await form.validate().hasErrors) return;

		startTransition(async () => {
			try {
				await signUpAction(form.values);
				notifications.show({
					message:
						"仮登録が完了しました。メールを送信していますので、本登録をお願いします。",
				});
			} catch (error) {
				console.error(error);
				notifications.show({
					message: (error as Error).message || "登録に失敗しました。",
					color: "red",
				});
			}
		});
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			{/* 初期データ入力 */}
			{process.env.NODE_ENV === "development" && (
				<Button
					onClick={() =>
						form.setValues({
							email: `test${Math.floor(Math.random() * 1000000)}@example.com`,
							password: "Password1234",
							confirmPassword: "Password1234",
							name: "田中",
						})
					}
				>
					validate
				</Button>
			)}
			<Stack>
				<Title order={2}>新規登録</Title>
				<Text size="sm" c="dimmed">
					すでにアカウントをお持ちですか？{" "}
					<NextjsAnchor href="/auth/sign-in">ログイン</NextjsAnchor>
				</Text>
				<TextInput
					label="担当者名"
					name="name"
					required
					{...form.getInputProps("name")}
				/>
				<TextInput
					label="メールアドレス"
					type="email"
					name="email"
					required
					{...form.getInputProps("email")}
				/>
				<PasswordInput
					label="パスワード"
					type="password"
					name="password"
					required
					{...form.getInputProps("password")}
				/>
				<PasswordInput
					label="確認用パスワード"
					type="password"
					name="confirmPassword"
					required
					{...form.getInputProps("confirmPassword")}
				/>

				<Button type="submit" loading={isPending}>
					登録する
				</Button>
			</Stack>
		</form>
	);
};
