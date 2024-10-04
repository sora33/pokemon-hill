import { Box, Button, Code, Stack, TextInput, Title } from "@mantine/core";
import { createServerClient } from "~/lib/supabase";
const updateUserMetadata = async (formData: FormData) => {
	"use server";
	const supabase = createServerClient();
	const name = formData.get("name")?.toString();
	const { error } = await supabase.auth.updateUser({
		data: { name: name },
	});

	if (error) {
		console.error(error);
		return { error: error.message };
	}

	return { success: "ユーザーメタデータが更新されました" };
};

export default async function Page() {
	const supabase = createServerClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<Stack gap="xl">
			<Box>
				<Title order={2} mb="md">
					ダッシュボード
				</Title>
				<Code block>{JSON.stringify(user, null, 2)}</Code>
			</Box>
			<Box>
				<Title order={2} mb="md">
					メタデータの更新
				</Title>
				<form action={updateUserMetadata}>
					<Stack>
						<TextInput
							label="名前"
							name="name"
							placeholder="名前を入力"
							defaultValue={user?.user_metadata.name ?? ""}
							required
						/>
						<Button type="submit">更新</Button>
					</Stack>
				</form>
			</Box>
		</Stack>
	);
}
