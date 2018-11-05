const axios = require('axios');
const router = require('express').Router();


// router.post('/get_price', cli.getPriceEstimate.post);

// router.get('/download_csv', cli.generateAirdropCsv.get);
// router.get('/download_sh', cli.generateAirdropSh.get);

router.post('/get_price', (req, res) => {
  var airdropParams = req.body.AIRDROP_PARAMS


  res.send(req.body));

module.exports = router;