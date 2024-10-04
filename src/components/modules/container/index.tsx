import {
	type ContainerProps,
	Container as MantineContainer,
} from "@mantine/core";

type Props = ContainerProps & {
	children: React.ReactNode;
};

export const Container = (props: Props) => {
	return (
		<MantineContainer size="md" {...props}>
			{props.children}
		</MantineContainer>
	);
};
