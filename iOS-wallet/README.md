# EOS-iOS-Wallet
- EOS-iOS-Wallet
Comprehensive EOS wallet for iOS that enables EOS related on-chain functionality such as account creation, voting, delegating, undelegating, buy/sell RAM, transfer and staking.

# Technical Synopsis
- Uses the Byzantine API Gateway, to abstract away on-chain integrations. Currently supports EOS and support for TRON, ADA, LISK, ETH, XLM and more DPOS ecosystems is in the works.
- Provides an abstraction from token contracts, validation of tokens with their respective contract hashes and ensures transaction integrity and security.
- The API gateway runs its own mainnet and also load balances across 21 block producers when the local mainnet blocks are delayed by >500ms.
- Security is enabled through a combination of nonce, private salt, api-security-key and a cipher used by both the client and server for capturing user signature. This prevents both the replay attack as well as a secure exchange of keys for on-chain calls.
- Cryptographic nonce eliminates transaction replay and sybil attacks.


# Build
- EOS-iOS-Wallet


# Design
- EOS-iOS-Wallet


### Todos
 - Add Synopsis, design aspects esp security, self-service api-key, the inner workings, etc for maintainability & supportability
