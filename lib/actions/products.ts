"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";

export async function deleteProduct(formData: FormData) {
    const user = await getCurrentUser();
    const id = String(formData.get("id") || "");
    await prisma.product.deleteMany({
        where: { id: id, userId: user.id },
    });
    revalidatePath("/inventory");
}

export async function addProduct(formData: FormData) {
    const user = await getCurrentUser();

    const name = String(formData.get("name"));
    const description = String(formData.get("description") || "");
    const price = Number(formData.get("price"));
    const quantity = Number(formData.get("quantity"));
    const sku = String(formData.get("sku") || "");
    const lowStockAt = Number(formData.get("lowStockAt") || 5);

    await prisma.product.create({
        data: {
            userId: user.id,
            name,
            description,
            price,
            quantity,
            sku: sku === "" ? null : sku,
            lowStockAt,
        },
    });

    revalidatePath("/inventory");
    redirect("/inventory");
}