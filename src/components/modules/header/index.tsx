import {
	Button,
	Container,
	Flex,
	Group,
	Box as MantineHeader,
	Text,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { signOutAction } from "~/app/auth/actions";
import { createServerClient } from "~/lib/supabase/server";

export const Header = async () => {
	const res = await createServerClient().auth.getUser();
	const user = res?.data?.user;

	return (
		<MantineHeader h={60} bg="gray.1">
			<Container size="xl" maw={2000} h="100%">
				<Flex justify="space-between" align="center" h="100%" px="md">
					<Text component={Link} href="/" fw={600}>
						{process.env.NEXT_PUBLIC_APP_TITLE}
					</Text>
					<Group>
						{user ? (
							<Flex gap="md" align="center">
								<form action={signOutAction}>
									<Button type="submit" variant="outline" size="sm">
										ログアウト
									</Button>
								</form>
							</Flex>
						) : (
							<Group>
								<Button component={Link} href="/auth/sign-in" size="sm">
									ログイン
								</Button>
								<Button
									variant="outline"
									component={Link}
									href="/auth/sign-up"
									size="sm"
								>
									新規登録
								</Button>
							</Group>
						)}
					</Group>
				</Flex>
			</Container>
		</MantineHeader>
	);
};
