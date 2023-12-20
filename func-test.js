const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('./server.js');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  
  suite("Input Assertions", () => {

    test("1) valid input", (done) => {

      chai.request(server)
        .keepOpen()
        .get("/api/convert?input=10L")
        .end((err, res) => {

          assert.equal(res.status, 200);
          assert.equal(res.body.returnNum, 2.64172);
          done();
        });
    });

    test("2) invalid unit input", (done) => {

      chai.request(server)
        .keepOpen()
        .get("/api/convert?input=32g")
        .end((err, res) => {

          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
          done();
        });
    });

    test("3) invalid number input", (done) => {

      chai.request(server)
        .keepOpen()
        .get("/api/convert?input=3/7.2/4kg")
        .end((err, res) => {

          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
          done();
        });
    });

    test("4) invalid number and unit input", (done) => {

      chai.request(server)
        .keepOpen()
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end((err, res) => {

          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number and unit");
          done();
        });
    });

    test("5) no number input", (done) => {

      chai.request(server)
        .keepOpen()
        .get("/api/convert?input=kg")
        .end((err, res) => {

          assert.equal(res.status, 200);
          assert.equal(res.body.returnNum, 2.20462);
          done();
        });
    });
  });
});
