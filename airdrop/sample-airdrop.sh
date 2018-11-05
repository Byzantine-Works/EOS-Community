
  #!/bin/bash

  ISSUER_ACCOUNT="youraccount1"
  TOKEN_SYMBOL="XCOIN"
  AIRDROP_RATIO="5"
  AIRDROP_FLAT="0"
  MAX_TOKEN_SUPPLY="1000000000.0000"
  INITIAL_TOKEN_SUPPLY="1000000000.0000"
  PRECISION="4"
  NUMBER_OF_ACCOUNTS="86305"
  NODE_URL="http://mainnet.libertyblock.io:8888/"
  CONTRACT_DIR="./eosio.token"
  SNAPSHOT_FILE="airdrop.csv"
  

  echo "Deploying token contract.."
    cleos -u $NODE_URL set contract $ISSUER_ACCOUNT $CONTRACT_DIR
    cleos -u $NODE_URL get code $ISSUER_ACCOUNT

  echo "Creating token..."
  CREATED=$(cleos -u $NODE_URL get table $ISSUER_ACCOUNT $TOKEN_SYMBOL stat | grep $TOKEN_SYMBOL)
  if [[ -z $CREATED ]]; then
      echo "Creating token: \"$TOKEN_SYMBOL\", with a max supply of: \"$MAX_TOKEN_SUPPLY\", under account: \"$ISSUER_ACCOUNT\"..."
      echo cleos -u $NODE_URL push action $ISSUER_ACCOUNT create "[\"$ISSUER_ACCOUNT\", \"$MAX_TOKEN_SUPPLY $TOKEN_SYMBOL\"]" -p $ISSUER_ACCOUNT@active
      cleos -u $NODE_URL push action $ISSUER_ACCOUNT create "[\"$ISSUER_ACCOUNT\", \"$MAX_TOKEN_SUPPLY $TOKEN_SYMBOL\"]" -p $ISSUER_ACCOUNT@active
  else
      echo "Token \"$TOKEN_SYMBOL\" already exist -- Skipping Create."
  fi
  
  ISSUANCE=$(cleos -u $NODE_URL get table $ISSUER_ACCOUNT $ISSUER_ACCOUNT accounts | grep $TOKEN_SYMBOL)
  if [[ -z $ISSUANCE ]]; then
      echo "Issuing initial supply of: \"$INITIAL_TOKEN_SUPPLY $TOKEN_SYMBOL\" to account \"$ISSUER_ACCOUNT\"..."
      echo cleos -u $NODE_URL push action $ISSUER_ACCOUNT issue "[\"$ISSUER_ACCOUNT\", \"$INITIAL_TOKEN_SUPPLY $TOKEN_SYMBOL\", \"initial supply\"]" -p $ISSUER_ACCOUNT@active
      cleos -u $NODE_URL push action $ISSUER_ACCOUNT issue "[\"$ISSUER_ACCOUNT\", \"$INITIAL_TOKEN_SUPPLY $TOKEN_SYMBOL\", \"initial supply\"]" -p $ISSUER_ACCOUNT@active
  else
      echo "Token already issued to \"$ISSUER_ACCOUNT\" -- Skipping issue"
  fi
  
  count=0
  for line in $(cat $SNAPSHOT_FILE); do
      ((count++))
      ACCOUNT=$(echo $line | tr "," "\n" | head -1)
      AMOUNT=$(echo $line | tr "," "\n" | tail -1)
      CURRENT_BALANCE=$(cleos -u $NODE_URL get table $ISSUER_ACCOUNT $ACCOUNT accounts | grep $TOKEN_SYMBOL) 
      if [[ -z $CURRENT_BALANCE ]]; then
          echo "$count/$NUMBER_OF_ACCOUNTS Airdropping $AMOUNT $TOKEN_SYMBOL to $ACCOUNT"
          echo cleos -u $NODE_URL push action $ISSUER_ACCOUNT transfer "[\"$ISSUER_ACCOUNT\", \"$ACCOUNT\", \"$AMOUNT $TOKEN_SYMBOL\", \"airdrop\"]" -p $ISSUER_ACCOUNT@active
          cleos -u $NODE_URL push action $ISSUER_ACCOUNT transfer "[\"$ISSUER_ACCOUNT\", \"$ACCOUNT\", \"$AMOUNT $TOKEN_SYMBOL\", \"airdrop\"]" -p $ISSUER_ACCOUNT@active
      else
          echo "$count Skipping $ACCOUNT"
      fi 
  done

  echo "Airdrop Complete"
  
  