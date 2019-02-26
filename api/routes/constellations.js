"use strict";

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Constellation = require("../models/constellations");

// Get all constellations
router.get("/", (req, res, next) => {
  Constellation.find()
    .then(constellations => {
      res.status(200).json(constellations);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// Get specific constellation by id
router.get("/:constellationId", (req, res, next) => {
  const id = req.params.constellationId;

  Constellation.findById(id)
    .then(constellation => {
      if (constellation) {
        res.status(200).json(constellation);
      } else {
        res.status(404).json({ message: "No entry found with provided id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/* // Create new constellation
router.post("/", (req, res, next) => {
  const constellation = new Constellation({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    info: req.body.info,
    location: req.body.location
  });
  constellation
    .save()
    .then(result => {
      res.status(200).json({
        message: "Handling POST requests to /constellations",
        newConstellation: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}); */

module.exports = router;
