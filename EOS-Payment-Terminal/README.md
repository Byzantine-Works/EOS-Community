# EOS-Payment-Terminal
- EOS-Payment-Terminal
Simple, intuitive and secure embeddable widget for an universal crypto terminal built on the Byzantine API Gateway. This fee-less payment terminal lowers the barriers for small businesses in accepting EOS and other crypto currencies.

#Synopsis
- Uses the Byzantine API Gateway, to abstract away on-chain integrations. Currently supports EOS and support for TRON, ADA, LISK, ETH, XLM and more DPOS ecosystems is in the works.
- Provides an abstraction from token contracts, validation of tokens with their respective contract hashes and ensures transaction integrity and security.
- The API gateway runs its own mainnet and also load balances across 21 block producers when the local mainnet blocks are delayed by >500ms.
- Security is enabled through a combination of nonce, private salt, api-security-key and a cipher used by both the client and server for capturing user signature. This prevents both the replay attack as well as a secure exchange of keys for on-chain calls.
- Cryptographic nonce eliminates transaction replay and sybil attacks.
- Prevents the following attacks which were in recent news:
- - [EosBetDice hacked using eosio.token transfer exploit](https://www.zdnet.com/article/blockchain-betting-app-mocks-competitor-for-getting-hacked-gets-hacked-four-days-later/)

- - [EosDex hacked with fake EOS tokens](https://thenextweb.com/hardfork/2018/09/18/eos-hackers-exchange-fake/)

#Install and run dev mode
```sh
git clone https://github.com/Byzantine-Works/EOS-Community.git
cd EOS-Payment-Terminal
npm install
npm start
```

# Build
- EOS-Payment-Terminal
```sh
//Codes
git clone https://github.com/Byzantine-Works/EOS-Stripe-Wallet
npm install
npm run build
```

# Embed

```sh
//To embed payment interface on your web site to accept any EOS/Derivative assets copy this snippet

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<div id="wallet" style="transform: translateY(150px); margin: 0 auto; width:700px"></div>
<script type="text/javascript" src="https://api.byzanti.ne/main.js"></script>

```