const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PlayerSchema = new Schema({
  api_id: {
    type: String,
  },
  name: {
    type: String,
  },
  jersey: {
    type: String,
  },
  team: {
    type: String,
  },
  last_name: {
    type: String,
  },
  first_name: {
    type: String,
  },
  abbr_name: {
    type: String,
  },
  preferred_name: {
    type: String,
  },
  birth_date: {
    type: String,
  },
  weight: {
    type: String,
  },
  height: {
    type: String,
  },
  position: {
    type: String,
  },
  high_school: {
    type: String,
  },
  college: {
    type: String,
  },
  status: {
    type: String,
  },
  draft: {
    year: {
      type: Number,
    },
    round: {
      type: Number,
    },
    team: {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      market: {
        type: String,
      },
      alias: {
        type: String,
      },
      sr_id: {
        type: String,
      },
    },
  },
  stats_categories: [
    {
      name: {
        type: String,
      },
      stats: {},
    },
  ],
});

module.exports = Player = mongoose.model("players", PlayerSchema);
