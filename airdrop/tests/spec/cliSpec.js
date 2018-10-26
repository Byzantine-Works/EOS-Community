'use strict';

const cli = require('../../cli.js');
const assert = require("assert");
const chai = require("chai");
const should = chai.should();
const figlet = require('figlet');
const chalk = require('chalk');
console.log(
  chalk.green(
      figlet.textSync("Airdrop Tool Unit Tests", {
          font: "Standard",
          horizontalLayout: "default",
          verticalLayout: "default"
      })
  )
);


describe('RAM Price Calculator', function() {
  it('should exist', function() {
    should.exist(cli.getPriceEstimate);
  });
  it('should be a function', function() {
    cli.getPriceEstimate.should.be.a.function;
  });
});

  describe('run', function() {
    it('should exist', function() {
      should.exist(cli.run);
    });
    it('should be a function', function() {
      (typeof(cli.run)).should.equal('function')
    });
  });



// describe('Basic Mocha String Test', function () {
//   it('should return number of charachters in a string', function () {
//          assert.equal("Hello".length, 5);
//      });
//   it('should return first charachter of the string', function () {
//          assert.equal("Hello".charAt(0), 'H');
//      });
//  });