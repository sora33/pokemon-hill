import { Container, Stack } from "@mantine/core";
import type React from "react";
import { Footer } from "~/components/modules/footer";
import { Header } from "~/components/modules/header";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<Container mt="xl" pb="6rem">
				<Stack gap="sm" flex="1" pt="md">
					<Container size="xs" w="100%">
						<Stack gap="md" py="md">
							{children}
						</Stack>
					</Container>
				</Stack>
			</Container>
			<Footer />
		</>
	);
}
