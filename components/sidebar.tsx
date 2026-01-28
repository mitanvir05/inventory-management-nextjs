"use client";

import { UserButton } from "@stackframe/stack";
import { BarChart3, Package, Plus, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Sidebar({
  currentPath = "/dashboard",
}: {
  currentPath: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Add Product", href: "/add-product", icon: Plus },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-semibold text-gray-900 text-lg">
            Inventory App
          </span>
        </div>

        <div className="flex items-center">
          <UserButton />
        </div>
      </div>

      {/* --- MOBILE OVERLAY (Backdrop) --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- SIDEBAR (Desktop: Fixed | Mobile: Slide-in) --- */}
      <div
        className={`
          fixed left-0 top-0 bottom-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:top-0
          /* On mobile, we want the sidebar to sit below the header if you prefer, 
             but usually, a drawer slides OVER everything. 
             Here we keep it full height z-50. */
        `}
      >
        <div className="mb-8 hidden md:block">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5" />
            <span className="text-lg font-semibold">Inventory App</span>
          </div>
        </div>

        <div className="md:hidden mb-6 flex justify-between items-center">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setIsOpen(false)} className="p-1">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <nav className="space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">
            Inventory
          </div>
          {navigation.map((item, key) => {
            const IconComponent = item.icon;
            const isActive = currentPath === item.href;
            return (
              <Link
                key={key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-purple-100 text-gray-800"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 p-6 hidden md:block">
          <div className="flex items-center justify-between">
            <UserButton showUserInfo />
          </div>
        </div>
      </div>
    </>
  );
}
