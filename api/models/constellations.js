"use strict";

const mongoose = require("mongoose");

const constellationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  info: { type: String, required: true },
  location: { type: String, required: true }
});

module.exports = mongoose.model("Constellation", constellationSchema);
