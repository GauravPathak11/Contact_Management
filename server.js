// server.js

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Establish a connection to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Define routes

// Add a contact
app.post('/contacts', (req, res) => {
  const { first_name, last_name, email, phone, company, job_title } = req.body;

  // Validate incoming data
  if (!first_name || !last_name || !email || !phone) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  const query = 'INSERT INTO contacts (first_name, last_name, email, phone, company, job_title) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [first_name, last_name, email, phone, company, job_title], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: result.insertId,
      first_name,
      last_name,
      email,
      phone,
      company,
      job_title,
    });
  });
});

// Get all contacts
app.get('/contacts', (req, res) => {
  const query = 'SELECT * FROM contacts';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Update a contact
app.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, company, job_title } = req.body;

  const query = 'UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone = ?, company = ?, job_title = ? WHERE id = ?';

  db.query(query, [first_name, last_name, email, phone, company, job_title, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Contact updated', id, first_name, last_name, email, phone, company, job_title });
  });
});

// Delete a contact
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM contacts WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Contact deleted' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
