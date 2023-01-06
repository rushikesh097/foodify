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
    required: true,
  },

  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("articles", Article);