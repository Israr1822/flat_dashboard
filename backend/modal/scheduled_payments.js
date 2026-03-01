const { Schema, model } = require('mongoose');
const SCHEDULED_PAYMENTSchema = new Schema({
    flat_id: String,
    rentamount: Number,
    category: String,
    createdAt: Date,
    updatedAt: Date,
  });
  
  const SCHEDULED_PAYMENT = model('SCHEDULED_PAYMENT', SCHEDULED_PAYMENTSchema);
  
  module.exports = SCHEDULED_PAYMENT;