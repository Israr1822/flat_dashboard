const { Schema, model } = require('mongoose');

const PaymentSchema = new Schema({
    flat_id: String,
    amount: Number,
    due_date: Date,
    sechduled_payment_id: String,
    paid_date: Date,
    createdAt: Date,
    updatedAt: Date,
  });

  const Payment = model('Payment', PaymentSchema);

  module.exports = Payment;