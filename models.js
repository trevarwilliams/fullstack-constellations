"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  fullname: { type: String, default: "" },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

const constellationSchema = mongoose.Schema({
  name: { type: String, required: true },
  info: { type: String, required: true },
  location: { type: String, required: true },
  found: { type: Boolean, default: false }
});

const User = mongoose.model("userSchema", userSchema);
const Constellation = mongoose.model("Constellation", constellationSchema);

module.exports = { User, Constellation };