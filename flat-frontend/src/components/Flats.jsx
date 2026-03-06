import React, { useState } from "react";
import { Building, Plus, Search, Edit, Trash2 } from "lucide-react";
import { useFlats } from "../hooks/useFlats"; 

export default function Flats() {
  const { flats, loading, error, deleteFlat } = useFlats();
  const [searchTerm, setSearchTerm] = useState("");

  // Local filtering
  const filteredFlats = flats.filter((flat) =>
    [
      flat.flatnumber?.toLowerCase(),
      flat.ownerName?.toLowerCase(),
      flat.address?.toLowerCase(),
    ].some((field) => field?.includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id, flatnumber) => {
    if (!window.confirm(`Delete flat ${flatnumber || "this flat"}?`)) return;

    try {
      await deleteFlat(id);
      // no need to manually refresh — hook already updates state
    } catch (err) {
      alert("Failed to delete flat: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Building className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">Flats</h1>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
          <Plus size={18} />
          Add Flat
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by flat number, owner or address..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            Loading flats...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 bg-red-50">
            {error}
          </div>
        ) : filteredFlats.length === 0 ? (
          <div className="p-12 text-center text-gray-500 font-medium">
            {searchTerm
              ? "No flats match your search"
              : "No flats found. Add your first flat!"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-black-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                    Flat No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                    Rent Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                    Maintenance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-black-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFlats.map((flat) => (
                  <tr key={flat.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {flat.flatnumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {flat.rentamount.toLocaleString()} PKR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {flat.ownerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {flat.buildingmaintenance.toLocaleString()} PKR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                          flat.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {flat.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{flat.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        title="Edit flat"
                        // onClick={() => openEditModal(flat)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(flat.id, flat.flatnumber)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete flat"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}