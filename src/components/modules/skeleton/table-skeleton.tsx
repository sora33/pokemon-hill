import {
	Skeleton,
	Stack,
	Table,
	TableScrollContainer,
	TableTbody,
	TableTd,
	TableTh,
	TableThead,
	TableTr,
} from "@mantine/core";

export function TableSkeleton() {
	return (
		<Stack>
			<TableScrollContainer minWidth={1800} type="native">
				<Table striped highlightOnHover w="100%">
					<TableThead>
						<TableTr>
							{Array(10)
								.fill(0)
								.map((_, index) => (
									<TableTh key={index}>
										<Skeleton height={30} />
									</TableTh>
								))}
						</TableTr>
					</TableThead>
					<TableTbody>
						{Array(10)
							.fill(0)
							.map((_, rowIndex) => (
								<TableTr key={rowIndex}>
									{Array(10)
										.fill(0)
										.map((_, colIndex) => (
											<TableTd key={colIndex}>
												<Skeleton height={30} />
											</TableTd>
										))}
								</TableTr>
							))}
					</TableTbody>
				</Table>
			</TableScrollContainer>
		</Stack>
	);
}
