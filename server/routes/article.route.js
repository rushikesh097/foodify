const express = require("express");
const mongoose = require("mongoose");
const Article = require("../models/Article.js");

const router = express.Router();

router.post("/addarticle", async (req, res) => {
  const userid = req.body.userid;
  const title = req.body.title;
  const description = req.body.description;
  const date = req.body.date;
  const time = req.body.time;
  const tag=req.body.tag;
  Article.create({userid:userid,title:title,description:description,date:date,time:time,tag:tag})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

router.get("/getallarticles", (req, res) => {
  Article.find().sort({_id:-1})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});


router.put("/updatearticle", async (req, res) => {
  Article.findByIdAndUpdate(req.body._id, { $set: req.body })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});


router.delete("/deletearticle/:id", async (req, res) => {
    const id = req.params.id;
    Article.findOneAndDelete({_id:id})
    .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
});

router.get("/getarticlebyuserid/:id", async (req, res) => {
  const id = req.params.id;
  Article.find({ userid: id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

router.get("/searcharticlebytitle/:title", async (req, res) => {

  Article.find({title: {$regex: req.params.title, $options:"i"}})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});


router.get("/getarticlebytag/:tag", async (req, res) => {
  const tag = req.params.tag;
  Article.findOne({ tag: tag })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});


module.exports = router;