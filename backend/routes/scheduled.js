const express = require('express');
const router = express.Router();
const Scheduled = require('../modal/scheduled_payments');

router.get('/', async (req, res) => {
    try {
        const scheduledPayments = await Scheduled.find();
        res.json(scheduledPayments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const scheduledPayment = await Scheduled.findById(req.params.id);
        if (!scheduledPayment) {
            return res.status(404).json({ message: 'Scheduled payment not found' });
        }
        res.json(scheduledPayment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const scheduledPayment = new Scheduled({
        flat_id: req.body.flat_id,
        rentamount: req.body.rentamount,
        category: req.body.category,
        
    });

    try {
        const newScheduledPayment = await scheduledPayment.save();
        res.status(201).json(newScheduledPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedScheduledPayment = await Scheduled.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
       );
        if (!updatedScheduledPayment) {
            return res.status(404).json({ message: 'Scheduled payment not found' });
        }
        res.json(updatedScheduledPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedScheduledPayment = await Scheduled.findByIdAndDelete(req.params.id);
        if (!deletedScheduledPayment) {
            return res.status(404).json({ message: 'Scheduled payment not found' });
        }
        res.json({ message: 'Scheduled payment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;