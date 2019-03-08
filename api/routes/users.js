"use strict";

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

mongoose.Promise = global.Promise;

const User = require("../models/users");

// Get user
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The provided id is not valid");
    err.status = 400;
    return next(err);
  }

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
  const requiredFields = ["username", "password"];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    return next(err);
  }

  const stringFields = ["username", "password", "fullname"];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== "string"
  );

  if (nonStringField) {
    const err = new Error(`Field: '${nonStringField}' must be type String`);
    err.status = 422;
    return next(err);
  }

  const sizedFields = {
    username: { min: 1 },
    password: { min: 8, max: 16 }
  };

  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      "min" in sizedFields[field] &&
      req.body[field].trim().length < sizedFields[field].min
  );
  if (tooSmallField) {
    const min = sizedFields[tooSmallField].min;
    const err = new Error(
      `Field: '${tooSmallField}' must be at least ${min} characters long`
    );
    err.status = 422;
    return next(err);
  }

  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      "max" in sizedFields[field] &&
      req.body[field].trim().length > sizedFields[field].max
  );

  if (tooLargeField) {
    const max = sizedFields[tooLargeField].max;
    const err = new Error(
      `Field: '${tooLargeField}' must be at most ${max} characters long`
    );
    err.status = 422;
    return next(err);
  }

  let { username, password, fullname = "" } = req.body;
  fullname = fullname.trim();

  return User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username,
        password: digest,
        fullname
      };
      return User.create(newUser);
    })
    .then(result => {
      return res
        .status(201)
        .location(`/:userId}`)
        .json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error("The username already exists");
        err.status = 400;
      }
      next(err);
    });
});

// Delete user
router.delete("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const deleteId = req.body._id;

  if (userId !== deleteId) {
    const err = new Error("The provided ids do not match");
    err.status = 400;
    return next(err);
  }

  User.findByIdAndDelete(deleteId)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

// Add found constellation
router.put("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const constellationId = req.body._id;

  // validate
  // constellationId
  //  // exists in db
  // userId
  // // exists in db
  // // matches paramsId (logged in user)

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

  // validate
  // constellationId
  // // exists in db
  // userId
  // // exists in db
  // // matches paramsId (logged in user)

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
