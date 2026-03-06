import { useState, useEffect, useCallback } from "react";

const API = "http://localhost:5000/api/occupants";

function format(item) {
  return {
    id: item._id,
    name: item.Name || "—",
    contact: item.contactnumber || "—",
    flatnumber: item.flatnumber || "—",
    room: item.room_id || "—",
    department: item.department || "—",
    position: item.position || "—",
    cnicnumber: item.cnicnumber || "",
  };
}

export function useOccupants() {
  const [occupants, setOccupants] = useState([]);
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
        setOccupants(data.map(format));
      } catch (err) {
        console.error("Fetch occupants failed:", err);
        setError(err.message || "Could not load occupants");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // POST – create new occupant
  const addOccupant = useCallback(async (formData) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to create occupant");
    }
    const created = await res.json();
    setOccupants((prev) => [...prev, format(created)]);
    return created;
  }, []);

  // PUT – update existing occupant
  const updateOccupant = useCallback(async (id, formData) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to update occupant");
    }
    const updated = await res.json();
    setOccupants((prev) =>
      prev.map((o) => (o.id === id ? format(updated) : o)),
    );
    return updated;
  }, []);

  // DELETE – remove occupant
  const deleteOccupant = useCallback(async (id) => {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to delete occupant");
    }
    setOccupants((prev) => prev.filter((o) => o.id !== id));
  }, []);

  return {
    occupants,
    loading,
    error,
    addOccupant,
    updateOccupant,
    deleteOccupant,
  };
}
