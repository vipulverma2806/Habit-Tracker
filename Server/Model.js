const mongoose = require("mongoose");
const habitModel = new mongoose.Schema({
  hname: {
    type: String,
    required: true,
    unique:true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
});

const Habit = mongoose.model("Habit", habitModel);
module.exports = Habit;
