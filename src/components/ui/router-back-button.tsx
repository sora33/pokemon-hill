"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export const RouterBakcButton = () => {
	const router = useRouter();
	return (
		<Button onClick={() => router.back()} variant="outline">
			前のページに戻る
		</Button>
	);
};
