'use strict';
console.log("~~~~~ In CLI Spec ~~~~~~~")

const cli = require('../../cli.js');
const assert = require("assert");
const chai = require("chai");
const should = chai.should();



describe('RAM Price Calculator', function() {
  it('should exist', function() {
    should.exist(cli.getPriceEstimate);
  });
  it('should be a function', function() {
    cli.getPriceEstimate.should.be.a.Function;
  });
});

  describe('runAirdrop', function() {
    it('should exist', function() {
      should.exist(cli.runAirdrop);
    });
    it('should be a function', function() {
      cli.runAirdrop.should.be.a.Function;
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