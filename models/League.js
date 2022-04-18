const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const LeagueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commisioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  managers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  password: {
    type: String,
    required: false,
  },
  drafts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Draft",
    },
  ],
  size: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  settings: {
    roster_spots: {
      QB: {
        type: Number,
        required: true,
      },
      RB: {
        type: Number,
        required: true,
      },
      WR: {
        type: Number,
        required: true,
      },
      TE: {
        type: Number,
        required: true,
      },
      K: {
        type: Number,
        required: true,
      },
      FLEX: {
        type: Number,
        required: true,
      },
      BENCH: {
        type: Number,
        required: true,
      },
    },
    roster_size: {
      type: Number,
    },
  },
});

module.exports = League = mongoose.model("leagues", LeagueSchema);
