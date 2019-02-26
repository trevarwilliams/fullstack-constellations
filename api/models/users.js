"use strict";

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: { type: String, default: "" },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  found: [
    {
      foundDate: { type: Date, default: Date.now },
      constellation: { type: mongoose.Schema.Types.ObjectId, ref: "Constellation" }
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = { User };