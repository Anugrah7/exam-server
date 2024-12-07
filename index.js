// index.js
require('dotenv').config(); // Load .env variables
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('./config/connection'); // Automatically connect to MongoDB

const pfServer = express(); // creating express

// Enable Cross-Origin Resource Sharing (CORS)
pfServer.use(cors());

// Use express.json() to parse incoming JSON requests
pfServer.use(express.json());

// Add user routes to handle /api/users
pfServer.use('/api/users', userRoutes);

// Set the port for the server
const PORT = process.env.PORT || 3000;

// Start the server
pfServer.listen(PORT, () => {
  console.log(`Server started at port: ${PORT} and waiting for client requests...`);
});
