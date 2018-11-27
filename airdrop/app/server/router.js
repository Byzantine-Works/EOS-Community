const axios = require('axios');
const router = require('express').Router();
const cli = require('../../cli.js');
console.log('CLI Functions', cli);

// router.post('/get_price_estimate', cli.getPriceEstimate.post);
// router.get('/download_csv', cli.generateAirdropCsv.get);
// router.get('/download_sh', cli.generateAirdropSh.get);


router.get('/get_price', (req, res) => {
  // var airdropParams = req.body.AIRDROP_PARAMS
  // res.send(req.body);
  console.log('Server: GET request to /get_price received -- req.body:', req.body);
  res.send('Server Res: GET request to /get_price received');
})


router.post('/get_estimate', (req, res) => {
  console.log('Server: POST request to /get_estimate received -- req.body', req.body);
  var userParams = req.body


  const runPost_getPriceEstimate = async () => {
    const snapshotJson = await cli.snapshotCsvToJson(userParams.SNAPSHOT_MONTH) // Csv to Json
    const filteredSnapshotData = await cli.snapshotFilter(snapshotJson, userParams.MIN_EOS_HELD, userParams.MAX_EOS_HELD); // Filtering Accounts by user params
    const PRICE_ESTIMATE = await cli.getPriceEstimate(filteredSnapshotData.length) // Price Estimate Calculations
    // cli.successPrice(PRICE_ESTIMATE);
    
    console.log(PRICE_ESTIMATE)
    res.send(PRICE_ESTIMATE);
  }

  runPost_getPriceEstimate()
})


router.post('/downloadcsv', (req, res) => {
  console.log('Server: POST request to /downloadcsv received -- req.body', req.body);
  var userParams = req.body

  const runPost_downloadcsv = async () => {    
    const snapshotJson = await cli.snapshotCsvToJson(userParams.SNAPSHOT_MONTH) // Csv to Json
    const filteredSnapshotData = await cli.snapshotFilter(snapshotJson, userParams.MIN_EOS_HELD, userParams.MAX_EOS_HELD); // Filtering Accounts by user params

    var airdropParams = userParams
    // const NODE_URL = await nodeSelector(airdropParams.SNAPSHOT_MONTH) || 'http://mainnet.libertyblock.io:8888/';
    const NODE_URL = 'http://mainnet.libertyblock.io:8888/';
    var INITIAL_TOKEN_SUPPLY = airdropParams.MAX_TOKEN_SUPPLY;
    var PRECISION = 4;
    var AIRDROP_PARAMS = {
      'accountName': airdropParams.ACCOUNT_NAME,
      'tokenName': airdropParams.TOKEN_NAME,
      'maxTokenSupply': airdropParams.MAX_TOKEN_SUPPLY,
      'snapshotMonth': airdropParams.SNAPSHOT_MONTH,
      'ratioOrFlat': airdropParams.RATIO_OR_FLAT,
      'airdropRatio': airdropParams.AIRDROP_RATIO,
      'airdropFlat': airdropParams.AIRDROP_FLAT,
      'precision': PRECISION,
      'initialTokenSupply': INITIAL_TOKEN_SUPPLY,
      'numberOfAccounts': filteredSnapshotData.length,
      'nodeUrl': NODE_URL, // Jungle CryptoLions.io
      // 'nodeUrl': "http://193.93.219.219:8888/", // Jungle CryptoLions.io
      // 'nodeUrl': "http://eos-bp.bitfinex.com:8888/", // Bitfinex Testnet
      'contractDir': "./eosio.token",
    }
    // console.log('AIRDROP_PARAMS', AIRDROP_PARAMS)
    const formattedSnapshotData = await cli.formatOutput(filteredSnapshotData, AIRDROP_PARAMS);
    const CsvGeneratedStr = cli.generateAirdropCsv(formattedSnapshotData);
    // const isShGenerated = cli.generateAirdropSh(AIRDROP_PARAMS);
    console.log('Sending back Csv')
    res.send(CsvGeneratedStr);
  }

  console.log('initiating async run in POST')
  runPost_downloadcsv()
})

