const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const leagues = require("./routes/api/leagues");
const players = require("./routes/api/players");
const drafts = require("./routes/api/drafts");
const teams = require("./routes/api/teams");
const path = require("path");

let corsAllow;
if (process.env.NODE_ENV === "production") {
  corsAllow = "https://usfl-fantasy.herokuapp.com/";
} else {
  corsAllow = "http://localhost:3000";
}

var corsOptions = {
  origin: corsAllow,
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
// simple route

app.use("/api/leagues", leagues);
app.use("/api/players", players);
app.use("/api/drafts", drafts);
app.use("/api/teams", teams);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    if (req.url === "/api") return next();
    console.log(req.url);
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
