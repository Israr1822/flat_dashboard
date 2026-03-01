const { Schema, model } = require('mongoose');
const room = new Schema({
    flat_id: String,
    room_number: String,
    rent_amount: Number,
    Occupancy_capacity: Number,
    createdAt: Date,
    updatedAt: Date,
  });
  
  const Room = model('Room', room);
  
  module.exports = Room;