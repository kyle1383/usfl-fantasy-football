const { default: axios } = require("axios");
const { response } = require("express");
const express = require("express");
const { json } = require("express/lib/response");
const draftRouter = express.Router();
const Timer = require("../../timer");
// Load League model
const Draft = require("../../models/Draft");
const Team = require("../../models/Team");
const Player = require("../../models/Player");
const League = require("../../models/League");
const offensive_pos = ["QB", "WR", "RB", "TE", "K", "FB"];

draftRouter.post("/refresh", (req, res) => {
  const newDraft = new Draft({
    owner: "",
    league: "",
    drafted: [],
    rounds: 20,
    round: 1,
    on_clock: "",
    order: [],
  });
  newDraft.save().catch((err) => {
    console.log(err);
  });
});

draftRouter.post("/start/:id", (req, res) => {
  console.log("started");

  Draft.findById(req.params.id)
    .then((draft) => {
      if (draft.status == "PENDING" || draft.status == "PAUSED") {
        draft.clock_start = Date.now();
        draft.status = "ACTIVE";
        draft.save();
        setTimer(draft, req.params.id);
      } else if (draft.status == "ACTIVE") {
        console.log("already started");
        draft.status = "PENDING";
        draft.save();
      }
    })
    .catch((err) => {
      console.log("error" + err);
    });
});

draftRouter.get("/:id", (req, res) => {
  Draft.findById(req.params.id)
    .then((draft) => {
      res.json(draft);
    })
    .catch((err) =>
      res.status(404).json({ noleaguesfound: "No Drafts found" })
    );
});

draftRouter.get("/teams", (req, res) => {
  Draft.findById(req.params.id).then((draft) => {
    Team.findById(draft.on_clock).then((team) => {
      if (req.body.user_id != team.owner) {
        response = "You are not on the clock";
      }
    });
  });
});

draftRouter.put("/:id", (req, res) => {
  Draft.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json("success");
    })
    .catch((err) =>
      res.status(404).json({ noleaguesfound: "No Drafts found" + err })
    );
});

draftRouter.put("/:id/draft/:player_id", (req, res) => {
  let draft_id = req.params.id;
  let player_id = req.params.player_id;
  let user_id = req.body.user_id;
  draft(draft_id, player_id, user_id, res);
});

//timer functions

function setTimer(draft, id) {
  console.log("here");
  setTimeout(
    check,
    draft.round_len * 1000,
    draft.drafted,
    draft.clock_start,
    draft.round_len,
    id
  );
}
function check(drafted, started, round_len, draft_id) {
  console.log("checked");
  const currentTime = new Date().getTime();
  Draft.findById(draft_id)
    .then((draft) => {
      const clockStart = draft.clock_start;
      const timePassed = (currentTime - clockStart.getTime()) / 1000;
      if (timePassed > round_len) {
        Player.find().then((players) => {
          let undrafted = players.filter(function (player, index, arr) {
            return !drafted.includes(player._id);
          });
          let offensive = undrafted.filter(function (player, index, arr) {
            return offensive_pos.includes(player.position);
          });
          let player = offensive[Math.floor(Math.random() * offensive.length)];
          let player_id = player._id;

          //get user id from on clock;
          Team.findById(draft.on_clock).then((team) => {
            console.log(draft_id);
            console.log(player_id);
            console.log(team.owner);

            autodraft(draft_id, player_id, team.owner);
          });
        });
      } else {
        console.log("A Player was successfully drafted");
      }
    })
    .catch((err) => {
      console.log("error" + err);
    });
  //autoDraft
}

function autodraft(draft_id, player_id, user_id) {
  let response;
  Draft.findById(draft_id)
    .then((draft) => {
      Team.findById(draft.on_clock).then((team) => {
        if (user_id != team.owner) {
          response = "You are not on the clock";
        }
        Player.findById(player_id).then((player) => {
          //team updates
          team.players.push(player);

          if (team.players.length != draft.round) {
            response = "You already drafted this round";
          }
          //draft updates
          draft.drafted.push(player);
          order_index = draft.teams.indexOf(team._id);

          if (order_index == draft.teams.length - 1) {
            //new round
            draft.on_clock = draft.teams[0];
            //is draft over?
            if (draft.round == draft.rounds) {
              response = "Draft is over";
            } else {
              draft.round += 1;
            }
          } else {
            draft.on_clock = draft.teams[order_index + 1];
          }
          draft.clock_start = Date.now();
          if (response) console.log(response);
          team.save();
          draft.save();
          setTimer(draft, draft_id);
        });
      });
    })
    .catch((err) => {
      console.log("error" + err);
    });
}
function draft(draft_id, player_id, user_id, res) {
  let response;
  Draft.findById(draft_id)
    .then((draft) => {
      Team.findById(draft.on_clock).then((team) => {
        if (user_id != team.owner) {
          response = "You are not on the clock";
        }
        Player.findById(player_id).then((player) => {
          //team updates
          team.players.push(player);

          if (team.players.length != draft.round) {
            response = "You already drafted this round";
          }
          //draft updates
          draft.drafted.push(player);
          order_index = draft.teams.indexOf(team._id);

          if (order_index == draft.teams.length - 1) {
            //new round
            draft.on_clock = draft.teams[0];
            //is draft over?
            if (draft.round == draft.rounds) {
              response = "Draft is over";
            } else {
              draft.round += 1;
            }
          } else {
            draft.on_clock = draft.teams[order_index + 1];
          }
          draft.clock_start = Date.now();
          if (res) {
            console.log(response);
            if (response) {
              res.json(response);
            } else {
              team.save();
              draft.save();
              setTimer(draft, draft_id);
              res.json(draft);
            }
          }
        });
      });
    })
    .catch((err) => {
      console.log("error" + err);
    });
}

module.exports = draftRouter;
