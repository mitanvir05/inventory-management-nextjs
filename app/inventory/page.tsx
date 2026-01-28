import Sidebar from "@/components/sidebar";
import { deleteProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import React from "react";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();

  const totalProducts = await prisma.product.findMany({
    where: { userId, name: { contains: q, mode: "insensitive" } },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
              <p className="text-sm text-gray-500">
                Manage and filter your inventory items.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* search */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <form className="flex gap-2" action="/inventory" method="GET">
              <input
                name="q"
                placeholder="Search Products....."
                className="flex-1 px-4 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Search
              </button>
            </form>
          </div>
          {/* Inventory items will go here */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Low Stock At
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {totalProducts.map((product, key) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.sku || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      ${product.price.toString()}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.lowStockAt}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <form
                        action={async (formData: FormData) => {
                          "use server";
                          await deleteProduct(formData);
                        }}
                      >
                        <input type="hidden" name="id" value={product.id} />
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
