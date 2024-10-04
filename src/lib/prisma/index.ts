import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}

// biome-ignore lint:
export const prisma =
	global.prisma ||
	new PrismaClient({
		// log:
		//   process.env.NODE_ENV === 'development'
		//     ? ['query', 'info', 'warn', 'error']
		//     : ['info', 'warn'],
	});

if (process.env.NODE_ENV === "development") global.prisma = prisma;
