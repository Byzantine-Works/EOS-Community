Eos = require('eosjs')

// Testing with server
const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 9001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './eosjs.html'));
});


const chain = {
  main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
  jungle: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // jungle testnet
  sys: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
};
// const httpEndpoint =  'https://eos.greymass.com/' // Mainnet Http Endpoint
const httpEndpoint =  'http://193.93.219.219:8888/' // Jungle Http Endpoint
const chainId = chain.jungle;
const keyProvider = '5KMg2WbZXpkrXcFTpxt6SbwYw9RQGawGsibfYYLy6ydMZZqKFkq'


// Default configuration
defaultConfig = {
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
  keyProvider: ['5KMg2WbZXpkrXcFTpxt6SbwYw9RQGawGsibfYYLy6ydMZZqKFkq'], // WIF string or array of keys..
  httpEndpoint: 'http://54.183.9.138:8888/',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}
 
const mainnetConfig = {
  keyProvider: '5KMg2WbZXpkrXcFTpxt6SbwYw9RQGawGsibfYYLy6ydMZZqKFkq', // Dummy Jungle Key
  httpsEndpoint: 'http://eos.greymass.com/',
  // httpEndpoint: 'http://ayeaye.cypherglass.com:8888/v1/chain/get_info',
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
};
const jungleConfig = {
  keyProvider: '5KMg2WbZXpkrXcFTpxt6SbwYw9RQGawGsibfYYLy6ydMZZqKFkq', // Dummy Jungle Key
  httpEndpoint: 'http://193.93.219.219:8888/',
  chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
};




// Connect to a testnet or mainnet
// eos = Eos({httpEndpoint, chainId, keyProvider})
// eos = Eos(jungleConfig);
// eos = Eos(mainnetConfig);
eos = Eos(jungleConfig);

// Victors Config
// const eos = Eos({
//   keyProvider: '5KjDGssHn6aYBs32NwWiGvh2Aa7FbRpu7RGXv9ToNgj8FyS1vyw',// private key
//   httpEndpoint: 'http://54.183.9.138:8888/',
//   chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
// })
 
// console.log(eos)
// console.log(eos.getInfo((error, result) => { console.log(error, result) }))
// console.log(eos.getInfo({}))

options = {
  authorization: 'junglefoxfox@active',
  broadcast: true,
  sign: true
}

const run = async function () {
  // var info = await eos.getInfo({}) 
  // eos.getBlock(1)
  // var info = await eos.getBlock({block_num_or_id: 1})
  // console.log('info', info)
  // await eos.getInfo({})
  eos.transfer('junglefoxfox', 'junglefoxtwo', '1.0000 TEST', '', options)

}
run()

