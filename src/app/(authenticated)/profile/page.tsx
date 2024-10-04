import { Paper, Stack, Text, Title } from "@mantine/core";
import type { User } from "@prisma/client";
import { Suspense } from "react";
import { FormSkeleton } from "~/components/modules/skeleton/form-skeleton";
import { getCurrentUser } from "~/utils/auth/get-current-user";
import { ChangeEmailForm } from "./_components/change-email-form";
import { ProfileForm } from "./_components/profile-form";

export default async function ProfilePage() {
	return (
		<Stack gap="xl" maw={800}>
			<Title order={1}>プロフィール</Title>
			<Suspense fallback={<FormSkeleton fields={2} />}>
				<ProfileFormWrapper />
			</Suspense>
		</Stack>
	);
}

const ProfileFormWrapper = async () => {
	const { currentUser } = await getCurrentUser();
	if (!currentUser) return <Text>ユーザーが見つかりません。</Text>;

	const userMetadata = {
		id: currentUser.id,
		name: currentUser.user_metadata.name,
	} as Omit<User, "createdAt" | "updatedAt" | "email">;

	return (
		<Stack gap="xl">
			<Paper withBorder p="lg">
				<Stack>
					<Title order={2}>プロフィール情報</Title>
					<ProfileForm currentUser={userMetadata} />
				</Stack>
			</Paper>
			<Paper withBorder p="lg">
				<Stack>
					<Title order={2}>メールアドレス変更</Title>
					<ChangeEmailForm email={currentUser.email ?? ""} />
				</Stack>
			</Paper>
		</Stack>
	);
};
