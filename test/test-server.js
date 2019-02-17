"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../server.js");

const expect = chai.expect;

chai.use(chaiHttp);

describe("initial test", function() {
  it("should serve index.html", function() {
    return chai
      .request(app)
      .get("/")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});