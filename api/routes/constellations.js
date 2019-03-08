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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The provided id is not valid");
    err.status = 400;
    return next(err);
  }

  Constellation.findById(id)
    .then(constellation => {
      if (constellation == null) {
        const err = new Error("The provided id is not valid");
        err.status = 400;
        return next(err);
      } else {
        res.status(200).json(constellation);
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
    name: req.body.name,
    info: req.body.info,
    location: req.body.location
  });
  constellation
    .create()
    .then(result => {
      res.status(200).json({
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
