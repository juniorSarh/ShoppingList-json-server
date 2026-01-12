const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Load database
const dbPath = path.join(__dirname, 'db.json');
let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Helper function to save database
function saveDB() {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Shopping List API is running!' });
});

app.get('/users', (req, res) => {
  res.json(db.users);
});

app.post('/users', (req, res) => {
  const user = { id: uuidv4().slice(0, 4), ...req.body };
  db.users.push(user);
  saveDB();
  res.status(201).json(user);
});

app.get('/lists', (req, res) => {
  res.json(db.lists);
});

app.post('/lists', (req, res) => {
  const list = { id: uuidv4().slice(0, 4), ...req.body };
  db.lists.push(list);
  saveDB();
  res.status(201).json(list);
});

app.get('/items', (req, res) => {
  res.json(db.items);
});

app.post('/items', (req, res) => {
  const item = { id: uuidv4().slice(0, 4), ...req.body };
  db.items.push(item);
  saveDB();
  res.status(201).json(item);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
