import {
	Avatar,
	Group,
	Stack,
	Table,
	TableTbody,
	TableTd,
	TableTh,
	TableThead,
	TableTr,
	Text,
	Title,
} from "@mantine/core";
import { Suspense } from "react";
import { TableSkeleton } from "~/components/modules/skeleton/table-skeleton";
import { prisma } from "~/lib/prisma";

export default function Page() {
	return (
		<Stack gap="xl" maw={800}>
			<Title order={1}>アカウント管理</Title>
			<Suspense fallback={<TableSkeleton />}>
				<UserList />
			</Suspense>
		</Stack>
	);
}

async function UserList() {
	const users = await prisma.user.findMany({
		orderBy: { createdAt: "desc" },
	});
	return (
		<Table>
			<TableThead>
				<TableTr>
					<TableTh>ユーザー</TableTh>
					<TableTh>メールアドレス</TableTh>
					<TableTh>作成日</TableTh>
					<TableTh>更新日</TableTh>
				</TableTr>
			</TableThead>
			<TableTbody>
				{users.map((user) => (
					<TableTr key={user.id}>
						<TableTd>
							<Group gap="md">
								<Avatar color="blue" radius="xl">
									{user.name?.charAt(0)}
								</Avatar>
								<Text fw={600}>{user.name}</Text>
							</Group>
						</TableTd>
						<TableTd>{user.email}</TableTd>
						<TableTd>{user.createdAt?.toLocaleString()}</TableTd>
						<TableTd>{user.updatedAt?.toLocaleString()}</TableTd>
					</TableTr>
				))}
			</TableTbody>
		</Table>
	);
}
