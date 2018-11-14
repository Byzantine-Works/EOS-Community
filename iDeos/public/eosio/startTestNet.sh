# Starts the EOS local Test Net
# You'll need to have the command line EOS tools installed
# This writes to an output file in the users home directory
# to view the contents live...
#  tail -f nodeos.out
#
/usr/local/bin/nodeos -e -p eosio --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --contracts-console &> ~/nodeos.out
