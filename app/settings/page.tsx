import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { AccountSettings } from "@stackframe/stack";
import React from "react";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/settings" />

      <main className="ml-0 md:ml-64 p-4 pt-20 md:p-8 md:pt-8 transition-all">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your profile details and account security.
          </p>
        </div>

        {/* Settings Container */}
        <div className="max-w-5xl">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-4 md:p-6">
            {/* Renders the default Stackframe design */}
            <AccountSettings fullPage={false} />
          </div>
        </div>
      </main>
    </div>
  );
}
