const { Schema, model } = require("mongoose");
const flatSchema = new Schema(
  {
    flatnumber: String,
    rentamount: Number,
    ownerName: String,
    ownerAccountNumber: String,
    buildingmaintenance: Number,
    active: Boolean,
    address: String,
  },
  { timestamps: true },
);

const Flat = model("Flat", flatSchema);

module.exports = Flat;
