const express = require('express');
const cors = require('cors');
const userRoutes = require('./users'); // Import your userRoutes file

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    optionsSuccessStatus: 200, 
  };

app.use(cors(corsOptions));


// Middleware for handling JSON data
app.use(express.json());

// Define your routes
app.use('/users', userRoutes); // Use the userRoutes for paths starting with /users

// Start the server
const PORT = process.env.PORT || 5000; // Use the specified port or default to 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
