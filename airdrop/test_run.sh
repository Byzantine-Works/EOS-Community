echo "Creating token..."
CREATED=$(cleos -u http://193.93.219.219:8888/ get table junglefoxfox TESTONE stat | grep TESTONE)
if [[ -z $CREATED ]]; then
    echo "Creating..."
    cleos -u http://193.93.219.219:8888/ push action junglefoxfox create "[\"junglefoxfox\", \"100000000000.000 TESTONE\"]" -p junglefoxfox@active
else
    echo "Token with TESTONE symbol already exits - Skipping Create."
fi

ISSUANCE=$(cleos -u http://193.93.219.219:8888/ get table junglefoxfox junglefoxfox accounts | grep TESTONE)
if [[ -z $ISSUANCE ]]; then
    echo "Issuing..."
    cleos -u http://193.93.219.219:8888/ push action junglefoxfox issue "[\"junglefoxfox\", \"10000000000.000 TESTONE\", \"initial supply\"]" -p junglefoxfox@active
else
    echo "Token already issued. Skipping issue"
fi