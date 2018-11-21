# EOS-Wallet-Integrations
- EOS-Payment-Terminal
Simple, intuitive and secure embeddable widget for an universal crypto payment terminal built on the Byzantine API Gateway. This fee-less terminal lowers the barriers for small businesses in accepting EOS and other crypto currencies.
- Contract Estimator
Comprehensive EOS Contract Estimator to enable the cost estimation of C++ EOS smart contracts using the wasm and abi files to deploy, test the actions and assess their cost of RAM, CPU and NET.
- EOS-Airdrop-Utility
Utility tool to simplify the process of Airdrops for token launchers. Provides a CLI interface and a web-interface to wizardify a sequential set of Q&A to create token-contract, deploy, issue tokens and airdrops. This utility also estimates RAM and stake requirement based on the tokenomics for EOS vs Token ratios.

# Technical Synopsis
- Uses the Byzantine API Gateway, to abstract away on-chain integrations. Currently supports EOS and support for TRON, ADA, LISK, ETH, XLM and more DPOS ecosystems is in the works.
- Provides an abstraction from token contracts, validation of tokens with their respective contract hashes and ensures transaction integrity and security.
- The API gateway runs its own mainnet and also load balances across 21 block producers when the local mainnet blocks are delayed by >500ms.
- Security is enabled through a combination of nonce, private salt, api-security-key and a cipher used by both the client and server for capturing user signature. This prevents both the replay attack as well as a secure exchange of keys for on-chain calls.
- Cryptographic nonce eliminates transaction replay and sybil attacks.
- Prevents the following attacks which were in recent news:

- - [EosBetDice hacked using eosio.token transfer exploit](https://www.zdnet.com/article/blockchain-betting-app-mocks-competitor-for-getting-hacked-gets-hacked-four-days-later/)

- - [EosDex hacked with fake EOS tokens](https://thenextweb.com/hardfork/2018/09/18/eos-hackers-exchange-fake/)

# Build

```sh
git clone https://github.com/Byzantine-Works/EOS-Community.git
```

- EOS Payment Terminal
```sh
cd EOS-Payment-Terminal
```
To run it look at the Readme inside ./eos-payment-terminal.

- EOS Contract Estimator
```sh
cd contract-tco
```
To run it look at the Readme inside ./contract-tco.


# Design
- EOS Payment Terminal
The high-level design shown below provides an unified interface for all on-chain EOS operations. 
 - The key components are the API itself, which encapsulates the EOS-chain methods and nuances using eosjs and ecc. 
 - It uses a cryptographic nonce to secure customers from replay attacks. 

![Alt text](https://github.com/Byzantine-Works/EOS-API-Gateway/blob/master/images/byzapi.png?raw=true "Byzantine API Gateway")

 - Below is a screen shot of the EOS terminal User Interface
![Alt text](https://github.com/Byzantine-Works/EOS-API-Gateway/blob/master/images/eosstripe.png?raw=true "EOS Payment Terminal")