router.post('/downloadsh', (req, res) => {
  console.log('Server: POST request to /downloadsh received -- req.body', req.body);
  var userParams = req.body

  const runPost_downloadsh = async () => {    
    const snapshotJson = await cli.snapshotCsvToJson(userParams.SNAPSHOT_MONTH) // Csv to Json
    const filteredSnapshotData = await cli.snapshotFilter(snapshotJson, userParams.MIN_EOS_HELD, userParams.MAX_EOS_HELD); // Filtering Accounts by user params

    var airdropParams = userParams
    // const NODE_URL = await nodeSelector(airdropParams.SNAPSHOT_MONTH) || 'http://mainnet.libertyblock.io:8888/';
    const NODE_URL = 'http://mainnet.libertyblock.io:8888/';
    var INITIAL_TOKEN_SUPPLY = airdropParams.MAX_TOKEN_SUPPLY;
    var PRECISION = 4;
    var AIRDROP_PARAMS = {
      'accountName': airdropParams.ACCOUNT_NAME,
      'tokenName': airdropParams.TOKEN_NAME,
      'maxTokenSupply': airdropParams.MAX_TOKEN_SUPPLY,
      'snapshotMonth': airdropParams.SNAPSHOT_MONTH,
      'ratioOrFlat': airdropParams.RATIO_OR_FLAT,
      'airdropRatio': airdropParams.AIRDROP_RATIO,
      'airdropFlat': airdropParams.AIRDROP_FLAT,
      'precision': PRECISION,
      'initialTokenSupply': INITIAL_TOKEN_SUPPLY,
      'numberOfAccounts': filteredSnapshotData.length,
      'nodeUrl': NODE_URL, // Jungle CryptoLions.io
      // 'nodeUrl': "http://193.93.219.219:8888/", // Jungle CryptoLions.io
      // 'nodeUrl': "http://eos-bp.bitfinex.com:8888/", // Bitfinex Testnet
      'contractDir': "./eosio.token",
    }
    // console.log('AIRDROP_PARAMS', AIRDROP_PARAMS)
    const formattedSnapshotData = await cli.formatOutput(filteredSnapshotData, AIRDROP_PARAMS);
    const ShGeneratedStr = cli.generateAirdropSh(AIRDROP_PARAMS);
    console.log('Sending back Sh', ShGeneratedStr)
    res.send(ShGeneratedStr);
  }

  // console.log('initiating async downloadSh in POST')
  runPost_downloadsh()
})



/* CLI Exports available */
// module.exports = {init, askQuestions, snapshotCsvToJson, snapshotFilter, getRamPrice, getPriceEstimate, successPrice, nodeChecker, nodeSelector, formatOutput, generateAirdropCsv, generateAirdropSh, successFinal, runShell, run}
module.exports = router;




// const run = async () => {
//   init();
  
//   /*    Sample Answers (for quick testing) */
//   // const ACCOUNT_NAME= 'junglefoxfox'
//   // const TOKEN_NAME= 'AIRSIX';
//   // const MAX_TOKEN_SUPPLY= '1000000';
//   // const SNAPSHOT_MONTH= 'November'
//   // const MIN_EOS_HELD= '100';
//   // const MAX_EOS_HELD= '9999999';
//   // const RATIO_OR_FLAT= 'Airdrop Flat Amount'
//   // const AIRDROP_RATIO= '5';
//   // const AIRDROP_FLAT= '0';
//   // const INITIAL_TOKEN_SUPPLY= MAX_TOKEN_SUPPLY;
//   // const answers = {
//   //     ACCOUNT_NAME,
//   //     TOKEN_NAME,
//   //     AIRDROP_RATIO,
//   //     MAX_TOKEN_SUPPLY,
//   //     INITIAL_TOKEN_SUPPLY,
//   //     MIN_EOS_HELD,
//   //     MAX_EOS_HELD,
//   // }
  
