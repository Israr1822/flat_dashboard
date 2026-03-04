import React from "react";
import {
  Search,
  Plus,
  User,
  Bed,
  CreditCard,
  AlertTriangle,
  Pencil,
  Trash2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="p-2 space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
          Hey Israr!{" "}
          <span role="img" aria-label="wave">
            👋
          </span>
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Here's how your rental family is doing today{" "}
          <span role="img" aria-label="house">
            🏡
          </span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Occupants"
          value="14"
          subtext="of 19 beds filled"
          icon={<User size={24} />}
          bgColor="bg-orange-50"
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Active Flats"
          value="3"
          subtext="3 total"
          icon={<Bed size={24} />}
          bgColor="bg-green-50"
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Unpaid Payments"
          value="6"
          subtext="this cycle"
          icon={<CreditCard size={24} />}
          bgColor="bg-yellow-50"
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Overdue"
          value="3"
          subtext="need attention 💛"
          icon={<AlertTriangle size={24} />}
          bgColor="bg-red-50"
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      {/* Occupants Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">All Occupants</h2>
            <p className="text-sm text-gray-500">
              Everyone living in your flats right now ❤️
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search name, flat, dept..."
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <button className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-all font-semibold shadow-sm shadow-orange-200">
              <Plus size={20} />
              Add Person
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Name
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Contact
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Flat
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Room
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Department
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">
                  Position
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {/* Table Data will be populated here by the user */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtext, icon, bgColor, iconBg, iconColor }) {
  return (
    <div
      className={`${bgColor} p-6 rounded-3xl flex items-center justify-between border border-transparent hover:border-gray-200 transition-all cursor-default`}
    >
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-extrabold text-gray-800">{value}</p>
        <p className="text-xs text-gray-400 font-medium">{subtext}</p>
      </div>
      <div className={`${iconBg} ${iconColor} p-3 rounded-2xl`}>{icon}</div>
    </div>
  );
}
