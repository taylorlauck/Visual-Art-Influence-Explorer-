const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const bcrypt = require('bcrypt');


// Create a PostgreSQL client
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: " rootUser",
    database: "capstone2"
});

client.connect(); // Connect to the database

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await hash(password, 10);

    // Insert new user into the database
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
      username,
      hashedPassword,
    ]);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve user from the database
    const user = await client.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided password matches the stored hashed password
    const match = await compare(password, user.rows[0].password);

    if (match) {
      // Passwords match, login successful
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
console.log('User registered successfully');

