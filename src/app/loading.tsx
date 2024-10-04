import { Container, Flex, Loader, Stack } from "@mantine/core";

export default function Loading() {
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
					<Loader color="primary" />
				</Flex>
			</Stack>
		</Container>
	);
}
