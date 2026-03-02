
require('dotenv').config();         
const express = require('express');
const connectDB = require('./config/db');  

const app = express();

app.use(express.json());
app.use('/api/flats',     require('./routes/flats'));
app.use('/api/occupants', require('./routes/occupants'));
app.use('/api/payments',  require('./routes/payments'));
app.use('/api/rooms',     require('./routes/rooms'));
app.use('/api/scheduled', require('./routes/scheduled'));
app.use('/api/users',     require('./routes/users'));
connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

