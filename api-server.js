const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// JSON middleware
app.use(express.json());

// Load database
function loadDB() {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [], lists: [], items: [] };
  }
}

// Save database
function saveDB(db) {
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(db, null, 2));
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Shopping List API is running!' });
});

// Users CRUD with query support
app.get('/users', (req, res) => {
  const db = loadDB();
  const { email } = req.query;
  if (email) {
    const filtered = db.users.filter(u => u.email === email);
    return res.json(filtered);
  }
  res.json(db.users);
});

app.post('/users', (req, res) => {
  const db = loadDB();
  const user = { id: uuidv4().slice(0, 8), ...req.body };
  db.users.push(user);
  saveDB(db);
  res.status(201).json(user);
});

app.patch('/users/:id', (req, res) => {
  const db = loadDB();
  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  db.users[index] = { ...db.users[index], ...req.body };
  saveDB(db);
  res.json(db.users[index]);
});

app.put('/users/:id', (req, res) => {
  const db = loadDB();
  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  db.users[index] = { ...db.users[index], ...req.body };
  saveDB(db);
  res.json(db.users[index]);
});

app.delete('/users/:id', (req, res) => {
  const db = loadDB();
  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  db.users.splice(index, 1);
  saveDB(db);
  res.status(204).send();
});

// Lists CRUD with query support
app.get('/lists', (req, res) => {
  const db = loadDB();
  const { userId } = req.query;
  if (userId) {
    const filtered = db.lists.filter(l => l.userId === userId);
    return res.json(filtered);
  }
  res.json(db.lists);
});

app.post('/lists', (req, res) => {
  const db = loadDB();
  const list = { 
    id: uuidv4().slice(0, 8), 
    shareCode: null,
    ...req.body 
  };
  db.lists.push(list);
  saveDB(db);
  res.status(201).json(list);
});

app.patch('/lists/:id', (req, res) => {
  const db = loadDB();
  const index = db.lists.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'List not found' });
  db.lists[index] = { ...db.lists[index], ...req.body };
  saveDB(db);
  res.json(db.lists[index]);
});

app.put('/lists/:id', (req, res) => {
  const db = loadDB();
  const index = db.lists.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'List not found' });
  db.lists[index] = { ...db.lists[index], ...req.body };
  saveDB(db);
  res.json(db.lists[index]);
});

app.delete('/lists/:id', (req, res) => {
  const db = loadDB();
  const index = db.lists.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'List not found' });
  
  // Cascade delete items for this list
  db.items = db.items.filter(item => item.listId !== req.params.id);
  
  db.lists.splice(index, 1);
  saveDB(db);
  res.status(204).send();
});

// Items CRUD with query support
app.get('/items', (req, res) => {
  const db = loadDB();
  const { listId } = req.query;
  if (listId) {
    const filtered = db.items.filter(i => i.listId === listId);
    return res.json(filtered);
  }
  res.json(db.items);
});

app.post('/items', (req, res) => {
  const db = loadDB();
  const item = { 
    id: uuidv4().slice(0, 8), 
    purchased: false,
    createdAt: Date.now(),
    ...req.body 
  };
  db.items.push(item);
  saveDB(db);
  res.status(201).json(item);
});

app.patch('/items/:id', (req, res) => {
  const db = loadDB();
  const index = db.items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  db.items[index] = { ...db.items[index], ...req.body };
  saveDB(db);
  res.json(db.items[index]);
});

app.put('/items/:id', (req, res) => {
  const db = loadDB();
  const index = db.items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  db.items[index] = { ...db.items[index], ...req.body };
  saveDB(db);
  res.json(db.items[index]);
});

app.delete('/items/:id', (req, res) => {
  const db = loadDB();
  const index = db.items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  db.items.splice(index, 1);
  saveDB(db);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
