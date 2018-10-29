# EOS-Full-Wallet
- EOS-Full-Wallet (fat wallet)
Comprehensive EOS full wallet to enable all EOS related on-chain functionality such as account creation, voting, delegating, undelegating, buy/sell RAM, transfer and staking.

# Technical Synopsis
- Uses the Byzantine API Gateway, to abstract away on-chain integrations. Currently supports EOS and support for TRON, ADA, LISK, ETH, XLM and more DPOS ecosystems is in the works.
- Provides an abstraction from token contracts, validation of tokens with their respective contract hashes and ensures transaction integrity and security.
- The API gateway runs its own mainnet and also load balances across 21 block producers when the local mainnet blocks are delayed by >500ms.
- Security is enabled through a combination of nonce, private salt, api-security-key and a cipher used by both the client and server for capturing user signature. This prevents both the replay attack as well as a secure exchange of keys for on-chain calls.
- Cryptographic nonce eliminates transaction replay and sybil attacks.
- Prevents the following attacks which were in recent news:

- - [EosBetDice hacked using eosio.token transfer exploit](https://www.zdnet.com/article/blockchain-betting-app-mocks-competitor-for-getting-hacked-gets-hacked-four-days-later/)

- - [EosDex hacked with fake EOS tokens](https://thenextweb.com/hardfork/2018/09/18/eos-hackers-exchange-fake/)

# Install
if Unix:
```sh
npm install -g npm-check-updates
```
if Mac OS:
sudo npm install -g npm

# Build
```sh
npm run build
```

# Run
```sh
npm start
```

# Demo
Find the wasm and abi files of a smart contract in ./full-wallet/src/contract to test the tool.


# Design
- EOS Full Wallet


### Todos
 - Add Synopsis, design aspects esp security, self-service api-key, the inner workings, etc for maintainability & supportability
