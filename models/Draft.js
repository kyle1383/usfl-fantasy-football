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
  //Must be team as sometimes there are unowned teams
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
  status: {
    type: String,
    enum: ["ACTIVE", "COMPLETE", "PENDING", "PAUSED"],
    default: "PENDING",
  },
});

module.exports = Draft = mongoose.model("drafts", DraftSchema);
