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
			header={{
				height: 60,
			}}
			padding="xl"
			// maw="1280px"
		>
			<AppShellMain>
				<Stack gap="lg" maw="800px" mx="auto">
					{children}
				</Stack>
			</AppShellMain>
		</AppShell>
	);
}
