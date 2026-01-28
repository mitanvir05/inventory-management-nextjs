import { getCurrentUser } from "@/lib/auth";
import { BarChart3 } from "lucide-react";
import Link from "next/link";

export default async function Navbar() {
  // Fetch user on the server
  const user = await getCurrentUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo (Always visible) */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-purple-600 p-1.5 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Inventory
            </span>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link
                href="/dashboard"
                className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/handler/sign-in"
                className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
