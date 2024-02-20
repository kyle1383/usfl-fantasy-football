const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const leagues = require("./routes/api/leagues");
const players = require("./routes/api/players");
const drafts = require("./routes/api/drafts");
const teams = require("./routes/api/teams");
const path = require("path");
/*
var cors = require("cors");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;

//cors
console.log("we up and running");

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://usfl-fantasy.herokuapp.com/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({ origin: "https://usfl-fantasy.herokuapp.com/", credentials: true })
);

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/leagues", leagues);
app.use("/api/players", players);
app.use("/api/drafts", drafts);
app.use("/api/teams", teams);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    if (req.url === "/api") return next();
    console.log(req.url);
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

const port = process.env.PORT || 5001; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up  and running on port ${port} !`));
*/
