import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { addProduct } from "@/lib/actions/products";
import Link from "next/link";

export default async function AddProductPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPath="/add-product" />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add Product</h1>
            <p className="text-sm text-gray-500 mt-1">
              Add a new product to your inventory.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Connected the form to the server action */}
              <form action={addProduct} className="space-y-6">
                {/* Product Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Enter product name"
                    className="block w-full rounded-lg border-gray-300 border px-4 py-2.5 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    placeholder="Enter product description..."
                    className="block w-full rounded-lg border-gray-300 border px-4 py-2.5 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors"
                  />
                </div>

                {/* Price & Quantity Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="block w-full rounded-lg border-gray-300 border px-4 py-2.5 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      required
                      min="0"
                      placeholder="0"
                      className="block w-full rounded-lg border-gray-300 border px-4 py-2.5 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* SKU */}
                <div>
                  <label
                    htmlFor="sku"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    SKU (Optional)
                  </label>
                  <input
                    type="text"
                    name="sku"
                    id="sku"
                    placeholder="Enter SKU"
                    className="block w-full rounded-lg border-gray-300 border px-4 py-2.5 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors"
                  />
                </div>

                {/* Low Stock Threshold */}
                <div>
                  <label
                    htmlFor="lowStockAt"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Low Stock Threshold (Optional)
                  </label>
                  <input
                    type="number"
                    name="lowStockAt"
                    id="lowStockAt"
                    placeholder="Enter low stock threshold"
                    className="block w-full rounded-lg border-gray-300 border px-4 py-2.5 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Alert when quantity falls below this number
                  </p>
                </div>

                {/* Buttons */}
                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-lg border border-transparent bg-purple-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                  >
                    Add Product
                  </button>
                  <Link
                    href="/inventory"
                    className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
