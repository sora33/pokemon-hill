import { type AnchorProps, Anchor as MantineAnchor } from "@mantine/core";
import Link from "next/link";

type Props = AnchorProps & {
	children: React.ReactNode;
	href: string;
};

export const NextjsAnchor = ({ children, href, ...props }: Props) => {
	return (
		<MantineAnchor component={Link} {...props} href={href}>
			{children}
		</MantineAnchor>
	);
};
