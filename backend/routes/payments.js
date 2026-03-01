const express = require("express");
const router = express.Router();
const Payment = require("../modal/payment");

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { flat_id, amount, due_date, sechduled_payment_id, paid_date } =
      req.body;

    const payment = new Payment({
      flat_id,
      amount,
      due_date,
      sechduled_payment_id,
      paid_date,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (req.body.flat_id !== undefined) payment.flat_id = req.body.flat_id;
    if (req.body.amount !== undefined) payment.amount = req.body.amount;
    if (req.body.due_date !== undefined) payment.due_date = req.body.due_date;
    if (req.body.sechduled_payment_id !== undefined)
      payment.sechduled_payment_id = req.body.sechduled_payment_id;
    if (req.body.paid_date !== undefined)
      payment.paid_date = req.body.paid_date;
    payment.updatedAt = new Date();

    const updatedPayment = await payment.save();
    res.json(updatedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    await payment.deleteOne();
    res.json({ message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
