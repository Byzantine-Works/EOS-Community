1.  start the server

`/usr/local/bin/nodeos -e -p eosio --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --contracts-console`

2.  Unlock with your public password

`cleos wallet unlock --password PW5J2SRUXzYuovSFzgojgs3LUNw6tLi5ur9WkppeauNZTW8VfBEAC`

3.  Compile C++ file (warnings are ok) : generates .wasm and .wast

`eosiocpp -o hello_world.wast hello_world.cpp`

4.  Generate .abi file (ignore warnings about ricardian_contracts)

`eosiocpp -g hello_world.abi hello_world.cpp`

5.  Create an account (Using your public Key)

`cleos create account eosio hello3.code EOS4zVWp9WMC7xoiJnsGUuJLrq4s1HQkUY5TTrFgFQBdMR9oN9y5u EOS4zVWp9WMC7xoiJnsGUuJLrq4s1HQkUY5TTrFgFQBdMR9oN9y5u`
Here: "eosio" is the account/creator, "hello3.code" is the name

should see:
`eosio <= eosio::newaccount {"creator":"eosio","name":"hello3.code","owner":{"threshold":1,"keys":[{"key":"EOS4zVWp9WMC7xoiJnsGU... warning: transaction executed locally, but may not be confirmed by the network yet`

6.  Upload the contract

`cleos set contract hello3.code ./hello_world -p hello3.code`

Note: The contract folder has to be the same name as the .cpp file!

Output:

> Reading WAST/WASM from ./hello_world/hello_world.wasm... Using already assembled WASM... Publishing contract...

> executed transaction: 35ba71a95dbc4b72af5c9f14c768492822d1f3b72055b0d4f317b2afab388e2b 1800 bytes 3539 us

> eosio <= eosio::setcode {"account":"hello3.code","vmtype":0,"vmversion":0,"code":"0061736d01000000013b0c60027f7e006000017e60...

> eosio <= eosio::setabi {"account":"hello3.code","abi":"0e656f73696f3a3a6162692f312e30000102686900010475736572046e616d650100...warning: transaction executed locally, but may not be confirmed by the network yet

7.  Run the contract.

`cleos push action hello3.code hi '["user"]' -p user`

Output:

> executed transaction: 1b467413de02f50070e19d516311e9a0b1dac392df2da478f6b8eac949678a2f 104 bytes 2012 us

> hello3.code <= hello3.code::hi {"user":"user"}

> Hello, user

> warning: transaction executed locally, but may not be confirmed by the network yet
