"use client";
import {
	Button,
	Container,
	Flex,
	Paper,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import { RouterBakcButton } from "~/components";

export default function ErrorComponent({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<Container size="sm" pb="6rem">
			<Stack gap="sm" flex="1" pt="md">
				<Flex
					align="center"
					justify="center"
					direction="column"
					gap="sm"
					h="60vh"
				>
					<IconMoodSad color="gray" />
					<Title order={2}>サーバーエラーになりました。</Title>
					<Paper withBorder p="md" w="240px">
						<Text c="red" size="sm" fw="bold">
							エラーメッセージ
						</Text>
						<Text c="red" size="sm">
							{error.message}
						</Text>
					</Paper>
					<Text c="gray" size="sm">
						申し訳ございません。
						<br />
						数分後に再度操作を行ってください。
					</Text>
					<Flex gap="md">
						<RouterBakcButton />
						<Button onClick={reset}>リロード</Button>
					</Flex>
				</Flex>
			</Stack>
		</Container>
	);
}
