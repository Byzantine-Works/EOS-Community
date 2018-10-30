# EOS-Airdrop-Utility

- EOS-Airdrop-Utility (wallet++)
Utility tool to simplify the process of Airdrops for token launchers. Provides a CLI interface and a web-interface to wizardify a sequential set of Q&A to create token-contract, deploy, issue tokens and airdrops. This utility also estimates RAM and stake requirement based on the tokenomics for EOS vs Token ratios.

# Technical Synopsis
- Uses the Byzantine API Gateway, to abstract away on-chain integrations. Currently supports EOS and support for TRON, ADA, LISK, ETH, XLM and more DPOS ecosystems is in the works.


# Build
- EOS Aidrop Utility. Download the EOS Wallet
```sh
//Codes
git clone https://github.com/Byzantine-Works/EOS-Wallet-Integrations.git
npm install
```

- Switch into the airdrop directory, install the airdrop utility specific dependencies
```
cd airdrop
npm install
```
- Run the CLI Airdrop Price Calculator
```
node run.js
```

Airdrop Generator will tell you the estiamted resource cost to run the airdrop. Once your account is ready with sufficient RAM bought and CPU/Net Staked, go into a cleos enabled terminal and run the airdrop script 
```
./airdrop.sh
```

# Unit Testing
- Unit Tests for each subfunction of the airdrop price estimator + script generator. 
```
npm test
```

# Design
- EOS Airdrop Utility


### Todos
 - Add Synopsis, design aspects esp security, self-service api-key, the inner workings, etc for maintainability & supportability
