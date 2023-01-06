const express = require("express");
const mongoose = require("mongoose");
const bcyrpt = require("bcryptjs");
const Users = require("../models/User.js");

const router = express.Router();
const salt = "$2a$10$llw0G6IyibUob8h5XRt9xuRczaGdCm/AiV6SSjf5v78XS824EGbh";

router.post("/adduser", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = bcyrpt.hashSync(req.body.password, salt);
  const gender = req.body.gender;
  Users.create({ name: name, email: email, gender: gender, password: password })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

router.post("/validateuser", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const pass = bcyrpt.hashSync(password, salt);
  Users.findOne({ email: email, password: pass })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

router.get("/getuserbyid/:id", async (req, res) => {
  const id = req.params.id;
  Users.findOne({ _id: id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

router.put("/updateuserdetails", async (req, res) => {
  Users.findByIdAndUpdate(req.body._id, { $set: req.body })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
