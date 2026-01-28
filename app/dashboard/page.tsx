import ProductChart from "@/components/product-chart";
import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  TrendingUp,
  Package,
  DollarSign,
  AlertTriangle,
  TrendingDown,
} from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user.id;

  // --- Data Fetching ---
  const totalProducts = await prisma.product.count({ where: { userId } });

  const allProducts = await prisma.product.findMany({
    where: { userId },
    select: { price: true, quantity: true, createdAt: true },
  });

  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0,
  );

  const inStockCount = allProducts.filter((p) => Number(p.quantity) > 5).length;

  const lowStockCount = allProducts.filter(
    (p) => Number(p.quantity) <= 5 && Number(p.quantity) >= 1,
  ).length;

  const outOfStockCount = allProducts.filter(
    (p) => Number(p.quantity) === 0,
  ).length;

  const inStockPercentage =
    totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;

  const lowStockPercentage =
    totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;

  // Fetch products specifically for Low Stock card comparison
  const productsForLowStock = await prisma.product.findMany({
    where: { userId },
    select: { quantity: true, lowStockAt: true },
  });
  const lowStock = productsForLowStock.filter(
    (p) => p.quantity <= p.lowStockAt,
  ).length;

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // --- Chart Data Logic ---
  const now = new Date();
  const weeklyProductsData = [];
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    const weekLabel = `${weekStart.getMonth() + 1}/${weekStart.getDate()}`;

    const weekProducts = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });
    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length,
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/dashboard" />
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">
                Welcome to your inventory dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Top Section: Metrics & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Key Metrics Cards */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6 text-gray-900">
              Key Metrics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Metric 1: Total Products */}
              <div className="flex flex-col items-center p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mb-2">
                  <Package className="w-5 h-5" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {totalProducts}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  Total Products
                </div>
                <div className="flex items-center mt-2 px-2 py-1 bg-green-100 rounded-full">
                  <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs font-bold text-green-700">
                    +{totalProducts}
                  </span>
                </div>
              </div>

              {/* Metric 2: Total Value */}
              <div className="flex flex-col items-center p-4 bg-green-50/50 rounded-xl border border-green-100">
                <div className="p-2 bg-green-100 rounded-lg text-green-600 mb-2">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  ${Number(totalValue).toLocaleString()}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  Total Value
                </div>
                <div className="flex items-center mt-2 px-2 py-1 bg-green-100 rounded-full">
                  <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs font-bold text-green-700">+12%</span>
                </div>
              </div>

              {/* Metric 3: Low Stock */}
              <div className="flex flex-col items-center p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {lowStock}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  Low Stock
                </div>
                <div className="flex items-center mt-2 px-2 py-1 bg-red-100 rounded-full">
                  <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                  <span className="text-xs font-bold text-red-700">
                    +{lowStock}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                New Products Per Week
              </h2>
            </div>
            <div className="h-48">
              <ProductChart data={weeklyProductsData} />
            </div>
          </div>
        </div>

        {/* Bottom Section: Stock Levels & Efficiency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Stock Level List */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Stock Level
              </h2>
            </div>
            <div className="space-y-3">
              {recent.map((product, key) => {
                const stockLevel =
                  product.quantity === 0
                    ? 0
                    : product.quantity <= (product.lowStockAt || 5)
                      ? 1
                      : 2;

                const bgcolors = [
                  "bg-red-600",
                  "bg-yellow-600",
                  "bg-green-600",
                ];
                const textcolors = [
                  "text-red-600",
                  "text-yellow-600",
                  "text-green-600",
                ];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${bgcolors[stockLevel]}`}
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {product?.name}
                      </span>
                    </div>
                    <div
                      className={`text-sm font-medium ${textcolors[stockLevel]}`}
                    >
                      {product.quantity} units
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Efficiency Donut Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Efficiency
              </h2>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* Background Ring */}
                <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>

                {/* Dynamic Value Ring */}
                <div
                  className="absolute inset-0 rounded-full border-8 border-purple-600"
                  style={{
                    clipPath:
                      "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                  }}
                ></div>

                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {inStockPercentage}%
                    </div>
                    <div className="text-sm text-gray-600">In Stock</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600" />
                  <span>In Stock ({inStockPercentage}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span>Low Stock ({lowStockPercentage}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Out of Stock ({outOfStockCount}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
