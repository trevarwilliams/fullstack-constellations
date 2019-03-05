"use strict";

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

mongoose.Promise = global.Promise;

const User = require("../models/users");

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
  User.create(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// Delete user

// Add found constellation
router.put("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const constellationId = req.body._id;

  User.findByIdAndUpdate(
    userId,
    {
      $push: { found: constellationId }
    },
    { new: true }
  )
    .then(result => {
      res.status(204).end();
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({ message: "Internal server error" });
    });
});

// Remove found constellation
router.delete("/:userId", (req, res, next) => {
  const constellationId = req.body._id;
  const userId = req.params.userId;

  User.findByIdAndUpdate(
    userId,
    {
      $pull: { found: constellationId }
    },
    { new: true }
  )
    .then(result => {
      res.status(204).end();
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
