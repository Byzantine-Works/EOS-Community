#!/bin/bash

ISSUER_ACCOUNT="junglefoxfox"
TOKEN_SYMBOL="AIRTHREE"
MAX_TOKEN_SUPPLY="9100200300.000"
INITIAL_TOKEN_SUPPLY="1000000.000"
AIRDROP_RATIO="5"
SNAPSHOT_FILE="airdrop.csv"

echo "Creating token..."
CREATED=$(cleos -u http://193.93.219.219:8888/ get table $ISSUER_ACCOUNT $TOKEN_SYMBOL stat | grep $TOKEN_SYMBOL)
if [[ -z $CREATED ]]; then
    echo "Creating token: \"$TOKEN_SYMBOL\", with a max supply of: \"$MAX_TOKEN_SUPPLY\", under account: \"$ISSUER_ACCOUNT\"..."
    cleos -u http://193.93.219.219:8888/ push action $ISSUER_ACCOUNT create "[\"$ISSUER_ACCOUNT\", \"$MAX_TOKEN_SUPPLY $TOKEN_SYMBOL\"]" -p $ISSUER_ACCOUNT@active
else
    echo "Token \"$TOKEN_SYMBOL\" already exist -- Skipping Create."
fi

ISSUANCE=$(cleos -u http://193.93.219.219:8888/ get table $ISSUER_ACCOUNT $ISSUER_ACCOUNT accounts | grep $TOKEN_SYMBOL)
if [[ -z $ISSUANCE ]]; then
    echo "Issuing initial supply of: \"$INITIAL_TOKEN_SUPPLY $TOKEN_SYMBOL\" to account \"$ISSUER_ACCOUNT\"..."
    cleos -u http://193.93.219.219:8888/ push action $ISSUER_ACCOUNT issue "[\"$ISSUER_ACCOUNT\", \"$INITIAL_TOKEN_SUPPLY $TOKEN_SYMBOL\", \"initial supply\"]" -p $ISSUER_ACCOUNT@active
else
    echo "Token already issued to \"$ISSUER_ACCOUNT\" -- Skipping issue"
fi

for line in $(cat $SNAPSHOT_FILE); do
    ACCOUNT=$(echo $line | tr "," "\n" | head -1)
    AMOUNT=$(echo $line | tr "," "\n" | tail -1)
    CURRENT_BALANCE=$(cleos -u http://193.93.219.219:8888/ get table $ISSUER_ACCOUNT $ACCOUNT accounts | grep $TOKEN_SYMBOL) 
    if [[ -z $CURRENT_BALANCE ]]; then
        echo "Airdropping $AMOUNT $TOKEN_SYMBOL to $ACCOUNT"
        cleos -u http://193.93.219.219:8888/ push action $ISSUER_ACCOUNT transfer "[\"$ISSUER_ACCOUNT\", \"$ACCOUNT\", \"$AMOUNT $TOKEN_SYMBOL\", \"airdrop\"]" -p $ISSUER_ACCOUNT@active
    else
        echo "Skipping $ACCOUNT"
    fi 
done