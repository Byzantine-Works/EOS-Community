const axios = require('axios');
const router = require('express').Router();
const cli = require('../../cli.js');


// router.post('/get_price_estimate', cli.getPriceEstimate.post);
// router.get('/download_csv', cli.generateAirdropCsv.get);
// router.get('/download_sh', cli.generateAirdropSh.get);

router.post('/get_price', (req, res) => {
  var airdropParams = req.body.AIRDROP_PARAMS


  // res.send(req.body);
  console.log('Server: GET request to /get_price received');
  res.send('Client: GET request to /get_price received');
})

router.get('/download', (req, res) => {
  var airdropParams = req.body.AIRDROP_PARAMS

  const isCsvGenerated = cli.generateAirdropCsv(formattedSnapshotData);
  const isShGenerated = cli.generateAirdropSh(AIRDROP_PARAMS);

})

/* CLI Exports available */
// module.exports = {init, askQuestions, snapshotCsvToJson, snapshotFilter, getRamPrice, getPriceEstimate, successPrice, nodeChecker, nodeSelector, formatOutput, generateAirdropCsv, generateAirdropSh, successFinal, runShell, run}
module.exports = router;