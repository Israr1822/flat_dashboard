const { Schema, model } = require('mongoose');
const OccupantSchema = new Schema({
    Name: String,
    contactnumber: String,
    flatnumber: String,
    cnicnumber: String,
    department: String,
    position: String,
    room_id: String,
    createdAt: Date,
    updatedAt: Date,
  });

  const Occupant = model('Occupant', OccupantSchema);

  module.exports = Occupant;
