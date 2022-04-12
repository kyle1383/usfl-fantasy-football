const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DraftSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "League",
  },
  drafted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  clock_start: {
    type: Date,
  },
  rounds: {
    type: Number,
  },
  round: {
    type: Number,
  },
  on_clock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  round_len: {
    type: Number,
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  status: {
    type: String,
    enum: ["ACTIVE", "COMPLETE", "PENDING", "PAUSED"],
    default: "PENDING",
  },
});

module.exports = Draft = mongoose.model("drafts", DraftSchema);
