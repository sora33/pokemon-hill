"use client";

import { Box, Flex, NavLink, Stack } from "@mantine/core";
import { IconCalendar, IconUser, IconUsers } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = [
	{
		link: "/dashboard",
		label: "ダッシュボード",
		icon: IconCalendar,
		isAdmin: true,
	},
	{
		link: "/account",
		label: "アカウント",
		icon: IconUsers,
		isAdmin: true,
	},
	{
		link: "/profile",
		label: "プロフィール",
		icon: IconUser,
		isAdmin: false,
	},
];

export const Sidebar = () => {
	const pathname = usePathname();
	const isActive = (link: string) => pathname?.startsWith(link);

	return (
		<Flex direction="column" h="100%">
			<Box flex="1">
				<Stack gap="xs">
					{data.map((item) => {
						return (
							<NavLink
								component={Link}
								href={`${item.link}`}
								key={item.label}
								label={item.label}
								active={isActive(item.link)}
								variant="filled"
								fw={600}
								leftSection={<item.icon size={20} />}
								style={{
									borderRadius: "0.5rem",
								}}
							/>
						);
					})}
				</Stack>
			</Box>
			{/* <Divider my="md" w="100%" />
			<Stack gap="xs">
				{[
					{ href: "/download", label: "ダウンロード資料" },
					{ href: "/notice", label: "お知らせ" },
				].map((link) => (
					<NextjsAnchor
						key={link.href}
						fw={600}
						// href={`${link.href}?seminarType=${seminarType}`}
						href={`${link.href}`}
					>
						{link.label}
					</NextjsAnchor>
				))}
			</Stack> */}
		</Flex>
	);
};
