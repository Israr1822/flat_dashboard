
import { useState, useEffect, useCallback } from "react";
const API = "http://localhost:5000/api/flats";
function formatFlat(item) {
  return {
    id: item._id,
    flatnumber: item.flatnumber || "—",
    rentamount: item.rentamount || 0,
    ownerName: item.ownerName || "—",
    ownerAccountNumber: item.ownerAccountNumber || "—",
    buildingmaintenance: item.buildingmaintenance || 0,
    active: item.active ?? true,          
    address: item.address || "—",
    
  };
}
export function useFlats() {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        // sort by flatnumber (client-side safety)
        const sorted = data
          .map(formatFlat)
          .sort((a, b) => a.flatnumber.localeCompare(b.flatnumber, undefined, { numeric: true }));
        setFlats(sorted);
      } catch (err) {
        console.error("Fetch flats failed:", err);
        setError(err.message || "Could not load flats");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // POST – create new flat
  const addFlat = useCallback(async (formData) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to create flat");
    }

    const created = await res.json();
    const formatted = formatFlat(created);

    setFlats((prev) => {
      const newList = [...prev, formatted];
      // keep sorted
      return newList.sort((a, b) =>
        a.flatnumber.localeCompare(b.flatnumber, undefined, { numeric: true })
      );
    });

    return formatted;
  }, []);

  // PUT – update existing flat
  const updateFlat = useCallback(async (id, formData) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to update flat");
    }

    const updated = await res.json();
    const formatted = formatFlat(updated);

    setFlats((prev) =>
      prev.map((f) => (f.id === id ? formatted : f))
    );

    return formatted;
  }, []);

  // DELETE – remove flat
  const deleteFlat = useCallback(async (id) => {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to delete flat");
    }

    setFlats((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return {
    flats,
    loading,
    error,
    addFlat,
    updateFlat,
    deleteFlat,
  };
}