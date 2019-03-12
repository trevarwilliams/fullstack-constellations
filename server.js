"use strict";

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const { MONGODB_URI } = require("./config");
const jwtAuth = require("./api/middleware/jwt-auth");

// Routers
const constellationRouter = require("./api/routes/constellations");
const usersRouter = require("./api/routes/users");
const authRouter = require("./api/routes/auth");

const app = express();

// Log all requests, skip during testing
app.use(
  morgan(process.env.NODE_ENV === "development" ? "dev" : "common", {
    skip: () => process.env.NODE_ENV === "test"
  })
);

// Create static webserver
app.use(express.static("public"));

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
  });
}

app.use(express.json());

// Request handling routes
// Public
app.use("/", authRouter);
app.use("/constellations", constellationRouter);

// Protected
app.use("/users", usersRouter);

// Error handling
app.use((req, res, next) => {
  const error = Error("Not found");
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
