import { useState, useEffect } from "react";
export function useOccupants() {
  const [occupants, setOccupants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/occupants"); 

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const formatted = data.map((item) => ({
          id: item._id,
          name: item.Name || "—",
          contact: item.contactnumber || "—",
          flat: "—",              
          room: item.room_id || "—",
          department: item.department || "—",
          position: item.position || "—",
        }));

        setOccupants(formatted);
      } catch (err) {
        console.error("Fetch occupants failed:", err);
        setError(err.message || "Could not load occupants");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); 

  return { occupants, loading, error };
}