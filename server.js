"use strict";

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

// Routes
const constellationRouter = require("./api/routes/constellations");

mongoose.connect('mongodb://constellation-user:' + process.env.DATABASE_PW + '@ds347665.mlab.com:47665/constellation-companion-db', {
  useNewUrlParser: true
});

// Log all requests
app.use(morgan("common"));

// Create static webserver
app.use(express.static("public"));

// Routes
app.use("/constellations", constellationRouter);

// Error handling
app.use((req, res, next) => {
  const error = Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// 
if (require.main === module) {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });
}

module.exports = app;