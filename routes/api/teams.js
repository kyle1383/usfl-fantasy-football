const { default: axios } = require("axios");
const { response } = require("express");
const express = require("express");
const teamRouter = express.Router();

teamRouter.get("/:id", (req, res) => {
  Team.findById(req.params.id)
    .then((team) => res.json(team))
    .catch((err) => res.status(404).json({ noplayersfound: err }));
});

module.exports = teamRouter;
