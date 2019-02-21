"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../server.js");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Index test", function() {
  it("should serve index.html", function() {
    return chai
      .request(app)
      .get("/")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});

/*describe("Constellation list test", function () {
  it("should serve constellation-list.html", function () {
    return chai
      .request(app)
      .get("/list")
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});*/