# EOS-Airdrop-Utility

- EOS-Airdrop-Utility (wallet++)
Utility tool to simplify the process of Airdrops for token launchers. Provides a CLI interface and a web-interface to wizardify a sequential set of Q&A to create token-contract, deploy, issue tokens and airdrops. This utility also estimates RAM and stake requirement based on the tokenomics for EOS vs Token ratios.

# Technical Synopsis
- Uses the Byzantine API Gateway, to abstract away on-chain integrations. Currently supports EOS and support for TRON, ADA, LISK, ETH, XLM and more DPOS ecosystems is in the works.


# Build
- EOS Aidrop Utility
```sh
//Codes
git clone https://github.com/Byzantine-Works/EOS-Stripe-Wallet
npm install
```

Switch into the airdrop directory
```
cd airdrop
```
Run the CLI Airdrop Price Calculator
```
node run.js
```


# Design
- EOS Airdrop Utility


### Todos
 - Add Synopsis, design aspects esp security, self-service api-key, the inner workings, etc for maintainability & supportability
