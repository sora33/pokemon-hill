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
import { FormMessage, type Message } from "~/components/modules/form-message";
import { NextjsAnchor } from "~/components/ui";
import { signInAction } from "./action";
import { type SignInFormSchema, signInFormSchema } from "./schema";

type Props = {
	searchParams: Message;
};

export const SignInForm = ({ searchParams }: Props) => {
	const [isPending, startTransition] = useTransition();
	const form = useForm<SignInFormSchema>({
		initialValues: {
			email: process.env.NODE_ENV === "development" ? "admin@example.com" : "",
			password: process.env.NODE_ENV === "development" ? "Admin1234" : "",
		},
		validate: zodResolver(signInFormSchema),
	});

	const handleSubmit = async (values: SignInFormSchema) => {
		if (await form.validate().hasErrors) return;

		startTransition(async () => {
			try {
				const result = await signInAction(form.values);
				if (result.type === "success") {
					window.location.href = "/";
				}
			} catch (error) {
				notifications.show({
					message: "メールアドレスまたはパスワードが間違っています。",
					color: "red",
				});
				console.error(error);
			}
		});
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack>
				<Title order={2}>ログイン</Title>
				<Text size="sm" c="dimmed">
					アカウントをお持ちでない方は{" "}
					<NextjsAnchor href="/auth/sign-up">新規登録</NextjsAnchor>
				</Text>
				<TextInput
					label="メールアドレス"
					type="email"
					placeholder="you@example.com"
					required
					{...form.getInputProps("email")}
				/>
				<PasswordInput
					label="パスワード"
					placeholder="パスワードを入力"
					required
					{...form.getInputProps("password")}
				/>
				<Text size="xs" ta="right">
					<NextjsAnchor href="/auth/forgot-password">
						パスワードをお忘れですか？
					</NextjsAnchor>
				</Text>
				<Button type="submit" loading={isPending}>
					ログイン
				</Button>
				<FormMessage message={searchParams} />
			</Stack>
		</form>
	);
};
