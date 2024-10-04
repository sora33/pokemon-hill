import { Button, PasswordInput, Stack, Text, Title } from "@mantine/core";
import { redirect } from "next/navigation";
import { resetPasswordAction } from "~/app/auth/actions";
import { FormMessage, type Message } from "~/components/modules/form-message";
import { createServerClient } from "~/lib/supabase/server";

export default async function ResetPassword({
	searchParams,
}: {
	searchParams: Message;
}) {
	const supabase = createServerClient();
	const user = await supabase.auth.getUser();

	if (user.error) {
		return redirect("/auth/sign-in");
	}

	return (
		<form>
			<Stack>
				<Title order={2}>パスワードリセット</Title>
				<Text size="sm" c="dimmed">
					以下に新しいパスワードを入力してください。
				</Text>
				<PasswordInput
					label="新しいパスワード"
					name="password"
					placeholder="新しいパスワード"
					required
				/>
				<PasswordInput
					label="パスワードの確認"
					name="confirmPassword"
					placeholder="パスワードの確認"
					required
				/>
				<Button type="submit" formAction={resetPasswordAction}>
					パスワードを更新
				</Button>
				<FormMessage message={searchParams} />
			</Stack>
		</form>
	);
}
