const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const request = require("request");
const axios = require("axios");
const shell = require("shelljs");
const csv = require("csvtojson");
const fs = require('fs');
const genesisSnapshotJson = require("./airdrop-snapshots/genesis-snapshot-fitted.json") // Fitted Genesis Snapshot, or .csv file of daily EOS NewYork Snapshots

// const csvFilePath = './airdrop-snapshots/genesis-snapshot.csv';  // UNCOMMENT TO USE GENESIS SNAPSHOT
const csvFilePath = './airdrop-snapshots/20181005_account_snapshot.csv'; // UNCOMMENT TO USE EOS NEW YORK DAILY SNAPSHOTS

const init = () => {
    console.log(
        chalk.blue(
            figlet.textSync("Airdrop Price Calculator", {
                font: "Standard",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );

  console.log('Airdrop Price Calculator initialzed...\n')
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

const snapshotCsvToJson = async (csvFilePath) => {
  if (csvFilePath == './airdrop-snapshots/genesis-snapshot.csv') {
    console.log('Converting Genesis Snapshot to Fitted Json...')
    return genesisSnapshotJson
  } else {
    var snapshotJson = await csv()
    .fromFile(csvFilePath).then((jsonObj)=>{
      console.log('Converting Csv to Json...')
      return jsonObj
      // console.log(jsonObj);
      /* [{a:"1", b:"2", c:"3"}, {a:"4", b:"5". c:"6"}]*/ 
    })  
    return snapshotJson;
  }

} 


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
  console.log(`Filtering for EOS Accounts holding between ${minEosHeld} and ${maxEosHeld} EOS...\n`);
  var filtered = [];
  for (let i=0; i<snapshotCopy.length; i++) {
    if ((parseInt(snapshotCopy[i]['total_eos']) >= minEosHeld) && (parseInt(snapshotCopy[i]['total_eos']) <= maxEosHeld)) {
      filtered.push(snapshotCopy[i]);
    }
  }

  console.log(chalk.blue("Snapshot Number of Accounts: "), snapshot.length)
  console.log(chalk.blue("Filtered Number of Accounts: "), filtered.length,'\n')
  // Return Array with all accounts within the threshold
  // console.log(filtered)
  return filtered
}

const formatOutput = (filtered, airdropRatio) => {
  var arr = []; 
  for (let i=0; i<filtered.length; i++) {
    arr.push(filtered[i]['account_name'] + ',' + filtered[i]['total_eos'] + ',' + filtered[i]['total_eos']*airdropRatio )
  }
  var str = arr.join('\n')
  // console.log('formatted output: ', str)
  console.log('Output Lines Length : ', str.split(/\r\n|\r|\n/).length)
  return str
}

const generateAirdropCsv = (formatted) => {
  fs.writeFile('Airdrop.csv', formatted, (err) => {
    if (err) throw err;
    console.log('Airdrop.csv file has been saved!');
  });

}

const getRamPrice = async () => {
  var RAM_PRICE = await axios.get('http://api.byzanti.ne:8902/getRamPrice?api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N')
    .then(response => {
      // console.log('1)) Axios Ram Price Is: ', response.data)
      return response.data
    }).catch(error => {
      console.log('Error Fetching Ram Price')
    })
    // console.log('2)) Final getRamPrice: ', RAM_PRICE)
    return RAM_PRICE
    

}

const getPriceEstimate = async (filteredSnapshotData, minEosHeld, maxEosHeld) => {
  // Filtered / Parsed Snapshot Data input here

  const RAM_PRICE = await getRamPrice()
  console.log("3)) getPriceEstimate RAM_PRICE IS: ", RAM_PRICE)
  var ramPrice_EosPerKb = RAM_PRICE['price_per_kb_eos'];
  var ramPrice_UsdPerKb = RAM_PRICE['price_per_kb_usd']
  
  var numberOfAccounts = filteredSnapshotData.length         // 132192 Estimated based on genesis for now
  var ramPrice_EosPerByte = 0.11381643/1000                  // 0.11381643 EOS/kb for now
  var UsdPerEos = 5.61                                        // Current Price
  
  var ramRequiredKb = numberOfAccounts * 0.142  //142 Bytes Required per account
  
  console.log('Starting Price Estimate Calculations...')
  var priceEstimate_Eos = ramRequiredKb * ramPrice_EosPerKb;
  var priceEstimate_Usd = ramRequiredKb * ramPrice_UsdPerKb;
  priceEstimate_Eos = Math.floor(priceEstimate_Eos * 10000) / 10000 // Truncating to 4 digits
  priceEstimate_Usd = Math.floor(priceEstimate_Usd * 100) / 100;    // Truncating to 2 digits
  
  console.log(chalk.bold.blue(
  `
  #################################
  Number of Accounts: ${numberOfAccounts}       
  RAM Required (kb): ${ramRequiredKb}     
  Price Estimate EOS: ${priceEstimate_Eos}    
  Price Estimate USD: $${priceEstimate_Usd}    
  #################################` + '\n'))
  return priceEstimate_Usd
}

const success = (priceEstimate) => {
  console.log(`The estimated cost of the Airdrop with these settings will be : ` + chalk.bold.blue('$'+priceEstimate) + ` USD`);
};

const airdropGenerator = (formattedSnapshotData, tokenName, airdropRatio, maxTokenSupply, minEosHeld, maxEosHeld) => {
  // Main Airdrop Logic Here
  // Either Generate .sh file, or use shelljs? 
};




const runShell = async () => {
  shell.echo('\nrunShell Initialized');
  
  //// To execute the shell script
  console.log('\n~~~~~~~ executing shell script by line: ~~~~~~~');
  shell.exec('bash -c ./run.sh');

  //// To view the shell script
  console.log('\n######## viewing shell source code by line: ########'); 
  var catshell = shell.cat('./run.sh');
  console.log(catshell['stdout']);

  //// To view the txt file
  // var cattext = shell.cat('./test.txt')
  // console.log(cattext['stdout'])
    
  //// Testing jungle cleos on linux machine (through alias)
  // shell.exec('cleos -u http://193.93.219.219:8888/ get info');
  // shell.exec('cleos -u http://193.93.219.219:8888/ get table junglefoxfox junglefoxfox accounts')
}

const runAirdrop = async () => {
  init();
  
  /*    Sample Answers (for quick testing) */
  const TOKEN_NAME= 'testcoin';
  const AIRDROP_RATIO= '5';
  const MAX_TOKEN_SUPPLY= '1000000';
  const INITIAL_TOKEN_SUPPLY= MAX_TOKEN_SUPPLY;
  const MIN_EOS_HELD= '1000';
  const MAX_EOS_HELD= '9999999';
  const answers = {
      TOKEN_NAME,
      AIRDROP_RATIO,
      MAX_TOKEN_SUPPLY,
      INITIAL_TOKEN_SUPPLY,
      MIN_EOS_HELD,
      MAX_EOS_HELD,
  }
  
  // const answers = await askQuestions();
  // const {
  //   TOKEN_NAME,
  //   AIRDROP_RATIO,
  //   MAX_TOKEN_SUPPLY,
  //   MIN_EOS_HELD,
  //   MAX_EOS_HELD,
  // } = answers;
  // const INITIAL_TOKEN_SUPPLY = MAX_TOKEN_SUPPLY;
    
  console.log('\n User Selected Inputs:')
  for (var key in answers) {
    console.log(chalk.blue(key.toString()) + " --- " + chalk.red(answers[key].toString()))
  } console.log('\n')

  const snapshotJson = await snapshotCsvToJson(csvFilePath) // Csv to Json
  const filteredSnapshotData = await snapshotFilter(snapshotJson, MIN_EOS_HELD, MAX_EOS_HELD); // Filtering Accounts by user params
  const PRICE_ESTIMATE = await getPriceEstimate(filteredSnapshotData, MIN_EOS_HELD, MAX_EOS_HELD) // Price Estimate Calculations
  success(PRICE_ESTIMATE);
  
  /* Airdrop Portion */
  const formatted = formatOutput(filteredSnapshotData, AIRDROP_RATIO);
  generateAirdropCsv(formatted);
  airdropGenerator(formatted, TOKEN_NAME, AIRDROP_RATIO, MAX_TOKEN_SUPPLY, INITIAL_TOKEN_SUPPLY);

  // runShell()
};

module.exports = runAirdrop();