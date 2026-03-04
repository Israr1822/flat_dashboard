import React from "react";
import { CreditCard, Plus, Search } from "lucide-react";

export default function Payments() {
  return (
    <div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CreditCard className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Plus size={18} />
          Record Payment
        </button>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500 mb-1">Total Collected</p>
          <p className="text-2xl font-bold text-gray-800">Rs 55,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500 mb-1">Paid</p>
          <p className="text-2xl font-bold text-green-600">2</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-500">1</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500 mb-1">Overdue</p>
          <p className="text-2xl font-bold text-red-500">1</p>
        </div>
      </div>

    
      <div className="bg-white rounded-lg shadow mb-4 p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search payments..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        No payments yet
      </div>
    </div>
  );
}
