'use strict';

var should = chai.should();

describe('Airdrop Tool Tester', function() {

  describe('Step 1: RAM Price Calculator', function() {
    it('should exist', function() {
      should.exist(getPriceEstimate);
    });
    it('should be a function', function() {
      getPriceEstimate.should.be.a.Function;
    });
  });

  describe('Step 2: Shell Script Generator', function() {
    it('should exist', function() {
      should.exist(airdropGenerator);
    });
    it('should be a function', function() {
      airdropGenerator.should.be.a.Function;
    });
  });

});