//   var userParams = {
//   'ACCOUNT_NAME': '',
//   'TOKEN_NAME': '',
//   'MAX_TOKEN_SUPPLY': '',
//   'SNAPSHOT_MONTH': '',
//   'MIN_EOS_HELD': '',
//   'MAX_EOS_HELD': '',
//   'RATIO_OR_FLAT': '',
//   'AIRDROP_RATIO': '',
//   'AIRDROP_FLAT': '',
//   }

//   /* Actual Questions */
//   const answers = await askQuestions();
//   var {
//     ACCOUNT_NAME,
//     TOKEN_NAME,
//     MAX_TOKEN_SUPPLY,
//     SNAPSHOT_MONTH,
//     MIN_EOS_HELD,
//     MAX_EOS_HELD,
//     RATIO_OR_FLAT,
//     AIRDROP_RATIO,
//     AIRDROP_FLAT,
//   } = answers;
//   var INITIAL_TOKEN_SUPPLY = MAX_TOKEN_SUPPLY;
//   var PRECISION = 4;
//   ACCOUNT_NAME = ACCOUNT_NAME.toLowerCase();
//   TOKEN_NAME = TOKEN_NAME.toUpperCase();
    
//   console.log('\nStep 1)) User Selected Inputs:\n')
//   for (var key in answers) {
//     console.log(chalk.blue(key.toString()) + " --- " + chalk.red(answers[key].toString()))
//   } console.log('\n')

//   /* Price Estimator Portion */
//   const snapshotJson = await snapshotCsvToJson(SNAPSHOT_MONTH) // Csv to Json
//   const accountEstimate = await snapshotAccountEstimator(snapshotJson) // accountEstimator
//   const filteredSnapshotData = await snapshotFilter(snapshotJson, MIN_EOS_HELD, MAX_EOS_HELD); // Filtering Accounts by user params
//   const PRICE_ESTIMATE = await getPriceEstimate(filteredSnapshotData.length) // Price Estimate Calculations
//   successPrice(PRICE_ESTIMATE);
  
//   /* Airdrop Portion */
//   const NODE_URL = await nodeSelector(SNAPSHOT_MONTH) || 'http://mainnet.libertyblock.io:8888/';
//   var AIRDROP_PARAMS = {
//     'accountName': ACCOUNT_NAME,
//     'tokenName': TOKEN_NAME,
//     'maxTokenSupply': MAX_TOKEN_SUPPLY,
//     'precision': PRECISION,
//     'snapshotMonth': SNAPSHOT_MONTH,
//     'ratioOrFlat': RATIO_OR_FLAT,
//     'airdropRatio': AIRDROP_RATIO,
//     'airdropFlat': AIRDROP_FLAT,
//     'initialTokenSupply': INITIAL_TOKEN_SUPPLY,
//     'numberOfAccounts':filteredSnapshotData.length,
//     'nodeUrl': NODE_URL, // Jungle CryptoLions.io
//     // 'nodeUrl': "http://193.93.219.219:8888/", // Jungle CryptoLions.io
//     // 'nodeUrl': "http://eos-bp.bitfinex.com:8888/", // Bitfinex Testnet
//     'contractDir': "./eosio.token",
//   }
//   // console.log('AIRDROP_PARAMS', AIRDROP_PARAMS)
//   const formattedSnapshotData = await formatOutput(filteredSnapshotData, AIRDROP_PARAMS);
//   const isCsvGenerated = generateAirdropCsv(formattedSnapshotData);
//   const isShGenerated = generateAirdropSh(AIRDROP_PARAMS);
//   successFinal(isCsvGenerated, isShGenerated);
//   // console.log(AIRDROP_PARAMS);
//   // console.log('isCsvGenerated: ', isCsvGenerated, '\nisShGenerated: ', isShGenerated);

//   // await runShell()
// };