
  #!/bin/bash

  ISSUER_ACCOUNT="junglefoxfox"
  TOKEN_SYMBOL="AIRFOUR"
  AIRDROP_RATIO="5"
  MAX_TOKEN_SUPPLY="1000000.0000"
  INITIAL_TOKEN_SUPPLY="1000000.0000"
  SNAPSHOT_FILE="airdrop.csv"
  NODE_URL="http://193.93.219.219:8888/"
  

  echo "Deploying token contract.."
    cleos -u $NODE_URL set contract $ISSUER_ACCOUNT ./eosio.token
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
  
  for line in $(cat $SNAPSHOT_FILE); do
      ACCOUNT=$(echo $line | tr "," "\n" | head -1)
      AMOUNT=$(echo $line | tr "," "\n" | tail -1)
      CURRENT_BALANCE=$(cleos -u $NODE_URL get table $ISSUER_ACCOUNT $ACCOUNT accounts | grep $TOKEN_SYMBOL) 
      if [[ -z $CURRENT_BALANCE ]]; then
          echo "Airdropping $AMOUNT $TOKEN_SYMBOL to $ACCOUNT"
          echo cleos -u $NODE_URL push action $ISSUER_ACCOUNT transfer "[\"$ISSUER_ACCOUNT\", \"$ACCOUNT\", \"$AMOUNT $TOKEN_SYMBOL\", \"airdrop\"]" -p $ISSUER_ACCOUNT@active
          cleos -u $NODE_URL push action $ISSUER_ACCOUNT transfer "[\"$ISSUER_ACCOUNT\", \"$ACCOUNT\", \"$AMOUNT $TOKEN_SYMBOL\", \"airdrop\"]" -p $ISSUER_ACCOUNT@active
      else
          echo "Skipping $ACCOUNT"
      fi 
  done
  
  
  
  