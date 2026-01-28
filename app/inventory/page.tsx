import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Search, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import DeleteProduct from "@/components/delete-product";
const ITEMS_PER_PAGE = 10;

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const currentPage = Number(params.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where: { userId, name: { contains: q, mode: "insensitive" } },
      orderBy: { createdAt: "desc" },
      take: ITEMS_PER_PAGE,
      skip: skip,
    }),
    prisma.product.count({
      where: { userId, name: { contains: q, mode: "insensitive" } },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />

      <main className="ml-0 md:ml-64 p-4 pt-20 md:p-8 md:pt-8 transition-all">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Inventory
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your products, track stock levels, and organize your
              inventory.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Search Bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <form className="flex gap-3" action="/inventory" method="GET">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Search by product name..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
              </div>
              <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                Search
              </button>
            </form>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => {
                      const isLowStock = product.quantity <= product.lowStockAt;
                      const isOutOfStock = product.quantity === 0;

                      return (
                        <tr
                          key={product.id}
                          className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {product.name}
                            </div>
                            {product.description && (
                              <div className="text-xs text-gray-400 truncate max-w-[200px]">
                                {product.description}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                            {product.sku || (
                              <span className="text-gray-300">--</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            ${Number(product.price).toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            {isOutOfStock ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                                <AlertCircle className="w-3 h-3 mr-1" /> Out of
                                Stock
                              </span>
                            ) : isLowStock ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                                <AlertCircle className="w-3 h-3 mr-1" /> Low
                                Stock
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> In
                                Stock
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {product.quantity}{" "}
                            <span className="text-gray-400 text-xs">units</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <DeleteProduct id={product.id} />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500 text-center sm:text-left">
                Showing <span className="font-medium">{skip + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(skip + ITEMS_PER_PAGE, totalCount)}
                </span>{" "}
                of <span className="font-medium">{totalCount}</span> results
              </div>

              <div className="flex items-center gap-2">
                {currentPage > 1 && (
                  <Link
                    href={`/inventory?q=${q}&page=${currentPage - 1}`}
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    Previous
                  </Link>
                )}

                {currentPage < totalPages && (
                  <Link
                    href={`/inventory?q=${q}&page=${currentPage + 1}`}
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
