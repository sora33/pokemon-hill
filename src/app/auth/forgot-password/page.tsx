import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import { forgotPasswordAction } from "~/app/auth/actions";
import { FormMessage, type Message } from "~/components/modules/form-message";
import { NextjsAnchor } from "~/components/ui";

export default function ForgotPassword({
	searchParams,
}: {
	searchParams: Message;
}) {
	return (
		<form>
			<Stack>
				<Title order={2}>パスワードリセット</Title>
				<Text size="sm" c="dimmed">
					すでにアカウントをお持ちですか？{" "}
					<NextjsAnchor href="/auth/sign-in">ログイン</NextjsAnchor>
				</Text>
				<TextInput
					label="メールアドレス"
					type="email"
					name="email"
					placeholder="you@example.com"
					required
				/>
				<Button type="submit" formAction={forgotPasswordAction}>
					パスワードをリセット
				</Button>
				<FormMessage message={searchParams} />
			</Stack>
		</form>
	);
}
