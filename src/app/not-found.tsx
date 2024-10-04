import { Button, Container, Flex, Stack, Text, Title } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import Link from "next/link";
import { RouterBakcButton } from "~/components";

export default async function NotFound() {
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
					<Title order={2}>404 Not Found</Title>
					<Text c="gray" size="sm">
						申し訳ございません。
						<br />
						お探しのページが見つかりませんでした。
					</Text>
					<Flex gap="md">
						<RouterBakcButton />
						<Button component={Link} href="/">
							トップページへ
						</Button>
					</Flex>
				</Flex>
			</Stack>
		</Container>
	);
}
