"use client";

import { deleteProduct } from "@/lib/actions/products";
import { Trash2 } from "lucide-react";

export default function DeleteProduct({ id }: { id: string }) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(e) => {
        // This triggers the browser alert
        const confirmed = window.confirm(
          "Are you sure you want to delete this product? This action cannot be undone."
        );
        
        // If user clicks "Cancel", stop the form submission
        if (!confirmed) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      {/* Added e.stopPropagation to prevent row click event if you have one */}
      <button 
        onClick={(e) => e.stopPropagation()}
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  );
}