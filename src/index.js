
// src/index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const rentalRoutes = require('./routes/rentalRoutes');

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/rentals', rentalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
