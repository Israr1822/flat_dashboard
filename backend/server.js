require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/flats"));
app.use("/api", require("./routes/occupants"));
app.use("/api", require("./routes/payments"));
app.use("/api", require("./routes/scheduled"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/rooms"));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
