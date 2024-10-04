// import type { NextRequest } from "next/server";
// import { prisma } from "~/lib/prisma";

// export async function GET(request: NextRequest) {
// 	try {
// 		const users = await prisma.user.findMany();
// 		return Response.json(users);
// 	} catch (error) {
// 		console.error("ユーザーの取得中にエラーが発生しました:", error);
// 		return Response.json({ error: "内部サーバーエラー" }, { status: 500 });
// 	}
// }
