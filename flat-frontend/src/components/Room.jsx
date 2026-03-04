import React from "react";
import { DoorOpen, Plus, Search } from "lucide-react";

export default function Room() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <DoorOpen className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">Rooms</h1>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Plus size={18} />
          Add Room
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-4 p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search rooms..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500 font-medium">
        Rooms list will be display here
      </div>
    </div>
  );
}
