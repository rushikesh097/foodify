const mongoose = require("mongoose");
const { Schema } = mongoose;

const Recipe = new Schema({
  recipeName:{
    type: String,
    required: true,
  },

  ingredients:{
    type: String,
    required: true,
  },

  prepTimeInMins:{
    type: Number,
    required: true,
  },

  cookTimeInMins:{
    type: Number,
    required: true,
  },

  totalTimeInMins:{
    type: Number,
    required: true,
  },

  servings:{
    type: Number,
    required: true,
  },

  cuisine:{
    type: String,
    required: true,
  },

  course:{
    type: String,
    required: true,
  },

  
  diet:{
    type: String,
    required: true,
  },

  instructions:{
    type: String,
    required: true,
  }

});

module.exports = mongoose.model("recipe", Recipe);