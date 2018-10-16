Eos = require('eosjs')
 
const chain = {
  'main': 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
  'jungle': '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // jungle testnet
  'sys': 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
};
// const httpEndpoint =  'https://eos.greymass.com/' // Mainnet Http Endpoint
const httpEndpoint =  'http://193.93.219.219:8888/' // Jungle Http Endpoint
const chainId = chain.jungle;
const keyProvider = '5KMg2WbZXpkrXcFTpxt6SbwYw9RQGawGsibfYYLy6ydMZZqKFkq'


// Default configuration
// config = {
//   chainId: null, // 32 byte (64 char) hex string
//   keyProvider: ['PrivateKeys...'], // WIF string or array of keys..
//   httpEndpoint: 'http://127.0.0.1:8888',
//   expireInSeconds: 60,
//   broadcast: true,
//   verbose: false, // API activity
//   sign: true
// }
 
const mainnetConfig = {
  keyProvider: '5KMg2WbZXpkrXcFTpxt6SbwYw9RQGawGsibfYYLy6ydMZZqKFkq', // Dummy Jungle Key
  httpEndpoint: 'http://eos.greymass.com/',
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
eos = Eos(jungleConfig);
// eos = Eos(mainnetConfig);

 
// console.log(eos)
// console.log(eos.getInfo((error, result) => { console.log(error, result) }))
// console.log(eos.getInfo({}))
const run = async function () {
  // var info = await eos.getInfo({}) 

}
run()


