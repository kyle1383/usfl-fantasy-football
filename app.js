// app.js
const express = require("express");
const connectDB = require("./config/db");
const http = require("http");
var cors = require("cors");
const socketIo = require("socket.io");
// routes
const books = require("./routes/api/books");

const app = express();

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

const getApiAndEmit = "TODO";

// Connect Database
connectDB();

// cors
app.use(cors({ origin: "true", credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello world!"));

// use Routes
app.use("/api/books", books);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
