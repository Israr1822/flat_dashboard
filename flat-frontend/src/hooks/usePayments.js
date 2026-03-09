import { useState, useEffect, useCallback } from "react";
const API = "http://localhost:5000/api/payments"; 
function formatPayment(item) {
  return {
    id: item._id,
    flat_id: item.flat_id || "—",
    amount: item.amount || 0,
    due_date: item.due_date || "—",
    scheduled_payment_id: item.sechduled_payment_id || "—", 
    paid_date: item.paid_date || "—",
    createdAt: item.createdAt ||  "—",
    updatedAt: item.updatedAt || "—",
  };
}

export function usePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all payments
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const formatted = data.map(formatPayment);
        setPayments(formatted);
      } catch (err) {
        console.error("Fetch payments failed:", err);
        setError(err.message || "Could not load payments");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const addPayment = useCallback(async (formData) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to record payment");
    }

    const created = await res.json();
    const formatted = formatPayment(created);

    setPayments((prev) => [...prev, formatted]);

    return formatted;
  }, []);

  const updatePayment = useCallback(async (id, formData) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to update payment");
    }

    const updated = await res.json();
    const formatted = formatPayment(updated);

    setPayments((prev) =>
      prev.map((p) => (p.id === id ? formatted : p))
    );

    return formatted;
  }, []);

  const deletePayment = useCallback(async (id) => {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to delete payment");
    }

    setPayments((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return {
    payments,
    loading,
    error,
    addPayment,
    updatePayment,
    deletePayment,
  };
} 