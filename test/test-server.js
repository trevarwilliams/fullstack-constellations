"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../server.js");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Environment check", () => {
  it('NODE_ENV should be "test"', () => {
    exprect(process.env.NODE_ENV).to.equal("test");
  });
});

describe("Index test", () => {
  it("should serve index.html", () => {
    return chai
      .request(app)
      .get("/")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});

describe("404 handler", () => {
  it("Should respond with 404 with bad path", () => {
    return chai
      .request(app)
      .get("/badpath")
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});
