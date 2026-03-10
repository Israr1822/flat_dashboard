
import { useState, useEffect, useCallback } from 'react';

const BASE_URL = 'http://localhost:5000/api/rooms'; 

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch rooms: ${response.status}`);
      }
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching rooms');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  
  const addRoom = async (roomData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to add room');
      }

      const newRoom = await response.json();
      setRooms((prev) => [...prev, newRoom]);
      return newRoom; 
    } catch (err) {
      setError(err.message || 'Error adding room');
      console.error(err);
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  const updateRoom = async (id, roomData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to update room');
      }

      const updatedRoom = await response.json();
      setRooms((prev) =>
        prev.map((room) => (room._id === id ? updatedRoom : room))
      );
      return updatedRoom;
    } catch (err) {
      setError(err.message || 'Error updating room');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const deleteRoom = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to delete room');
      }

      setRooms((prev) => prev.filter((room) => room._id !== id));
      return true;
    } catch (err) {
      setError(err.message || 'Error deleting room');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return {
    rooms,
    loading,
    error,
    fetchRooms,     
    addRoom,
    updateRoom,
    deleteRoom,
  };
};