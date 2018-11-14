
# Unlock wallet
/usr/local/bin/cleos wallet unlock --password PW5J2SRUXzYuovSFzgojgs3LUNw6tLi5ur9WkppeauNZTW8VfBEAC


# Compile .wasm then generate .abi



#  Create an account (Using your public Key)
# $1: account to create
/usr/local/bin/cleos create account eosio $1 EOS4zVWp9WMC7xoiJnsGUuJLrq4s1HQkUY5TTrFgFQBdMR9oN9y5u EOS4zVWp9WMC7xoiJnsGUuJLrq4s1HQkUY5TTrFgFQBdMR9oN9y5u


#  Upload the contract
# $1 : name of account
# #2 : contract directory.  Needs to be the same name as the .cpp file
/usr/local/bin/cleos set contract $1 $2 -p $1


#  Run the contract.
/usr/local/bin/cleos push action $1 hi '["user"]' -p user
