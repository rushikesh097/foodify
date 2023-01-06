const mongoose = require("mongoose");
const { Schema } = mongoose;

const Review = new Schema({
  userid: {
    type: String,
    required: true,
  },

  recipeid: {
    type: String,
    required: true,
  },

  review: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("Reviews", Review);
