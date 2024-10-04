"use client";
// searchParamsのうち、pageだけを変更するPaginationコンポーネント
// 使い方: <Pagination total={total} searchParams={searchParams} />

import { Flex, Pagination as MantinePagination } from "@mantine/core";
import { useRouter } from "next/navigation";
import type { FC } from "react";

type Props = {
	total: number;
	searchParams: Record<string, string | string[]>;
};

export const Pagination: FC<Props> = (props) => {
	const router = useRouter();

	const searchParams = props.searchParams;
	const page = searchParams?.page ? Number(searchParams?.page) : 1;
	const paramsWithoutPage = new URLSearchParams(
		Object.entries(searchParams ?? {})
			.filter(([key]) => key !== "page")
			.map(([key, value]) => [
				key,
				Array.isArray(value) ? value.join(",") : value,
			]),
	).toString();

	return (
		<Flex justify="center" mt="auto">
			<MantinePagination
				total={props.total}
				value={page}
				onChange={(value) => router.push(`?${paramsWithoutPage}&page=${value}`)}
			/>
		</Flex>
	);
};
