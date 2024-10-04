"use client";

import { Button, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useTransition } from "react";
import { updateProfileAction } from "./action";
import { type ChangeEmailFormSchema, changeEmailFormSchema } from "./schema";

type Props = {
	email: string;
};

export const ChangeEmailForm = ({ email }: Props) => {
	const [isPending, startTransition] = useTransition();
	const form = useForm<ChangeEmailFormSchema>({
		initialValues: {
			email,
		},
		validate: zodResolver(changeEmailFormSchema),
	});

	const handleSubmit = async (values: ChangeEmailFormSchema) => {
		if (await form.validate().hasErrors) return;

		startTransition(async () => {
			try {
				await updateProfileAction(values);
				notifications.show({
					message: "新しいメールアドレス宛に、確認メールを送信しました。",
				});
			} catch (error) {
				notifications.show({
					message: "メールアドレスの更新に失敗しました。",
					color: "red",
				});
				console.error(error);
			}
		});
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack maw={800}>
				<TextInput
					label="現在のメールアドレス"
					name="email"
					value={email}
					disabled
					required
				/>
				<TextInput
					label="新しいメールアドレス"
					description="フォームに入力したメールアドレスに、確認メールが送信されます。"
					name="email"
					required
					{...form.getInputProps("email")}
				/>
				<Button type="submit" loading={isPending} disabled={isPending}>
					メールアドレスを変更する
				</Button>
			</Stack>
		</form>
	);
};
