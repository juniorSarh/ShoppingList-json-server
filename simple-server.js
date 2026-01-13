const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: '*', // Allow all origins (you can restrict this to specific domains)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

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

// Users routes
app.get('/users', (req, res) => {
  res.json(db.users);
});

app.post('/users', (req, res) => {
  const user = { id: uuidv4().slice(0, 4), ...req.body };
  db.users.push(user);
  saveDB();
  res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  db.users[index] = { ...db.users[index], ...req.body };
  saveDB();
  res.json(db.users[index]);
});

app.delete('/users/:id', (req, res) => {
  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  db.users.splice(index, 1);
  saveDB();
  res.status(204).send();
});

// Lists routes
app.get('/lists', (req, res) => {
  res.json(db.lists);
});

app.post('/lists', (req, res) => {
  const list = { id: uuidv4().slice(0, 4), ...req.body };
  db.lists.push(list);
  saveDB();
  res.status(201).json(list);
});

app.put('/lists/:id', (req, res) => {
  const index = db.lists.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'List not found' });
  db.lists[index] = { ...db.lists[index], ...req.body };
  saveDB();
  res.json(db.lists[index]);
});

app.delete('/lists/:id', (req, res) => {
  const index = db.lists.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'List not found' });
  db.lists.splice(index, 1);
  saveDB();
  res.status(204).send();
});

// Items routes
app.get('/items', (req, res) => {
  res.json(db.items);
});

app.post('/items', (req, res) => {
  const item = { id: uuidv4().slice(0, 4), ...req.body };
  db.items.push(item);
  saveDB();
  res.status(201).json(item);
});

app.put('/items/:id', (req, res) => {
  const index = db.items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  db.items[index] = { ...db.items[index], ...req.body };
  saveDB();
  res.json(db.items[index]);
});

app.delete('/items/:id', (req, res) => {
  const index = db.items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  db.items.splice(index, 1);
  saveDB();
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
