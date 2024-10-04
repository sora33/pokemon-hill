import {
	AppShell,
	AppShellHeader,
	AppShellMain,
	AppShellNavbar,
	Stack,
} from "@mantine/core";
import { Header } from "~/components/modules/header";
import { Sidebar } from "~/components/modules/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<AppShell
			navbar={{
				width: 200,
				breakpoint: "base",
			}}
			header={{
				height: 60,
			}}
			padding="xl"
			// maw="1280px"
		>
			<AppShellHeader>
				<Header />
			</AppShellHeader>
			<AppShellNavbar p="md">
				<Sidebar />
			</AppShellNavbar>
			<AppShellMain>
				<Stack gap="lg">{children}</Stack>
			</AppShellMain>
		</AppShell>
	);
}
