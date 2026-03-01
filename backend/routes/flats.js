

const express = require('express');
const router = express.Router();
const Flat = require('../modal/flat');   


router.get('/', async (req, res) => {
  try {
    const flats = await Flat.find().sort({ flatnumber: 1 }); 
    res.json(flats);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Server error while fetching flats' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }
    res.json(flat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { flatnumber, rentamount, ownerName, ownerAccountNumber, buildingmaintenance, active, address } = req.body;

  try {
    const newFlat = new Flat({
      flatnumber,
      rentamount,
      ownerName,
      ownerAccountNumber,
      buildingmaintenance,
      active,
      address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedFlat = await newFlat.save();
    res.status(201).json(savedFlat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while creating flat' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }

    if (req.body.flatnumber !== undefined) flat.flatnumber = req.body.flatnumber;
    if (req.body.rentamount !== undefined) flat.rentamount = req.body.rentamount;
    if (req.body.ownerName !== undefined) flat.ownerName = req.body.ownerName;
    if (req.body.ownerAccountNumber !== undefined) flat.ownerAccountNumber = req.body.ownerAccountNumber;
    if (req.body.buildingmaintenance !== undefined) flat.buildingmaintenance = req.body.buildingmaintenance;
    if (req.body.active !== undefined) flat.active = req.body.active;
    if (req.body.address !== undefined) flat.address = req.body.address;

    const updatedFlat = await flat.save();
    res.json(updatedFlat);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message || 'Update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }

    await flat.deleteOne();   
  

    res.json({ message: 'Flat deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting' });
  }
});

module.exports = router;