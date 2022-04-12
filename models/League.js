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
  size: {
    type: Number,
    required: true,
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = League = mongoose.model("leagues", LeagueSchema);
