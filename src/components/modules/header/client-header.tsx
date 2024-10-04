import { Container, Flex, Box as MantineHeader, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

export const ClientHeader = () => {
	return (
		<MantineHeader h={60} bg="primary.5" component="header">
			<Container size="xl" maw={2000} h="100%">
				<Flex justify="space-between" align="center" h="100%" px="md">
					<Text component={Link} href="/" fw={600} c="white">
						{process.env.NEXT_PUBLIC_APP_TITLE}
					</Text>
				</Flex>
			</Container>
		</MantineHeader>
	);
};
