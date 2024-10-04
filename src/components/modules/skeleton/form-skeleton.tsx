import { Group, Skeleton, Stack } from "@mantine/core";

type FormSkeletonProps = {
	fields: number;
	maw?: number;
};

export function FormSkeleton({ fields = 8, maw = 800 }: FormSkeletonProps) {
	return (
		<Stack maw={maw} gap="md">
			{Array(fields)
				.fill(0)
				.map((_, index) => (
					<Stack key={index} gap="xs">
						<Skeleton height={20} width="30%" />
						<Skeleton height={36} />
					</Stack>
				))}
			<Group justify="flex-end">
				<Skeleton height={36} width="30%" mt="xl" />
			</Group>
		</Stack>
	);
}
