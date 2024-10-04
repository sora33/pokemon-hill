"use client";

import { Notification, createTheme, rem } from "@mantine/core";

export const theme = createTheme({
	/* Put your mantine theme override here */
	primaryColor: "primary",
	focusRing: "auto",
	colors: {
		primary: [
			"#e5f4ff",
			"#cde2ff",
			"#9bc2ff",
			"#64a0ff",
			"#3984fe",
			"#1d72fe",
			"#0969ff",
			"#0058e4",
			"#004ecc",
			"#0043b5",
		],
	},
	components: {
		Notification: Notification.extend({
			defaultProps: {
				color: "blue",
			},
		}),
	},
	headings: {
		fontWeight: "600",
		sizes: {
			h1: { fontSize: rem(24) },
			h2: { fontSize: rem(16) },
		},
	},
});
