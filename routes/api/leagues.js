const express = require("express");
const Draft = require("../../models/Draft");
const leagueRouter = express.Router();

// Load League model
const League = require("../../models/League");
const Team = require("../../models/Team");
// Load User model
const User = require("../../models/User");

// @route GET api/leagues/test
// @description tests leagues route
// @access Public
leagueRouter.get("/test", (req, res) => res.send("league route testing!"));

// @route GET api/leagues
// @description Get all leagues
// @access Public
leagueRouter.get("/", (req, res) => {
  console.log("made it");
  League.find()
    .then((leagues) => res.json(leagues))
    .catch((err) =>
      res.status(404).json({ noleaguesfound: "No Leagues found" })
    );
});

// @route GET api/leagues/:id
// @description Get single league by id
// @access Public
leagueRouter.get("/:id", (req, res) => {
  League.findById(req.params.id)
    .then((league) => res.json(league))
    .catch((err) => res.status(404).json({ noleaguefound: "No League found" }));
});

// @route GET api/leagues
// @description add/save league
// @access Public
leagueRouter.post("/", (req, res) => {
  console.log(req.body);
  const user_id = req.body.owner;
  User.findOne({ _id: user_id }).then((user) => {
    const newTeam = new Team({
      name: user.username + "'s Team",
      owner: user,
    });

    let teams = [];
    console.log(newTeam);
    newTeam.save().catch((err) => console.log(err));
    teams.push(newTeam);
    for (i = 1; i < req.body.size; i++) {
      const newTeam = new Team({
        name: "Team " + i,
      });
      newTeam.save().catch((err) => console.log(err));
      teams.push(newTeam);
    }
    const newLeague = new League({
      name: req.body.name,
      owner: req.body.owner,
      size: req.body.size,
      managers: [user],
      teams: teams,
      drafts: [],
    });

    const newDraft = new Draft({
      owner: user,
      league: newLeague,
      rounds: 15,
      round: 1,
      round_len: 120,
      on_clock: teams[0],
      order: [user],
      teams: teams,
      status: "PENDING",
    });
    newDraft.save().catch((err) => console.log(err));
    newLeague.drafts.push(newDraft);
    newLeague
      .save()
      .then((league) => res.json(league))
      .catch((err) => console.log(err));
  });

  /*League.create(req.body)
    .then((league) => res.json({ msg: "League added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this league" })
    );*/
});

// @route GET api/leagues/:id
// @description Update league
// @access Public
leagueRouter.put("/:id", (req, res) => {
  League.findByIdAndUpdate(req.params.id, req.body)
    .then((league) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @description add member to league
// @access Public
leagueRouter.put("/join/:id", (req, res) => {
  const league_id = req.params.id;

  League.findOne({ _id: league_id }).then((league) => {
    const user_id = req.body.user;
    if (league.managers.length < league.size) {
      User.findOne({ _id: user_id }).then((user) => {
        league.managers.push(user);
        index = 1;

        Team.findById(league.teams[index]).then((team) => {
          team.owner = user;
          team.name = user.username + "'s Team";
          team.save();
        });

        league
          .save()
          .then((league) => res.json(league))
          .catch((err) => console.log(err));
      });
    } else {
      res.json("league is full");
    }
  });
});

// @route GET api/leagues/:id
// @description Delete league by id
// @access Public
leagueRouter.delete("/:id", (req, res) => {
  League.findByIdAndRemove(req.params.id, req.body)
    .then((league) => res.json({ mgs: "League entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a league" }));
});

module.exports = leagueRouter;
