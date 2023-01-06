const express = require("express");
const mongoose = require("mongoose");
const Review = require("../models/Review.js");

const router = express.Router();

router.post("/addreview", async (req, res) => {
  const userid = req.body.userid;
  const recipeid = req.body.recipeid;
  const review = req.body.review;
  const date = req.body.date;
  const time = req.body.time;
  Review.create({ userid:userid, recipeid:recipeid, review:review, date:date, time:time})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

router.delete("/deletereview/:id", async (req, res) => {
    const id = req.params.id;
    Review.findOneAndDelete({_id:id})
    .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
});

router.get("/getreviewbyuserid/:id", async (req, res) => {
  const id = req.params.id;
  Review.find({ userid: id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

router.get("/getreviewbyrecipeid/:id", async (req, res) => {
    const id = req.params.id;
    Review.find({ recipeid: id })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
  });
  

router.put("/updatereview", async (req, res) => {
  Review.findByIdAndUpdate(req.body._id, { $set: req.body })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
