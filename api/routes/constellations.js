"use strict";

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Constellation = require("../models/constellations");

// Get all constellations
router.get("/", (req, res, next) => {
  Constellation.find()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Get specific constellation by id
router.get('/:constellationId', (req, res, next) => {
  const id = req.params.constellationId;

  Constellation.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err });
    });
});

// Create new constellation
router.post("/", (req, res, next) => {
  const constellation = new Constellation({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    info: req.body.info,
    location: req.body.location
  });
  product
    .save()
    .then(result => {
      console.log(result);
    })
    .cath(err => console.log(err));
  res.status(200).json({
    message: 'Handling POST requests to /constellations',
    newConstellation: constellation
  })
});

module.exports = router;
