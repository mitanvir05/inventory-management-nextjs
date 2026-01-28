import "dotenv/config";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const demoUserId = "07186418-1e51-4c4e-87ac-1ccf04ef13b9";

  await prisma.product.createMany({
    data: Array.from({ length: 50 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      price: new Prisma.Decimal((Math.random() * 90 + 10).toFixed(2)),
      description: `This is a detailed description for Product ${i + 1}.`,
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    })),
  });

  console.log("✅ Seed completed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
