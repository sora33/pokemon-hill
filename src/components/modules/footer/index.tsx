import { Container, Flex, Box as MantineFooter, Text } from "@mantine/core";

export const Footer = () => {
	return (
		<MantineFooter h={60}>
			<Container size="xl" h="100%">
				<Flex align="center" justify="center" h="100%" gap="md">
					<Text size="xs">Powered by {process.env.NEXT_PUBLIC_APP_TITLE}</Text>
				</Flex>
			</Container>
		</MantineFooter>
	);
};
