const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

const init = () => {
  console.log('Airdrop Price Calculator initialzed')
};

const askQuestions = () => {
  const questions = [{
          name: "TOKEN_NAME",
          type: "input",
          message: "Enter the name of Token?"
      },
      {
        name: "AIRDROP_RATIO",
        type: "input",
        message: "What is the Airdrop Ratio? (Enter a Number or Decimal):"
      },
      {
        name: "MAX_TOKEN_SUPPLY",
        type: "input",
        message: "What is the Maximum Token Supply? (Enter a Number):"
      },
      {
        type: "list",
        name: "MIN_EOS_HELD",
        message: "What is the Minimum of number of EOS held within accounts you want to Airdrop to?",
        choices: ["0", "10", "100", "1000", "10000"],
      },
      {
        type: "list",
        name: "MAX_EOS_HELD",
        message: "What is the Maximum of number of EOS held within accounts you want to Airdrop to?",
        choices: ["0", "10", "100", "1000", "10000", "No Max"],
      }
  ];
  return inquirer.prompt(questions);
};

const getPriceEstimate = (snapshot, minEosHeld, maxEosHeld) => {
  // Snapshot Data Parsing here
  // Find Number of accounts

  var numberOfAccounts = 132192                 // Estimated based on genesis for now
  var ramPrice_EosPerByte = 0.11381643/1000     // 0.11381643 EOS/kb for now
  var UsdPerEos = 5.61                          // Current Price

  var ramRequired = numberOfAccounts * 242       //Ram Required in Bytes

  var priceEstimate_Eos = ramRequired * ramPrice_EosPerByte;
  var priceEstimate_Usd = priceEstimate_Eos * UsdPerEos;

  return priceEstimate_Eos
}

const airdropGenerator = (tokenName, airdropRatio, maxTokenSupply, minEosHeld, maxEosHeld) => {
  // Main Airdrop Logic Here

};



const success = priceEstimate => {
  console.log('The cost of the Airdrop will be : ' + (priceEstimate));
};

const runAirdrop = async () => {
  init();
  const answers = await askQuestions();
  const {
      TOKEN_NAME,
      AIRDROP_RATIO,
      MAX_TOKEN_SUPPLY,
      MIN_EOS_HELD,
      MAX_EOS_HELD,
  } = answers;
  
  console.log('TOKEN_NAME Is: ' + TOKEN_NAME)
  console.log('AIRDROP_RATIO Is: ' + AIRDROP_RATIO)
  console.log('MIN_EOS_HELD Is: ' + MIN_EOS_HELD)
  console.log('MIN_EOS_HELD Is: ' + MAX_TOKEN_SUPPLY)
  
  // const PRICE_ESTIMATE = getPriceEstimate(snapshot, MIN_EOS_HELD, MAX_EOS_HELD)
  // success(PRICE_ESTIMATE);

  airdropGenerator(TOKEN_NAME, AIRDROP_RATIO);
};

module.exports = runAirdrop();