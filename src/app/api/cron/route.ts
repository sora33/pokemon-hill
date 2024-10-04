import type { NextRequest } from "next/server";
import { prisma } from "~/lib/prisma";

export async function GET(req: NextRequest) {
	const authHeader = req.headers.get("authorization");
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response("Unauthorized", {
			status: 401,
		});
	}

	// const seminarCategories = await prisma.seminarCategory.findFirst();

	return Response.json({ message: "Hello World" });
}
