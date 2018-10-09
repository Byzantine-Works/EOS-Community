const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const request = require("request");
const axios = require('axios');

const init = () => {
  console.log('Airdrop Price Calculator initialzed\n')
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
        message: "Airdrop Ratio - How many tokens to give per 1 EOS? (Enter a Number or Decimal):"
      },
      {
        name: "MAX_TOKEN_SUPPLY",
        type: "input",
        message: "What is the Maximum Token Supply? (Enter a Number):"
      },
      {
        type: "list",
        name: "MIN_EOS_HELD",
        message: "What is the Minimum of number of EOS held for accounts you want to Airdrop to?",
        choices: ["0", "1", "10", "100", "1000", "10000"],
      },
      {
        type: "list",
        name: "MAX_EOS_HELD",
        message: "What is the Maximum of number of EOS held for accounts you want to Airdrop to?",
        choices: ["No Max", "1", "10", "100", "1000", "10000", "100000", "1000000"],
      }
  ];
  return inquirer.prompt(questions);
};

// const snapshot0 = require("./airdrop-snapshots/genesis-snapshot.json")
const snapshot1 = require("./airdrop-snapshots/snapshot-10-01-2018.json")
// const snapshot2 = require("./airdrop-snapshots/snapshot-10-05-2018.json")
/* Retrieve by running: csv2json ./airdrop-tools/20181001_account_snapshot.csv ./airdrop-tools/snapshot-10-01-2018.json */
// const snapshotFilter = require("./snapshotFilter.js") // May need to build seperate functions depending on snapshot used

const snapshotFilter = (snapshot, minEosHeld, maxEosHeld) => {
  // Filter through accounts that fit input parameters
  var snapshotCopy = snapshot.slice(0);
  if (isNaN(maxEosHeld)) {
    maxEosHeld = 1000000000;
    console.log('No Maximum EOS Value')
  }
  if (isNaN(minEosHeld)) {
    minEosHeld = 0;
    console.log('No Minimum EOS Value')
  }
  console.log(`Filtering for EOS Accounts holding between ${minEosHeld} and ${maxEosHeld} EOS\n`);
  var filtered = [];
  for (let i=0; i<snapshotCopy.length; i++) {
    if (snapshotCopy[i]['total_eos'] >= minEosHeld && snapshotCopy[i]['total_eos'] <= maxEosHeld) {
      filtered.push(snapshotCopy[i]);
    }
  }
  console.log("Snapshot Number of Accounts: ", snapshot.length)
  console.log("Filtered Number of Accounts: ", filtered.length)
  // Return Array with all accounts within the threshold
  return filtered
}

const getRamPrice = async () => {
  var RAM_PRICE = await axios.get('http://api.byzanti.ne:8902/getRamPrice')
    .then(response => {
      console.log('1) Axios Ram Price Is: ', response.data)
      return response.data
    }).catch(error => {
      console.log('Error Fetching Ram Price')
    })
    console.log('2) Final getRamPrice: ', RAM_PRICE)
    return RAM_PRICE
    

}

const getPriceEstimate = async (filteredSnapshotData, minEosHeld, maxEosHeld) => {
  // Filtered / Parsed Snapshot Data input here

  const RAM_PRICE = await getRamPrice()
  console.log("3) getPriceEstimate RAM_PRICE IS: ", RAM_PRICE)
  var ramPrice_EosPerKb = RAM_PRICE['price_per_kb_eos'];
  var ramPrice_UsdPerKb = RAM_PRICE['price_per_kb_usd']
  
  var numberOfAccounts = filteredSnapshotData.length         // 132192 Estimated based on genesis for now
  var ramPrice_EosPerByte = 0.11381643/1000                  // 0.11381643 EOS/kb for now
  var UsdPerEos = 5.61                                        // Current Price
  
  var ramRequiredKb = numberOfAccounts * 0.142  //142 Bytes Required per account
  
  console.log('Starting Price Estimates Calculations ~~~~~~')
  var priceEstimate_Eos = ramRequiredKb * ramPrice_EosPerKb;
  var priceEstimate_Usd = ramRequiredKb * ramPrice_UsdPerKb;
  priceEstimate_Eos = Math.floor(priceEstimate_Eos * 10000) / 10000 // Truncating to 4 digits
  priceEstimate_Usd = Math.floor(priceEstimate_Usd * 100) / 100;    // Truncating to 2 digits
  
  console.log(`
  #################################
  Number of Accounts: ${numberOfAccounts}
  RAM Required (kb): ${ramRequiredKb}
  Price Estimate EOS: ${priceEstimate_Eos}
  Price Estimate USD: $${priceEstimate_Usd}
  #################################
  `)
  return priceEstimate_Usd
}

const airdropGenerator = (tokenName, airdropRatio, maxTokenSupply, minEosHeld, maxEosHeld) => {
  // Main Airdrop Logic Here

};



const success = (priceEstimate) => {
  console.log(`~~~~~~ The estimated cost of the Airdrop with these settings will be : $${priceEstimate} USD`);
};

const runAirdrop = async () => {
  init();
  
  const answers = { // Sample Answers (for quick testing)
    TOKEN_NAME: 'testcoin',
    AIRDROP_RATIO: '5',
    MAX_TOKEN_SUPPLY: '1000000',
    MIN_EOS_HELD: '1',
    MAX_EOS_HELD: 'No Max',
  }
  // const answers = await askQuestions();
  const {
    TOKEN_NAME,
    AIRDROP_RATIO,
    MAX_TOKEN_SUPPLY,
    MIN_EOS_HELD,
    MAX_EOS_HELD,
  } = answers;

  for (var key in answers) {
    console.log(key.toString() + " --- " + answers[key].toString())
  } console.log('\n')

  // console.log('TOKEN_NAME Is: ' + TOKEN_NAME)
  // console.log('AIRDROP_RATIO Is: ' + AIRDROP_RATIO)
  // console.log('MIN_EOS_HELD Is: ' + MIN_EOS_HELD)
  // console.log('MAX_EOS_HELD Is: ' + MAX_EOS_HELD)
  // console.log('MAX_TOKEN_SUPPLY Is: ' + MAX_TOKEN_SUPPLY + '\n\n')
  
  // snapshotFilter(snapshot1);
  const filteredSnapshotData = snapshotFilter(snapshot1, MIN_EOS_HELD, MAX_EOS_HELD);
  const PRICE_ESTIMATE = await getPriceEstimate(filteredSnapshotData, MIN_EOS_HELD, MAX_EOS_HELD)
  success(PRICE_ESTIMATE);

  airdropGenerator(TOKEN_NAME, AIRDROP_RATIO);
};

module.exports = runAirdrop();