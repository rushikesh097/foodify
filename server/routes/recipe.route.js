const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe.js");

const router = express.Router();

router.get("/getallrecipe", (req, res) => {
    Recipe.find().limit(100)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
  });

router.post("/addrecipe", async (req, res) => {
  const recipeName = req.body.recipeName;
  const ingredients = req.body.ingredients;
  const prepTimeInMins = req.body.prepTimeInMins;
  const cookTimeInMins = req.body.cookTimeInMins;
  const totalTimeInMins = req.body.totalTimeInMins;
  const servings = req.body.servings;
  const cuisine = req.body.cuisine;
  
  const course = req.body.course;
  const diet = req.body.diet;
  const instructions = req.body.instructions;
  Recipe.create({recipeName:recipeName,ingredients:ingredients,prepTimeInMins:prepTimeInMins,cookTimeInMins:cookTimeInMins,totalTimeInMins:totalTimeInMins,servings:servings,cuisine:cuisine,course:course,diet:diet,instructions:instructions})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});


router.get("/getrecipebyname/:recipeName", async (req, res) => {
    const recipeName = req.params.recipeName;
    Recipe.find({ recipeName:recipeName })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
});
  

router.get("/searchrecipebyoption/", async (req,res) => {
  const {recipeName,cuisine,course,sortOrder} = req.query;
  const queryObject = {};

  if(recipeName!="none")
  {
    queryObject.recipeName = {$regex:recipeName, $options:"i"};
  }

  if(cuisine!="none")
  {
    queryObject.cuisine  = cuisine;
  }

  if(course!="none")
  {
    queryObject.course = course;
  }

  if(sortOrder=="none")
  {
    Recipe.find(queryObject).limit(100)
    .then((result) => {
      res.send(result);
    })
    .catch(err => console.log(err))
  }
  else
  {
    Recipe.find(queryObject).sort({totalTimeInMins:sortOrder}).limit(100)
    .then((result) => {
      res.send(result);
    })
    .catch(err => console.log(err))
  }
})

module.exports = router;