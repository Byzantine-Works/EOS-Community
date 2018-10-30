'use strict';

const cli = require('../../cli.js');
const assert = require("assert");
const chai = require("chai");
const should = chai.should();
// const expect = chai.expect;
const figlet = require('figlet');
const chalk = require('chalk');
console.log(
  chalk.green(
      figlet.textSync("Airdrop Unit Tests", {
          font: "Standard",
          horizontalLayout: "default",
          verticalLayout: "default"
      })
  )
);


describe('RAM Price Calculator', function() {
  describe('init', function() {
    it('should exist', function() {
      should.exist(cli.init);
    });
    it('should be a function', function() {
      (typeof cli.init).should.equal('function')
    });
  });
  
  describe('askQuestions', function() {
    it('should exist', function() {
      should.exist(cli.askQuestions);
    });
    it('should be a function', function() {
      (typeof cli.askQuestions).should.equal('function')
    });
  });
  
  describe('snapshotCsvToJson', function() {
    it('should exist', function() {
      should.exist(cli.snapshotCsvToJson);
    });
    it('should be a function', function() {
      (typeof cli.snapshotCsvToJson).should.equal('function')
    });
  });
  
  describe('snapshotFilter', function() {
    it('should exist', function() {
      should.exist(cli.snapshotFilter);
    });
    it('should be a function', function() {
      (typeof cli.snapshotFilter).should.equal('function')
    });
  });

  describe('getRamPrice', function() {
    it('should exist', function() {
      should.exist(cli.getRamPrice);
    });
    it('should be a function', function() {
      (typeof cli.getRamPrice).should.equal('function')
    });
    it('should return RAM price', async function() {
      var output = await cli.getRamPrice();
      // console.log(chalk.red('Output is'), output);
      should.exist(output['price_per_kb_eos'])
    })
  });

  describe('getPriceEstimate', function() {
    it('should exist', function() {
      should.exist(cli.getPriceEstimate);
    });
    it('should be a function', function() {
      (typeof cli.getPriceEstimate).should.equal('function')
    });
    it('should return price estimate', async function() {
      var output = await cli.getPriceEstimate(160000);
      // console.log(chalk.red('Output is'), output);
      should.exist(output)
    })
  });
  
  describe('success', function() {
    it('should exist', function() {
      should.exist(cli.success);
    });
    it('should be a function', function() {
      (typeof cli.success).should.equal('function')
    });
  });

});

describe('Airdrop Script Generator', function () {

  describe('formatOutput', function() {
    it('should exist', function() {
      should.exist(cli.formatOutput);
    });
    it('should be a function', function() {
      (typeof cli.formatOutput).should.equal('function')
    });
  });

  describe('generateAirdropCsv', function() {
    it('should exist', function() {
      should.exist(cli.generateAirdropCsv);
    });
    it('should be a function', function() {
      (typeof cli.generateAirdropCsv).should.equal('function')
    });
    it('should return true after generating csv', function () {
      var formatted = `heztcmzuhege,2241.8178,11209.0890
      heztcmzvhage,1577.65,7888.2500
      heztcmzzgmge,6000.8596,30004.2980
      heztcnbrgage,6349.8432,31749.2160
      heztcnbthage,3151.66,15758.3000`
      assert.equal(cli.generateAirdropCsv(formatted), true);
    });

  });

  describe('generateAirdropSh', function() {
    it('should exist', function() {
      should.exist(cli.generateAirdropSh);
    });
    it('should be a function', function() {
      (typeof cli.generateAirdropSh).should.equal('function')
    });
    it('should return true after generating shell script', function () {
      var formatted = `heztcmzuhege,2241.8178,11209.0890
      heztcmzvhage,1577.65,7888.2500
      heztcmzzgmge,6000.8596,30004.2980
      heztcnbrgage,6349.8432,31749.2160
      heztcnbthage,3151.66,15758.3000`
      assert.equal(cli.generateAirdropSh(formatted, 'junglefoxfox', 'AIRTEST', 5, 1000000, 1000000), true);
    });
  });

  describe('runShell', function() {
    it('should exist', function() {
      should.exist(cli.runShell);
    });
    it('should be a function', function() {
      (typeof cli.runShell).should.equal('function')
    });
  });

  describe('run', function() {
    it('should exist', function() {
      should.exist(cli.run);
    });
    it('should be a function', function() {
      (typeof cli.run).should.equal('function')
    });
  });
  
});


// describe('Basic Mocha String Test', function () {
//   it('should return number of charachters in a string', function () {
//          assert.equal("Hello".length, 5);
//   });
//   it('should return first charachter of the string', function () {
//          assert.equal("Hello".charAt(0), 'H');
//   });
//  });