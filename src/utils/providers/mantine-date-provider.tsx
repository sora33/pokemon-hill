"use client";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/ja";

export const MantineDateProvider = ({
	children,
}: { children: React.ReactNode }) => {
	return (
		<DatesProvider
			settings={{
				locale: "ja",
				firstDayOfWeek: 0,
			}}
		>
			{children}
		</DatesProvider>
	);
};
