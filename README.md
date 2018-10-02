# EOS-Stripe-Wallet
Simple, intuitive, secure and "stripe" like embeddable widget for an universal crypto wallet built on the Byzantine API Gateway.  This fee-less wallet lowers the barriers for small businesses in accepting EOS and other crypto currencies.

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
- EOS Stripe Wallet

```sh
//Codes
git clone https://github.com/Byzantine-Works/EOS-Stripe-Wallet
npm install

//Embeddable widget
curl -o https://github.com/Byzantine-Works/EOS-Stripe-Wallet/walletembed.js?
```



# Design

The high-level design shown below provides an unified interface for all on-chain EOS operations. 
 - The key components are the API itself, which encapsulates the EOS-chain methods and nuances using eosjs and ecc. 
 - It uses a cryptographic nonce to secure customers from replay attacks. 

![Alt text](https://github.com/Byzantine-Works/EOS-API-Gateway/blob/master/images/byzapi.png?raw=true "Byzantine API Gateway")

 - Below is a screen shot of the EOS 'Stripe' User Interface
![Alt text](https://github.com/Byzantine-Works/EOS-API-Gateway/blob/master/images/eosstripe.png?raw=true "EOS Stripe Wallet")


### Todos
 - Add Synopsis, design aspects esp security, self-service api-key, the inner workings, etc for maintainability & supportability
