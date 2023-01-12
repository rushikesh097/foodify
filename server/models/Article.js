const mongoose = require("mongoose");
const { Schema } = mongoose;

const Article = new Schema({
  userid: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  tag: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    default: new Date().toISOString().slice(0, 10)
  },

  time: {
    type: String,
    default: new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0,5)
  },
});

module.exports = mongoose.model("articles", Article);