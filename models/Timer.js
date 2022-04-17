const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TimerSchema = new Schema({
  currentTime: {
    type: Number,
  },
  roundLen: {
    type: Number,
  },
});

TimerSchema.statics.start = function start() {
  console.log("started");
};

module.exports = Timer = mongoose.model("timers", DraftSchema);
