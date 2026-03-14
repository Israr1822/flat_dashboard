const express = require("express");
const router = express.Router();
const Room = require("../modal/room");

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        error: "Request body is missing or empty. Send JSON data." 
      }); 
    }

    const { room_number, flat_id, rent_amount, Occupancy_capacity } = req.body;

    if (!room_number) {
      return res.status(400).json({ error: "room_number is required" });
    }

    const newRoom = new Room({
      room_number,
      flat_id,
      rent_amount,
      Occupancy_capacity,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    console.error("POST /rooms error:", err);
    res.status(500).json({ message: "Server error while creating room" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        error: "Request body is missing or empty" 
      });
    }

    const { flat_id, room_number, rent_amount, Occupancy_capacity } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        flat_id,
        room_number,
        rent_amount,
        Occupancy_capacity,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(updatedRoom);
  } catch (err) {
    console.error("PUT /rooms/:id error:", err);
    res.status(500).json({ message: "Server error while updating room" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);

    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting room" });
  }
});
module.exports = router;
