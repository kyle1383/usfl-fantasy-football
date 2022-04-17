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
      draft.clock_start = Date.now();
      draft.save();
      setTimeout(
        check,
        10000, //draft.round_len * 1000,
        draft.drafted[draft.drafted.length - 1],
        draft.clock_start,
        draft.round_len,
        req.params.id
      );
    })
    .catch((err) => {
      console.log("error" + err);
    });
});

function check(drafted, started, round_len, draft_id) {
  const currentTime = new Date().getTime();
  Draft.findById(draft_id)
    .then((draft) => {
      const clockStart = draft.clock_start;
      const timePassed = (currentTime - clockStart.getTime()) / 1000;
      console.log(timePassed);
      console.log(clockStart.getTime());
      console.log(currentTime);
      if (+timePassed > +10) {
        //30 should be round.len
        console.log("autodraft");
      } else {
        console.log("A Player was successfully drafted");
      }
    })
    .catch((err) => {
      console.log("error" + err);
    });
  //autoDraft
}
/*
draftRouter.post("/time/:id", (req, res) => {
  Draft.findById(req.params.id)
    .then((draft) => {
      res.json(draft);
    })
    .catch((err) =>
      res.status(404).json({ noleaguesfound: "No Drafts found" })
    );
});
*/
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
  let response;
  Draft.findById(req.params.id)
    .then((draft) => {
      Team.findById(draft.on_clock).then((team) => {
        if (req.body.user_id != team.owner) {
          response = "You are not on the clock";
        }
        Player.findById(req.params.player_id).then((player) => {
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

          if (response) {
            res.json(response);
          } else {
            team.save();
            draft.save();
            res.json(draft);
          }
        });
      });
    })
    .catch((err) => {
      console.log("error" + err);
    });
});

module.exports = draftRouter;
