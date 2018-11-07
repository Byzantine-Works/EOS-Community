# Welcome to the EOS-Airdrop-Tool
![full_airdrop.PNG](https://github.com/Byzantine-Works/EOS-Wallet-Integrations/blob/master/airdrop/screenshots/full_airdrop.PNG?raw=true)



- EOS-Airdrop-Utility (wallet++)
Utility tool to simplify the process of Airdrops for token launchers. Provides a CLI interface and a web-interface to wizardify a sequential set of Q&A to create token-contract, deploy, issue tokens and airdrops. This utility also estimates RAM and stake requirement based on the tokenomics for EOS vs Token ratios.

# Technical Synopsis
- Uses the Byzantine API Gateway, to abstract away on-chain integrations. Currently supports EOS and support for TRON, ADA, LISK, ETH, XLM and more DPOS ecosystems is in the works.


# Build
- EOS Aidrop Utility. Download the EOS Wallet
```sh
// Requires nodejs and git
//   To install git see https://git-scm.com/downloads
//   To install nodejs see https://nodejs.org/en/download/

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

# Usage Instructions 
- Run through the series of questions to input your airdrop parameters
- You will be given the option to choose which Snapshot you want to use, along with options to filter between EOS Accounts holding different token amounts
- You may airdrop X Ratio of your tokens to users based on their EOS Holdings, or you may airdrop a flat amount to all users.
- A full demo of the questionnaire and price estimate process is shown below: 

![ratio_or_flat.PNG](https://github.com/Byzantine-Works/EOS-Wallet-Integrations/blob/master/airdrop/screenshots/ratio_or_flat.PNG?raw=true)


- Airdrop Generator will tell you the estimated resource cost to run the airdrop. 

![price_estimate.PNG](https://github.com/Byzantine-Works/EOS-Wallet-Integrations/blob/master/airdrop/screenshots/price_estimate.PNG?raw=true)


Once your account is ready with sufficient RAM bought and CPU/Net Staked, go into a cleos enabled terminal and run the airdrop script 

```
./airdrop.sh
```

The shell script in airdrop.sh will automatically do the following:
- Deploy the token contract
- Create and Issue the token to the creator account
- Airdrop the appropriate amount of tokens to each user

![run_shellscript0.PNG](https://github.com/Byzantine-Works/EOS-Wallet-Integrations/blob/master/airdrop/screenshots/run_shellscript0.PNG?raw=true)

# Unit Testing
- Unit Tests for each subfunction of the airdrop price estimator + script generator. 
```
npm test
```

![unit_tests.PNG](https://github.com/Byzantine-Works/EOS-Wallet-Integrations/blob/master/airdrop/screenshots/unit_tests.PNG?raw=true)

### Todos
 Possible future features include:
 - Ability to search for users who interact with a specific dApp or smart contract
 - UI Or Backend for those who aren't familiar with command line / Cleos