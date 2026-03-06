const express = require('express');
const router = express.Router();
const Occupant = require('../modal/occupant');

router.get('/', async (req, res) => {
  try {
    const occupants = await Occupant.find().sort({ Name: 1 });
    res.json(occupants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching occupants' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const occupant = await Occupant.findById(req.params.id);
    if (!occupant) {
      return res.status(404).json({ message: 'Occupant not found' });
    }
    res.json(occupant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { Name, flatnumber, contactnumber, cnicnumber, department, position, room_id } = req.body;

    const newOccupant = new Occupant({
      Name,
      flatnumber,
      contactnumber,
      cnicnumber,
      department,
      position,
      room_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedOccupant = await newOccupant.save();
    res.status(201).json(savedOccupant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while creating occupant' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const occupant = await Occupant.findById(req.params.id);
    if (!occupant) {
      return res.status(404).json({ message: 'Occupant not found' });
    }

    if (req.body.Name !== undefined) occupant.Name = req.body.Name;
    if (req.body.flatnumber !== undefined) occupant.flatnumber = req.body.flatnumber;
    if (req.body.contactnumber !== undefined) occupant.contactnumber = req.body.contactnumber;
    if (req.body.cnicnumber !== undefined) occupant.cnicnumber = req.body.cnicnumber;
    if (req.body.department !== undefined) occupant.department = req.body.department;
    if (req.body.position !== undefined) occupant.position = req.body.position;
    if (req.body.room_id !== undefined) occupant.room_id = req.body.room_id;

    const updatedOccupant = await occupant.save();
    res.json(updatedOccupant);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message || 'Update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedOccupant = await Occupant.findByIdAndDelete(req.params.id);
    if (!deletedOccupant) {
      return res.status(404).json({ message: 'Occupant not found' });
    }
    res.json({ message: 'Occupant deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting occupant' });
  }
});
module.exports = router;

