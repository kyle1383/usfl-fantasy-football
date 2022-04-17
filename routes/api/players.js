const { default: axios } = require("axios");
const { response } = require("express");
const express = require("express");
const playerRouter = express.Router();

const teams = {
  stars: "b786eb70-9677-11ec-9193-6b32ce92fd29",
  panthers: "8bcdfcd0-9677-11ec-9ad0-d3ebe46bbb12",
  gamblers: "42b04b80-9676-11ec-9ad0-d3ebe46bbb12",
  maulers: "c8797380-9677-11ec-9193-6b32ce92fd29",
  bandits: "6b5d0b90-9676-11ec-9ad0-d3ebe46bbb12",
  breakers: "51da96b0-9676-11ec-9ad0-d3ebe46bbb12",
  generals: "9b9e4c00-9677-11ec-9ad0-d3ebe46bbb12",
  stallions: "f4305130-9675-11ec-8570-4594a07130f0",
};
// Load League model
const Player = require("../../models/Player");
//API only allows one call per second, so I have to wait to call each of these
playerRouter.post("/refresh", (req, res) => {
  let promises = [];
  let interval = 1;
  for (const name in teams) {
    setTimeout(function () {
      promises.push(
        axios
          .get(
            `http://api.sportradar.us/usfl/trial/v7/en/teams/${teams[name]}/full_roster.json?api_key=tq5gw8uvdaap347p58zyusfx`
          )
          .then((response) => {
            console.log("responded");
            console.log(name);
            for (let index in response.data.players) {
              const player = response.data.players[index];
              //update if already exists
              Player.countDocuments(
                { api_id: player.id },
                function (err, count) {
                  if (count > 0) {
                    Player.findOne({ api_id: player.id }).then(
                      (playerDocument) => {
                        playerDocument.api_id = player.id;
                        playerDocument.name = player.name;
                        playerDocument.jersey = player.jersey;
                        playerDocument.team = name;
                        playerDocument.last_name = player.last_name;
                        playerDocument.first_name = player.first_name;
                        playerDocument.abbr_name = player.abbr_name;
                        playerDocument.preferred_name = player.preferred_name;
                        playerDocument.birth_date = player.birth_date;
                        playerDocument.weight = player.weight;
                        playerDocument.height = player.height;
                        playerDocument.position = player.position;
                        playerDocument.high_school = player.high_school;
                        playerDocument.college = player.college;
                        playerDocument.status = player.status;
                        playerDocument.draft = player.draft;
                        playerDocument.save();
                      }
                    );
                  } else {
                    const newPlayer = new Player({
                      api_id: player.id,
                      name: player.name,
                      jersey: player.jersey,
                      team: name,
                      last_name: player.last_name,
                      first_name: player.first_name,
                      abbr_name: player.abbr_name,
                      preferred_name: player.preferred_name,
                      birth_date: player.birth_date,
                      weight: player.weight,
                      height: player.height,
                      position: player.position,
                      high_school: player.high_school,
                      college: player.college,
                      status: player.status,
                      draft: player.draft,
                    });
                    newPlayer.save();
                  }
                }
              );
            }
          })
      );
    }, interval * 1000 + 100);
    interval += 1;
  }
  Promise.allSettled(promises).then((results) =>
    results.forEach((result) => console.log(result.status))
  );
  /*axios
    .get(
      "http://api.sportradar.us/usfl/trial/v7/en/teams/c8797380-9677-11ec-9193-6b32ce92fd29/full_roster.json?api_key=tq5gw8uvdaap347p58zyusfx"
    )
    .then((response) => {
      for (let index in response.data.players) {
        const player = response.data.players[index];
        console.log(player);
        const newPlayer = new Player({
          api_id: player.id,
          name: player.name,
          jersey: player.jersey,
          team: "Maulers",
          last_name: player.last_name,
          first_name: player.first_name,
          abbr_name: player.abbr_name,
          preferred_name: player.preferred_name,
          birth_date: player.birth_date,
          weight: player.weight,
          height: player.height,
          position: player.position,
          high_school: player.high_school,
          college: player.college,
          status: player.status,
          draft: player.draft,
        });
        newPlayer.save();
      }
    })
    .catch((err) => {
      console.log(err);
    });*/
});

playerRouter.get("/", (req, res) => {
  Player.find()
    .then((players) => res.json(players))
    .catch((err) =>
      res.status(404).json({ noplayersfound: "No Players found" })
    );
});
playerRouter.get("/:id", (req, res) => {
  Player.findById(req.params.id)
    .then((player) => res.json(player))
    .catch((err) =>
      res.status(404).json({ noplayersfound: "No Players found" })
    );
});
playerRouter.get("/exist", (req, res) => {
  Player.find()
    .then((players) => res.json(players.length > 1))
    .catch((err) =>
      res.status(404).json({ noplayersfound: "No Players found" })
    );
});

module.exports = playerRouter;
