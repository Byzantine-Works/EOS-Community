const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const request = require("request");
const axios = require("axios");
const shell = require("shelljs");
const csv = require("csvtojson");
const fs = require('fs');
const genesisSnapshotJson = require("./airdrop-snapshots/genesis-snapshot-fitted.json") // Fitted Genesis Snapshot, or .csv file of daily EOS NewYork Snapshots

const csvFilePath = './airdrop-snapshots/genesis-snapshot.csv';  // UNCOMMENT TO USE GENESIS SNAPSHOT
// const csvFilePath = './airdrop-snapshots/20181005_account_snapshot.csv'; // UNCOMMENT TO USE EOS NEW YORK DAILY SNAPSHOTS

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
  const questions = [
      {
        name: "ACCOUNT_NAME",
        type: "input",
        message: "Account Name? (Enter 12 character Account Name):"
      },
      {
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
    console.log('Step 2a)) Converting Genesis Snapshot to Fitted Json...')
    return genesisSnapshotJson
  } else {
    var snapshotJson = await csv()
    .fromFile(csvFilePath).then((jsonObj)=>{
      console.log('Step 2b)) Converting Csv to Json...')
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

  console.log(chalk.blue("Snapshot Number of Accounts: "), chalk.red(snapshot.length))
  console.log(chalk.blue("Filtered Number of Accounts: "), chalk.red(filtered.length),'\n')
  // Return Array with all accounts within the threshold
  // console.log(filtered)
  return filtered
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

 const getPriceEstimate = async (numberOfAccounts) => {
  // Filtered / Parsed Snapshot Data input here

  const RAM_PRICE = await getRamPrice()
  // console.log("Step 3)) getPriceEstimate RAM_PRICE IS: ", RAM_PRICE)
  // console.log("Current Ram Price Is: ", RAM_PRICE)
  var ramPrice_EosPerKb = RAM_PRICE['price_per_kb_eos'];
  var ramPrice_UsdPerKb = RAM_PRICE['price_per_kb_usd']
  
  // var numberOfAccounts = filteredSnapshotData.length         // 132192 Estimated based on genesis for now
  var ramPrice_EosPerByte = 0.11381643/1000                  // 0.11381643 EOS/kb for now
  var UsdPerEos = 5.61                                        // Current Price
  
  var ramRequiredKb = numberOfAccounts * 0.142  //142 Bytes Required per account
  ramRequiredKb = Math.floor(ramRequiredKb * 1000) / 1000 // Truncating to 3 digits
  
  console.log('Step 3)) Starting Price Estimate Calculations...')
  var priceEstimate_Eos = ramRequiredKb * ramPrice_EosPerKb;
  var priceEstimate_Usd = ramRequiredKb * ramPrice_UsdPerKb;
  priceEstimate_Eos = Math.floor(priceEstimate_Eos * 10000) / 10000 // Truncating to 4 digits
  priceEstimate_Usd = Math.floor(priceEstimate_Usd * 100) / 100;    // Truncating to 2 digits
  
  // return priceEstimate_Usd

  var priceEstimate = {
    'numberOfAccounts': numberOfAccounts,
    'ramRequiredKb': ramRequiredKb,
    'priceEstimate_Eos': priceEstimate_Eos,
    'priceEstimate_Usd': priceEstimate_Usd,
  }
  return priceEstimate
}

const successPrice = (priceEstimate) => {
  console.log(chalk.bold.blue(
    `
    #################################
    Number of Accounts: ${priceEstimate.numberOfAccounts}       
    RAM Required (kb): ${priceEstimate.ramRequiredKb}     
    Price Estimate EOS: ${priceEstimate.priceEstimate_Eos}    
    Price Estimate USD: $${priceEstimate.priceEstimate_Usd}    
    #################################` + '\n'))

  console.log(chalk.blue(`The estimated cost of the Airdrop with these settings will be: ` + chalk.bold.red('$'+priceEstimate.priceEstimate_Usd+' USD\n')));
};


const formatOutput = (filtered, airdropRatio, precision) => {
  var arr = []; 
  for (let i=0; i<filtered.length; i++) {
    arr.push(filtered[i]['account_name'] + ',' + filtered[i]['total_eos'] + ',' + (filtered[i]['total_eos']*airdropRatio).toFixed(precision))
  }
  var str = arr.join('\n')
  // console.log('formatted output: ', str)
  // console.log('Output Lines Length : ', str.split(/\r\n|\r|\n/).length)
  return str
}

const generateAirdropCsv = (formatted) => {
  // await fs.writeFile('airdrop.csv', formatted, (err) => {
  //   if (err) throw err;
  //   console.log('4)) airdrop.csv file has been saved!');
  // });
  try {
    fs.writeFileSync('airdrop.csv', formatted);
    console.log('Step 4)) airdrop.csv file has been saved!');
    return true
  } catch(err) {
    console.log(err)
    return false
  }
    
}

// const generateAirdropSh = (formattedSnapshotData, accountName, tokenName, airdropRatio, maxTokenSupply, initialTokenSupply) => {
const generateAirdropSh = (airdropParams) => {
  // Main Airdrop Logic Here
  // Either Generate .sh file, or use shelljs? 
  const fullAirdropStr = `
  #!/bin/bash

  ISSUER_ACCOUNT="${airdropParams.accountName}"
  TOKEN_SYMBOL="${airdropParams.tokenName}"
  AIRDROP_RATIO="${airdropParams.airdropRatio}"
  MAX_TOKEN_SUPPLY="${airdropParams.maxTokenSupply}.0000"
  INITIAL_TOKEN_SUPPLY="${airdropParams.initialTokenSupply}.0000"
  NODE_URL="${airdropParams.nodeUrl}"
  CONTRACT_DIR="${airdropParams.contractDir}"
  SNAPSHOT_FILE="airdrop.csv"
  

  echo "Deploying token contract.."
    cleos -u $NODE_URL set contract $ISSUER_ACCOUNT $CONTRACT_DIR
    cleos -u $NODE_URL get code $ISSUER_ACCOUNT

  echo "Creating token..."
  CREATED=$(cleos -u $NODE_URL get table $ISSUER_ACCOUNT $TOKEN_SYMBOL stat | grep $TOKEN_SYMBOL)
  if [[ -z $CREATED ]]; then
      echo "Creating token: \\"$TOKEN_SYMBOL\\", with a max supply of: \\"$MAX_TOKEN_SUPPLY\\", under account: \\"$ISSUER_ACCOUNT\\"..."
      echo cleos -u $NODE_URL push action $ISSUER_ACCOUNT create "[\\"$ISSUER_ACCOUNT\\", \\"$MAX_TOKEN_SUPPLY $TOKEN_SYMBOL\\"]" -p $ISSUER_ACCOUNT@active
      cleos -u $NODE_URL push action $ISSUER_ACCOUNT create "[\\"$ISSUER_ACCOUNT\\", \\"$MAX_TOKEN_SUPPLY $TOKEN_SYMBOL\\"]" -p $ISSUER_ACCOUNT@active
  else
      echo "Token \\"$TOKEN_SYMBOL\\" already exist -- Skipping Create."
  fi
  
  ISSUANCE=$(cleos -u $NODE_URL get table $ISSUER_ACCOUNT $ISSUER_ACCOUNT accounts | grep $TOKEN_SYMBOL)
  if [[ -z $ISSUANCE ]]; then
      echo "Issuing initial supply of: \\"$INITIAL_TOKEN_SUPPLY $TOKEN_SYMBOL\\" to account \\"$ISSUER_ACCOUNT\\"..."
      echo cleos -u $NODE_URL push action $ISSUER_ACCOUNT issue "[\\"$ISSUER_ACCOUNT\\", \\"$INITIAL_TOKEN_SUPPLY $TOKEN_SYMBOL\\", \\"initial supply\\"]" -p $ISSUER_ACCOUNT@active
      cleos -u $NODE_URL push action $ISSUER_ACCOUNT issue "[\\"$ISSUER_ACCOUNT\\", \\"$INITIAL_TOKEN_SUPPLY $TOKEN_SYMBOL\\", \\"initial supply\\"]" -p $ISSUER_ACCOUNT@active
  else
      echo "Token already issued to \\"$ISSUER_ACCOUNT\\" -- Skipping issue"
  fi
  
  for line in $(cat $SNAPSHOT_FILE); do
      ACCOUNT=$(echo $line | tr "," "\\n" | head -1)
      AMOUNT=$(echo $line | tr "," "\\n" | tail -1)
      CURRENT_BALANCE=$(cleos -u $NODE_URL get table $ISSUER_ACCOUNT $ACCOUNT accounts | grep $TOKEN_SYMBOL) 
      if [[ -z $CURRENT_BALANCE ]]; then
          echo "Airdropping $AMOUNT $TOKEN_SYMBOL to $ACCOUNT"
          echo cleos -u $NODE_URL push action $ISSUER_ACCOUNT transfer "[\\"$ISSUER_ACCOUNT\\", \\"$ACCOUNT\\", \\"$AMOUNT $TOKEN_SYMBOL\\", \\"airdrop\\"]" -p $ISSUER_ACCOUNT@active
          cleos -u $NODE_URL push action $ISSUER_ACCOUNT transfer "[\\"$ISSUER_ACCOUNT\\", \\"$ACCOUNT\\", \\"$AMOUNT $TOKEN_SYMBOL\\", \\"airdrop\\"]" -p $ISSUER_ACCOUNT@active
      else
          echo "Skipping $ACCOUNT"
      fi 
  done
  
  `
  try {
    fs.writeFileSync('airdrop.sh', fullAirdropStr)
    console.log('Step 5)) airdrop.sh file has been saved! When ready to airdrop, you may run this file in a cleos enabled terminal');
    shell.exec('chmod 755 airdrop.sh');
    return true
  } catch (err) {
    console.log(err);
    return false
  }
  // return fullAirdropStr
};

const successFinal = (isCsvGenerated, isShGenerated) => {
  if (isCsvGenerated && isShGenerated) {  
    console.log(chalk.red.bold('\n Airdrop Generator complete. Once your account is ready with sufficient RAM bought and CPU/Net Staked, unlock your cleos wallet and run ./airdrop.sh'));
  }
}


const runShell = () => {
  shell.echo('\nrunShell Initialized');
  
  console.log('changing permissions of airdrop.sh to 755 read-write-execute')
  shell.exec('bash -c chmod 755 airdrop.sh');

  //// To execute the shell script
  console.log('\n~~~~~~~ executing shell script by line: ~~~~~~~');
  shell.exec('bash -c ./airdrop.sh');

  //// To view the shell script
  console.log('\n######## viewing shell source code by line: ########'); 
  var catshell = shell.cat('./airdrop.sh');
  console.log(catshell['stdout']);

  //// To view the txt file
  // var cattext = shell.cat('./test.txt')
  // console.log(cattext['stdout'])
    
  //// Testing jungle cleos on linux machine (through alias)
  // shell.exec('cleos -u http://193.93.219.219:8888/ get info');
  // shell.exec('cleos -u http://193.93.219.219:8888/ get table junglefoxfox junglefoxfox accounts')
}

const run = async () => {
  init();
  
  /*    Sample Answers (for quick testing) */
  // const ACCOUNT_NAME= 'junglefoxfox'
  // const TOKEN_NAME= 'AIRSIX';
  // const AIRDROP_RATIO= '5';
  // const MAX_TOKEN_SUPPLY= '1000000';
  // const INITIAL_TOKEN_SUPPLY= MAX_TOKEN_SUPPLY;
  // const MIN_EOS_HELD= '1000';
  // const MAX_EOS_HELD= '9999999';
  // const answers = {
  //     ACCOUNT_NAME,
  //     TOKEN_NAME,
  //     AIRDROP_RATIO,
  //     MAX_TOKEN_SUPPLY,
  //     INITIAL_TOKEN_SUPPLY,
  //     MIN_EOS_HELD,
  //     MAX_EOS_HELD,
  // }
  
  const answers = await askQuestions();
  const {
    ACCOUNT_NAME,
    TOKEN_NAME,
    AIRDROP_RATIO,
    MAX_TOKEN_SUPPLY,
    MIN_EOS_HELD,
    MAX_EOS_HELD,
  } = answers;
  const INITIAL_TOKEN_SUPPLY = MAX_TOKEN_SUPPLY;
    
  console.log('\nStep 1)) User Selected Inputs:\n')
  for (var key in answers) {
    console.log(chalk.blue(key.toString()) + " --- " + chalk.red(answers[key].toString()))
  } console.log('\n')

  /* Price Estimator Portion */
  const snapshotJson = await snapshotCsvToJson(csvFilePath) // Csv to Json
  const filteredSnapshotData = await snapshotFilter(snapshotJson, MIN_EOS_HELD, MAX_EOS_HELD); // Filtering Accounts by user params
  const PRICE_ESTIMATE = await getPriceEstimate(filteredSnapshotData.length) // Price Estimate Calculations
  successPrice(PRICE_ESTIMATE);
  
  /* Airdrop Portion */
  var AIRDROP_PARAMS = {
    'accountName': ACCOUNT_NAME,
    'tokenName': TOKEN_NAME,
    'airdropRatio': AIRDROP_RATIO,
    'maxTokenSupply': MAX_TOKEN_SUPPLY,
    'initialTokenSupply': INITIAL_TOKEN_SUPPLY,
    // 'nodeUrl': "http://193.93.219.219:8888/", // Jungle CryptoLions.io
    'nodeUrl': "http://eos-bp.bitfinex.com:8888/",
    'contractDir': "./eosio.token",
  }
  const formattedSnapshotData = await formatOutput(filteredSnapshotData, AIRDROP_RATIO, 4);
  const isCsvGenerated = generateAirdropCsv(formattedSnapshotData);
  const isShGenerated = generateAirdropSh(AIRDROP_PARAMS);
  successFinal(isCsvGenerated, isShGenerated);
  // console.log(AIRDROP_PARAMS);
  // console.log('isCsvGenerated: ', isCsvGenerated, '\nisShGenerated: ', isShGenerated);

  // await runShell()
};

module.exports = {init, askQuestions, snapshotCsvToJson, snapshotFilter, getRamPrice, getPriceEstimate, successPrice, formatOutput, generateAirdropCsv, generateAirdropSh, successFinal, runShell, run}
// module.exports = run();



