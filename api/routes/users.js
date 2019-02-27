"use strict";

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

mongoose.Promise = global.Promise;

const User = require("../models/users");

//need get(?) / post / patch / delete

// Get users
router.get("/", (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// Get specific user by id
router.get("/:userId", (req, res, next) => {
  const id = req.params.userId;

  User.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "No user found with provided id" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// Create new user
router.post("/", (req, res, next) => {
  const newUser = {
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password
  };
  User
    .create(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
