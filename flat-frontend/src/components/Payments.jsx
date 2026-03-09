import React, { useState } from "react";
import { CreditCard, Plus, Search, Pencil, Trash2 } from "lucide-react";
import { usePayments } from "../hooks/usePayments"; // adjust path

export default function Payments() {
  const { payments, loading, error, deletePayment } = usePayments();
  const [search, setSearch] = useState("");

  const filteredPayments = payments.filter((p) =>
    [
      p.flat_id?.toLowerCase(),
      p.amount?.toString(),
      p.due_date,
      p.paid_date,
    ].some((field) => field?.includes(search.toLowerCase()))
  );

  // Simple computed stats (you can improve later with real grouping)
  const totalCollected = payments
    .filter((p) => p.isPaid)
    .reduce((sum, p) => sum + p.amount, 0);

  const paidCount = payments.filter((p) => p.isPaid).length;
  const pendingCount = payments.filter((p) => !p.isPaid && !p.isOverdue).length;
  const overdueCount = payments.filter((p) => p.isOverdue).length;

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment record?")) return;
    try {
      await deletePayment(id);
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading payments...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6">
      {/* Header */}
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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500 mb-1">Total Collected</p>
          <p className="text-2xl font-bold text-gray-800">
            Rs {totalCollected.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500 mb-1">Paid</p>
          <p className="text-2xl font-bold text-green-600">{paidCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-500">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500 mb-1">Overdue</p>
          <p className="text-2xl font-bold text-red-500">{overdueCount}</p>
        </div>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by flat ID, amount, date..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table / Empty state */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredPayments.length === 0 ? (
          <div className="p-12 text-center text-gray-500 font-medium">
            {payments.length === 0 ? "No payments recorded yet" : "No matching payments"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flat ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scheduled_Payment_ID</th>"
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{p.flat_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">Rs {p.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{p.due_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {p.paid_date || <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {p.isPaid ? (
                        <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      ) : p.isOverdue ? (
                        <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                          Overdue
                        </span>
                      ) : (
                        <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
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