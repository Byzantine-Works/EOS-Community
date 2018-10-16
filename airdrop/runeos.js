Eos = require('eosjs')
 
// Private key or keys (array) provided statically or by way of a function.
// For multiple keys, the get_required_keys API is used (more on that below).
keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
 
// Localhost Testnet (run ./docker/up.sh)
eos = Eos({keyProvider})
 
// Connect to a testnet or mainnet
eos = Eos({httpEndpoint, chainId, keyProvider})
 
// Cold-storage
eos = Eos({httpEndpoint: null, chainId, keyProvider})
 
// Add support for non-EOS public key prefixes, such as PUB, etc
eos = Eos({keyPrefix: 'PUB'})
 
// Read-only instance when 'eosjs' is already a dependency
eos = Eos.modules.api({/*config*/})
 
// Read-only instance when an application never needs to write (smaller library)
EosApi = require('eosjs-api')
eos = EosApi({/*config*/})