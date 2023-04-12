const mongoose = require("mongoose");
const { Schema } = mongoose;

const Review = new Schema({
  username: {
    type: String,
    required: true,
  },

  userid: {
    type: String,
    required: true,
  },

  recipeid: {
    type: String,
    required: true,
  },

  recipename: {
    type: String,
    required: true,
  },

  review: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    default: new Date().toISOString().slice(0, 10),
  },

  time: {
    type: String,
    default: new Date()
      .toLocaleTimeString("en-US", { hour12: false })
      .slice(0, 5),
  },
});

module.exports = mongoose.model("Reviews", Review);
