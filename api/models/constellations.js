"use strict";

const mongoose = require("mongoose");

const constellationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  info: { type: String, required: true },
  location: { type: String, required: true }
});

const Constellation = mongoose.model("Constellation", constellationSchema);
module.exports = { Constellation };
