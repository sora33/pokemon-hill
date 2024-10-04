import { PrismaClient } from "@prisma/client";
// import { seedClients } from "./seed/seed-client";
// import { seedMaterialSuppliers } from "./seed/seedMaterialSuppliers";

const prisma = new PrismaClient();

async function main() {
	// await seedMaterialSuppliers(prisma);
	// await seedClients(prisma);
	// await seedMaterialSuppliers(prisma);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
