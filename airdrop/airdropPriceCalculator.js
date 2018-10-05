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
          message: "What is the minimum of number of EOS held within accounts you want to Airdrop to?",
          choices: ["0", "10", "100", "1000", "10000"],
      }
  ];
  return inquirer.prompt(questions);
};

const getPriceEstimate = (tokenName, airdropRatio, maxTokenSupply, minEosHeld, maxEosHeld) => {
  // Main Calculation Logic Here
};

const success = priceEstimate => {
  console.log('The cost of the Airdrop will be : ' + (priceEstimate));
};

const run = async () => {
  init();
  const answers = await askQuestions();
  const {
      TOKEN_NAME,
      AIRDROP_RATIO,
      MIN_EOS_HELD,
      MAX_TOKEN_SUPPLY
  } = answers;
  console.log('TOKEN_NAME Is: ' + TOKEN_NAME)
  console.log('AIRDROP_RATIO Is: ' + AIRDROP_RATIO)
  console.log('MIN_EOS_HELD Is: ' + MIN_EOS_HELD)
  console.log('MIN_EOS_HELD Is: ' + MAX_TOKEN_SUPPLY)
  const airdrop_options = getPriceEstimate(TOKEN_NAME, AIRDROP_RATIO);
  success(airdrop_options);
};

module.exports = run();