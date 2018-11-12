const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const request = require("request");
const axios = require("axios");
const shell = require("shelljs");
const csv = require("csvtojson");
const path = require('path');
const fs = require('fs');
const genesisSnapshotJson = require("./airdrop-snapshots/genesis-snapshot-fitted.json") // Fitted Genesis Snapshot, or .csv file of daily EOS NewYork Snapshots

const init = () => {
    console.log(
        chalk.red.bold(
            figlet.textSync("Airdrop Price Calculator", {
                font: "Standard",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );

  // console.log('Airdrop Price Calculator initialzed...\n')
};

const askQuestions = async () => {
  const questions0 = [
      {
        name: "ACCOUNT_NAME",
        type: "input",
        message: "Account Name? (Enter 12 character Account Name):"
      },
      {
          name: "TOKEN_NAME",
          type: "input",
          message: "Enter the name of Token? (Enter 7 Letters or less):"
      },
      {
        name: "MAX_TOKEN_SUPPLY",
        type: "input",
        message: "What is the Maximum Token Supply? (Enter a Number):"
      },
    ]
    const questions1 = [    
      {
        name: "SNAPSHOT_MONTH",
        type: "list",
        message: "Which Snapshot would you like to use?:",
        choices: ["Genesis", "Jungle Testnet", "July", "August", "September", "October", "November"],
      },
    ];

  //   const questions2 = [    
  //     {
  //       type: "list",
  //       name: "MIN_EOS_HELD",
  //       message: "Minimum of number of EOS held for accounts you want to Airdrop to?",
  //       choices: ["0", "1", "10", "100", "1000", "10000", "100000", "1000000"],
  //     },
  //     {
  //       type: "list",
  //       name: "MAX_EOS_HELD",
  //       message: "Maximum of number of EOS held for accounts you want to Airdrop to?",
  //       choices: ["No Max", "1", "10", "100", "1000", "10000", "100000", "1000000"],
  //     },
  //   ];
  const questions2_min = [
    {
      type: "list",
      name: "MIN_EOS_HELD",
      message: "Minimum of number of EOS held for accounts you want to Airdrop to?",
      choices: ["0", "1", "10", "100", "1000", "10000", "100000", "1000000"],
    }
  ];
  const questions2_max = [
    {
      type: "list",
      name: "MAX_EOS_HELD",
      message: "Maximum of number of EOS held for accounts you want to Airdrop to?",
      choices: ["No Max", "1", "10", "100", "1000", "10000", "100000", "1000000"],
    }
  ];  
  const questions3 = [    
    {
      name: "RATIO_OR_FLAT",
      type: "list",
      message: "Would you like an Airdrop Ratio or an Equal Flat Amount to all users",
      choices: ["Airdrop Ratio Amount", "Airdrop Flat Amount"],
    },
  ];
  const questions4_ratio = [
    {
      name: "AIRDROP_RATIO",
      type: "input",
      message: "Airdrop Ratio Amount - How many tokens to give per 1 EOS? (Enter a Number or Decimal):"
    },
  ];
  const questions4_flat = [
    {
      name: "AIRDROP_FLAT",
      type: "input",
      message: "Airdrop Flat Amount - How many tokens to give every user? (Enter a Number or Decimal):"
    },
  ];
  
  var answersFinal = {};
  var answers0 = await inquirer.prompt(questions0); // Asking Question 0 (Name, Symbol, MaxSupply)
  var answers1 = await inquirer.prompt(questions1); // Asking Question 1 (Snapshot Month)

    // Gettiing account estimate for Questions 2 (Min/Max)
    var estimateSnapshotJson = await snapshotCsvToJson(answers1.SNAPSHOT_MONTH);
    var accountEstimate = await snapshotAccountEstimator(estimateSnapshotJson);
    // console.log('accountEstimate in Questions', accountEstimate);
    questions2_min[0]['choices'] = [];
    var minChoicesArr = [];
    for (key in accountEstimate) {
      minChoicesArr.push(key.toString() + ': (' + accountEstimate[key].toString() + ' accounts)')
    }
    questions2_min[0]['choices'] = minChoicesArr

  var answers2_min = await inquirer.prompt(questions2_min); // Asking Question 2 (Min/Max)
  var answers2_max = await inquirer.prompt(questions2_max); 
    answers2_min['MIN_EOS_HELD'] = answers2_min['MIN_EOS_HELD'].split(':')[0]
  if (isNaN(answers2_max)) {
    answers2_max['MAX_EOS_HELD'] = 1000000000;
    // console.log('No Maximum EOS Value, defaulting Max to 1000000000')
  }
  // console.log('answers2_min', answers2_min);
  
  var answers3 = await inquirer.prompt(questions3); // Asking Questions 3 and 4 (Ratio/Flat)
  if (answers3.RATIO_OR_FLAT === 'Airdrop Ratio Amount') {
    var answers4 = await inquirer.prompt(questions4_ratio);
  } else if (answers3.RATIO_OR_FLAT === 'Airdrop Flat Amount') {
    var answers4 = await inquirer.prompt(questions4_flat);
  }

  // Copying all answers into answersFinal
  for (var key in answers0) {
    answersFinal[key] = answers0[key]; // ACCOUNT_NAME, TOKEN_NAME, MAX_TOKEN_SUPPLY
  }
  answersFinal['SNAPSHOT_MONTH'] = answers1['SNAPSHOT_MONTH'];
  answersFinal['MIN_EOS_HELD'] = answers2_min['MIN_EOS_HELD'];
  answersFinal['MAX_EOS_HELD'] = answers2_max['MAX_EOS_HELD'];
  answersFinal['RATIO_OR_FLAT'] = answers3['RATIO_OR_FLAT'];
  for (var key in answers4) {
    answersFinal[key] = answers4[key]; // AIRDROP_RATIO or AIRDROP_FLAT
  }

  // Adding Default values
  // if (answers1['ACCOUNT_NAME'] = '') {answers1['ACCOUNT_NAME']='junglefoxfox';} // Default to junglefoxfox test account
  // if (answers1['TOKEN_NAME'] = '') {answers1['TOKEN_NAME']='TESTA';} // Default to test coin symbol
  // if (answers1['MAX_TOKEN_SUPPLY'] = '') {answers1['MAX_TOKEN_SUPPLY']='1000000000';} // Default to 1 Billion

  // console.log('answersFinal', answersFinal)
  return answersFinal
};



const runQuestionAssertions = async (answers) => {
  const assert = function(expectedBehavior, descriptionOfCorrectBehavior) {
    if (!expectedBehavior) {
      console.log('test failed ', descriptionOfCorrectBehavior);
      errors.push(descriptionOfCorrectBehavior)
    } else {
      console.log('test passed')
    }
  }
  
  var errors = [];
  assert(answers.ACCOUNT_NAME.length === 12, 'Account name must be 12 characters')
  assert(answers.TOKEN_NAME.length <= 7, 'Token Name must be 7 characters or less')
  assert(!isNaN(parseFloat(answers.MAX_TOKEN_SUPPLY)), 'Max Token Supply should be a number')
  assert(parseFloat(answers.MAX_TOKEN_SUPPLY) > 0, 'Max Token Supply should be > 0')
  assert(parseFloat(answers.MIN_EOS_HELD) <= parseFloat(answers.MAX_EOS_HELD), 'MIN EOS Held must be <= MAX EOS Held')
  
  if (answers.RATIO_OR_FLAT === 'Airdrop Ratio Amount') {
    assert(!isNaN(parseFloat(answers.AIRDROP_RATIO)), 'Airdrop Ratio should be a number')
  }
  if (answers.RATIO_OR_FLAT === 'Airdrop Flat Amount') {
    assert(!isNaN(parseFloat(answers.AIRDROP_FLAT)), 'Airdrop Flat should be a number')
  }


  if (errors.length > 0) {
    console.log(chalk.red('\nERROR: Please re-enter airdrop params and fix errors!'))
    console.log(chalk.red('\nAmount of Errors: ', errors.length))

    for (let i=0; i<errors.length; i++) {
      console.log(chalk.red(`Error ${i}:`, errors[i]))
    }

    var answers = await askQuestions()
    // console.log('1) Answers AFTER assertion errors', answers)
    answers = await runQuestionAssertions(answers);
    // console.log('3) Final Returning AFTER assertion errors', answers)
    return answers

  }
  // console.log("2) RETURNING No Errors Base Case", answers)
  return answers
}

const snapshotCsvToJson = async (snapshotMonth) => {
// const csvFilePath = './airdrop-snapshots/20181005_account_snapshot.csv'; // UNCOMMENT TO USE EOS NEW YORK DAILY SNAPSHOTS
  var csvFilePath;
  if (snapshotMonth === 'Genesis') {
    // console.log('Step 2a)) Converting Genesis Snapshot to Fitted Json...')
    return genesisSnapshotJson
  } else if (snapshotMonth === 'Jungle Testnet') { 
    return genesisSnapshotJson // Genesis until Up-to-date Jungle snapshot located
  } else if (snapshotMonth === 'July') { 
    csvFilePath = './airdrop-snapshots/20180730_account_snapshot.csv'; // July 30th
  } else if (snapshotMonth === 'August') { 
    csvFilePath = './airdrop-snapshots/20180801_account_snapshot.csv'; // August 1st  
  } else if (snapshotMonth === 'September') { 
    csvFilePath = './airdrop-snapshots/20180901_account_snapshot.csv'; // September 1st
  } else if (snapshotMonth === 'October') { 
    csvFilePath = './airdrop-snapshots/20181001_account_snapshot.csv'; // October 1st
  } else if (snapshotMonth === 'November') { 
    csvFilePath = './airdrop-snapshots/20181101_account_snapshot.csv'; // November 1st
  }
  var snapshotJson = await csv()
  .fromFile(path.resolve(__dirname, csvFilePath)).then((jsonObj)=>{
  // .fromFile(csvFilePath).then((jsonObj)=>{
      // console.log('dirname', __dirname)
    // console.log(`Step 2b)) Converting Csv to Json for ${snapshotMonth} Snapshot...`)
    // console.log('jsonObj', jsonObj);
    return jsonObj
  }) 
  return snapshotJson; 
} 

const snapshotAccountEstimator = async (snapshot) => {
  // console.log(`Out of ${snapshot.length} total accounts, Estimating number of Accounts above X EOS...\n`);
  var accountsWithOverXEos = {
    '0': 0,
    '1': 0,
    '10': 0,
    '100': 0,
    '1000': 0,
    '10000': 0,
    '100000': 0,
    '1000000': 0,
    '10000000': 0,
  };
  var snapshotCopy = snapshot.slice(0);
  var filtered = [];
  for (rangeMin in accountsWithOverXEos) {    
    for (let i=0; i<snapshotCopy.length; i++) {
      if (parseInt(snapshotCopy[i]['total_eos']) >= parseInt(rangeMin)) {
        accountsWithOverXEos[rangeMin]++;
      }
    }
  }

  // console.log('accountsWithOverXEos', accountsWithOverXEos)
  return accountsWithOverXEos
}

const snapshotFilter = (snapshot, minEosHeld, maxEosHeld) => {
  // Filter through accounts that fit input parameters
  var snapshotCopy = snapshot.slice(0);
  if (isNaN(maxEosHeld)) {
    maxEosHeld = 1000000000;
    // console.log('No Maximum EOS Value')
  }
  if (isNaN(minEosHeld)) {
    minEosHeld = 0;
    // console.log('No Minimum EOS Value')
  }
  console.log(`Step 2)) Filtering for EOS Accounts holding between ${minEosHeld} and ${maxEosHeld} EOS...\n`);
  var filtered = [];
  for (let i=0; i<snapshotCopy.length; i++) {
    if ((parseFloat(snapshotCopy[i]['total_eos']) >= parseFloat(minEosHeld)) && (parseFloat(snapshotCopy[i]['total_eos']) <= parseFloat(maxEosHeld))) {
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

  
  // Staking Values CPU
  // 1 EOS = 8916.9603 microseconds - 262026.3546 microseconds Estimate 
  // 650 microseconds = 0.07289480 - 0.00248067 EOS Average Low
  // 2000 microseconds = 0.22429168 - 0.00763282 EOS Average High (With Outliers)
  // 12000 microeconds = 1.34575008  - 0.04579692 EOS High Outlier
  var cpuCostPerAccountLow = 0.07289480 // EOS High End
  var cpuStakeEstimate_EOSLow = numberOfAccounts * cpuCostPerAccountLow
  cpuStakeEstimate_EOSLow = Math.floor(cpuStakeEstimate_EOSLow * 10000) / 10000;    // Rounding to 4 digits
  var cpuCostPerAccountHigh = 0.22429168 // EOS High End
  var cpuStakeEstimate_EOSHigh = numberOfAccounts * cpuCostPerAccountHigh
  cpuStakeEstimate_EOSHigh = Math.floor(cpuStakeEstimate_EOSHigh * 10000) / 10000;    // Rounding to 4 digits

  // Bandwidth 
  // 66~ Bytes per account = 0.00003217 EOS 
  var netCostPerAccount = 0.00003217 // EOS
  var netStakeEstimate_EOS = numberOfAccounts * netCostPerAccount
  netStakeEstimate_EOS = Math.floor(netStakeEstimate_EOS * 100) / 100;    // Truncating to 2 digits
  
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
    'cpuStakeEstimate_EOSLow': cpuStakeEstimate_EOSLow,
    'cpuStakeEstimate_EOSHigh': cpuStakeEstimate_EOSHigh,
    'netStakeEstimate_EOS': netStakeEstimate_EOS,
    'priceEstimate_Eos': priceEstimate_Eos,
    'priceEstimate_Usd': priceEstimate_Usd,
  }
  return priceEstimate
}

const successPrice = (priceEstimate) => {
  console.log(chalk.bold.blue(
    `
    ###########################################
    Number of Accounts: ${priceEstimate.numberOfAccounts}       
    RAM Required (kb): ${priceEstimate.ramRequiredKb}     
    CPU-Stake Rough Estimate*: ${priceEstimate.cpuStakeEstimate_EOSLow}-${priceEstimate.cpuStakeEstimate_EOSHigh} EOS   
    NET-Stake Rough Estimate*: ${priceEstimate.netStakeEstimate_EOS} EOS    
    Price Estimate EOS: ${priceEstimate.priceEstimate_Eos} EOS   
    Price Estimate USD: $${priceEstimate.priceEstimate_Usd}    
    ###########################################` + '\n'))

  console.log(chalk.blue(`The estimated cost of the Airdrop with these settings will be: ` + chalk.bold.red('$'+priceEstimate.priceEstimate_Usd+' USD\n')));
};



const nodeChecker = async (node) => {
  // var nodeCheck = await axios.get('http://jungle.cryptolions.io:8888/v1/chain/get_info') // This server is down, use for testing faulty node cases

  var nodeCheck = await axios.get(node + 'v1/chain/get_info')
  .then(response => {
    console.log('Step 4a)) Successfully connected to node')
    return true
    // return response.data.head_block_num
  }).catch(error => {
    console.log('Error Connecting with node')
    return false
  })
  
  if (nodeCheck) {
    // console.log('Step 4b)) nodeCheck - Current Block Number: ', nodeCheck)
  }
  
  return nodeCheck
}

const nodeSelector = async (snapshotMonth) => {
  var workingNodes = {};
  var jungleNodes = {
    'jungleTiger': 'http://193.93.219.219:8888/', // Jungle CryptoLions.io Tiger
    // 'jungleBitfinex': "http://eos-bp.bitfinex.com:8888/", // Jungle Bitfinex
    'broken': "http://jungle.cryptolions.io:8888/", // Broken Jungle Server (for testing)
  }
  // console.log('All jungleNodes', jungleNodes)
  var mainnetNodes = {
    'Libertyblock': "http://mainnet.libertyblock.io:8888/", // LibertyBlock Mainnet
    'Greymass': "https://eos.greymass.com/", // Greymass Mainnet
  }
  // console.log('All mainnetNodes', mainnetNodes)


  if (snapshotMonth === 'Jungle Testnet') {
    if (await nodeChecker(jungleNodes.jungleTiger)) {
      console.log('Step 4b)) Choosing Available Node:', jungleNodes['jungleTiger']) 
      return jungleNodes['jungleTiger']      
    }

    for (node in jungleNodes) {
      if (await nodeChecker(jungleNodes[node])) {
        console.log(`Step 4b)) Choosing Available Node: ${jungleNodes[node]}`);
        workingNodes[node] = jungleNodes[node];
        return workingNodes[node];
      }
    }
    
  } else {
    for (node in mainnetNodes) {
      if (await nodeChecker(mainnetNodes[node])) {
        console.log(`Step 4b)) Choosing Available Node: ${mainnetNodes[node]}`);
        workingNodes[node] = mainnetNodes[node];
        return workingNodes[node];
      }
    }
  }

  console.log('Error: Nodes are all down or unavailable, please try again later')
  // throw new Error("Nodes are all down or unavailable, please try again later")
}

const formatOutput = (filtered, airdropParams) => {
  var arr = []; 
  if (airdropParams.ratioOrFlat === 'Airdrop Ratio Amount') {
    var airdropRatio = airdropParams.airdropRatio;
    var airdropFlat = 0;
  } else if (airdropParams.ratioOrFlat === 'Airdrop Flat Amount') {
    var airdropRatio = 0;
    var airdropFlat = airdropParams.airdropFlat; 
  }

  var tokenAmount
  for (let i=0; i<filtered.length; i++) {
    // tokenAmount = (filtered[i]['total_eos']*airdropParams.airdropRatio).toFixed(airdropParams.precision) // Ratio Only
    // tokenAmount = (parseInt(airdropParams.airdropFlat)).toFixed(airdropParams.precision)  // Fixed Only
    tokenAmount = (filtered[i]['total_eos']*parseFloat(airdropRatio) + parseFloat(airdropFlat))
    tokenAmount = tokenAmount.toFixed(airdropParams.precision)
    arr.push(filtered[i]['account_name'] + ',' + filtered[i]['total_eos'] + ',' + tokenAmount)
  }
  var str = arr.join('\n')
  // console.log('formatted output: ', str)
  // console.log('Output Lines Length : ', str.split(/\r\n|\r|\n/).length)
  return str
}

const generateAirdropCsv = (formatted) => {
  try {
    fs.writeFileSync('airdrop.csv', formatted);
    console.log('Step 5)) airdrop.csv file has been saved!');
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
  AIRDROP_FLAT="${airdropParams.airdropFlat}"
  MAX_TOKEN_SUPPLY="${airdropParams.maxTokenSupply}.0000"
  INITIAL_TOKEN_SUPPLY="${airdropParams.initialTokenSupply}.0000"
  PRECISION="${airdropParams.precision}"
  NUMBER_OF_ACCOUNTS="${airdropParams.numberOfAccounts}"
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
  
  count=0
  for line in $(cat $SNAPSHOT_FILE); do
      ((count++))
      ACCOUNT=$(echo $line | tr "," "\\n" | head -1)
      AMOUNT=$(echo $line | tr "," "\\n" | tail -1)
      CURRENT_BALANCE=$(cleos -u $NODE_URL get table $ISSUER_ACCOUNT $ACCOUNT accounts | grep $TOKEN_SYMBOL) 
      if [[ -z $CURRENT_BALANCE ]]; then
          echo "$count/$NUMBER_OF_ACCOUNTS Airdropping $AMOUNT $TOKEN_SYMBOL to $ACCOUNT"
          echo cleos -u $NODE_URL push action $ISSUER_ACCOUNT transfer "[\\"$ISSUER_ACCOUNT\\", \\"$ACCOUNT\\", \\"$AMOUNT $TOKEN_SYMBOL\\", \\"airdrop\\"]" -p $ISSUER_ACCOUNT@active
          cleos -u $NODE_URL push action $ISSUER_ACCOUNT transfer "[\\"$ISSUER_ACCOUNT\\", \\"$ACCOUNT\\", \\"$AMOUNT $TOKEN_SYMBOL\\", \\"airdrop\\"]" -p $ISSUER_ACCOUNT@active
      else
          echo "$count Skipping $ACCOUNT"
      fi 
  done

  echo "Airdrop Complete"
  
  `
  try {
    fs.writeFileSync('airdrop.sh', fullAirdropStr)
    console.log('Step 6)) airdrop.sh file has been saved! When ready to airdrop, you may run this file in a cleos enabled terminal');
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

const runAssertions = () => {
}

const run = async () => {
  init();
  
  /*    Sample Answers (for quick testing) */
  // const ACCOUNT_NAME= 'junglefoxfox'
  // const TOKEN_NAME= 'AIRSIX';
  // const MAX_TOKEN_SUPPLY= '1000000';
  // const SNAPSHOT_MONTH= 'November'
  // const MIN_EOS_HELD= '100';
  // const MAX_EOS_HELD= '9999999';
  // const RATIO_OR_FLAT= 'Airdrop Flat Amount'
  // const AIRDROP_RATIO= '5';
  // const AIRDROP_FLAT= '0';
  // const INITIAL_TOKEN_SUPPLY= MAX_TOKEN_SUPPLY;
  // const answers = {
  //     ACCOUNT_NAME,
  //     TOKEN_NAME,
  //     AIRDROP_RATIO,
  //     MAX_TOKEN_SUPPLY,
  //     INITIAL_TOKEN_SUPPLY,
  //     MIN_EOS_HELD,
  //     MAX_EOS_HELD,
  // }
  

  /* Actual Questions */
  var answers = await askQuestions();
  answers = await runQuestionAssertions(answers);
  var {
    ACCOUNT_NAME,
    TOKEN_NAME,
    MAX_TOKEN_SUPPLY,
    SNAPSHOT_MONTH,
    MIN_EOS_HELD,
    MAX_EOS_HELD,
    RATIO_OR_FLAT,
    AIRDROP_RATIO,
    AIRDROP_FLAT,
  } = answers;
  var INITIAL_TOKEN_SUPPLY = MAX_TOKEN_SUPPLY;
  var PRECISION = 4;
  ACCOUNT_NAME = ACCOUNT_NAME.toLowerCase();
  TOKEN_NAME = TOKEN_NAME.toUpperCase();

    
  console.log('\nStep 1)) User Selected Inputs:\n')
  for (var key in answers) {
    console.log(chalk.blue(key.toString()) + " --- " + chalk.red(answers[key].toString()))
  } console.log('\n')

  /* Price Estimator Portion */
  const snapshotJson = await snapshotCsvToJson(SNAPSHOT_MONTH) // Csv to Json
  const accountEstimate = await snapshotAccountEstimator(snapshotJson) // accountEstimator
  const filteredSnapshotData = await snapshotFilter(snapshotJson, MIN_EOS_HELD, MAX_EOS_HELD); // Filtering Accounts by user params
  const PRICE_ESTIMATE = await getPriceEstimate(filteredSnapshotData.length) // Price Estimate Calculations
  successPrice(PRICE_ESTIMATE);
  
  /* Airdrop Portion */
  // const NODE_URL = 'http://mainnet.libertyblock.io:8888/';
  const NODE_URL = await nodeSelector(SNAPSHOT_MONTH) || 'http://mainnet.libertyblock.io:8888/';
  var AIRDROP_PARAMS = {
    'accountName': ACCOUNT_NAME,
    'tokenName': TOKEN_NAME,
    'maxTokenSupply': MAX_TOKEN_SUPPLY,
    'precision': PRECISION,
    'snapshotMonth': SNAPSHOT_MONTH,
    'ratioOrFlat': RATIO_OR_FLAT,
    'airdropRatio': AIRDROP_RATIO,
    'airdropFlat': AIRDROP_FLAT,
    'initialTokenSupply': INITIAL_TOKEN_SUPPLY,
    'numberOfAccounts':filteredSnapshotData.length,
    'nodeUrl': NODE_URL, // Jungle CryptoLions.io
    // 'nodeUrl': "http://193.93.219.219:8888/", // Jungle CryptoLions.io
    // 'nodeUrl': "http://eos-bp.bitfinex.com:8888/", // Bitfinex Testnet
    'contractDir': "./eosio.token",
  }
  // console.log('AIRDROP_PARAMS', AIRDROP_PARAMS)
  const formattedSnapshotData = await formatOutput(filteredSnapshotData, AIRDROP_PARAMS);
  const isCsvGenerated = generateAirdropCsv(formattedSnapshotData);
  const isShGenerated = generateAirdropSh(AIRDROP_PARAMS);
  successFinal(isCsvGenerated, isShGenerated);
  // console.log(AIRDROP_PARAMS);
  // console.log('isCsvGenerated: ', isCsvGenerated, '\nisShGenerated: ', isShGenerated);

  // await runShell()
};



module.exports = {init, askQuestions, snapshotCsvToJson, snapshotFilter, getRamPrice, getPriceEstimate, successPrice, nodeChecker, nodeSelector, formatOutput, generateAirdropCsv, generateAirdropSh, successFinal, runShell, run}
// module.exports = run();



