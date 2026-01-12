const jsonServer = require("json-server");
const { v4: uuidv4 } = require("uuid");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware to generate random ID
server.post("/users", (req, res, next) => {
  req.body.id = uuidv4().slice(0, 4); // shorten to 4 chars
  next();
});

server.post("/lists", (req, res, next) => {
  req.body.id = uuidv4().slice(0, 4);
  next();
});

server.post("/items", (req, res, next) => {
  req.body.id = uuidv4().slice(0, 4);
  next();
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT} 🚀`);
});