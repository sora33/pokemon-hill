"use client";

import { Button, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import type { User } from "@prisma/client";
import { useTransition } from "react";
import { updateProfileAction } from "./action";
import { type ProfileFormSchema, profileFormSchema } from "./schema";

type Props = {
	currentUser: Omit<User, "createdAt" | "updatedAt" | "email">;
};

export const ProfileForm = ({ currentUser }: Props) => {
	const [isPending, startTransition] = useTransition();
	const form = useForm<ProfileFormSchema>({
		initialValues: {
			...currentUser,
		},
		validate: zodResolver(profileFormSchema),
	});

	const handleSubmit = async (values: ProfileFormSchema) => {
		if (await form.validate().hasErrors) return;

		startTransition(async () => {
			try {
				await updateProfileAction(values);
				notifications.show({
					message: "プロフィールを更新しました。",
				});
			} catch (error) {
				notifications.show({
					message: "プロフィールの更新に失敗しました。",
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
					label="名前"
					name="name"
					required
					{...form.getInputProps("name")}
				/>
				<Button type="submit" loading={isPending} disabled={isPending}>
					更新する
				</Button>
			</Stack>
		</form>
	);
};
