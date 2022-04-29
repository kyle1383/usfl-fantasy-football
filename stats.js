const Player = require("./models/Player");

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
//generate stats from request
let promises = [];
let interval = 1;
for (const name in teams) {
  setTimeout(function () {
    promises.push(
      axios
        .get(
          `http://api.sportradar.us/usfl/trial/v7/en/seasons/2022/REG/teams/${teams[name]}/statistics.json?api_key=tq5gw8uvdaap347p58zyusfx`
        )

        .then((response) => {
          updateStats(response.data);
        })
    );
  }, interval * 1000 + 100);
  interval += 1;
}
Promise.allSettled(promises).then((results) =>
  results.forEach((result) => console.log(result.status))
);

//

const positions = ["QB", "RB", "WR", "TE", "FB", "K"];
function updateStats(stats) {
  const players = stats.players;

  const offensive = players.filter((player) => {
    return positions.includes(player.position);
  });
  offensive.map((player) => {
    const id = player.id;
    const receiving = player.receiving;
    const rushing = player.rushing;
    const passing = player.passing;

    Player.find({ api_id: id })
      .then((player) => {
        const stats_categories = [];
        //receiving
        if (typeof receiving !== "undefined")
          stats_categories.push({ name: "receiving", stats: receiving });
        if (typeof passing !== "undefined")
          stats_categories.push({ name: "passing", stats: passing });
        if (typeof rushing !== "undefined")
          stats_categories.push({ name: "rushing", stats: rushing });

        player[0].stats_categories = stats_categories;

        player[0].save();
      })
      .catch((err) => console.log(err));
  });
}
module.exports = { updateStats };

/*
 name: {
            type: String,
          },
          value: {
            type: Number,
          },
          */
