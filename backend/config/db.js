const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Atlas connected successfully via Mongoose ✓");
  } catch (err) {
    console.error("Connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
