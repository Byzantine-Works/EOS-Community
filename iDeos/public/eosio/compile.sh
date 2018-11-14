# This compiles a hard coded file
# /usr/local/bin/eosiocpp -o hello.wast hello.cpp
#if [ -x "$(command -v eosiocpp)"]; then
#  echo "eosiocpp found!" 2>&1
#  exit 1
#fi
#EOSIOCPP="/usr/local/bin/eosiocpp"
#echo ${EOSIOCPP}
# takes in a parameter...  so you would call it like so...  compile.sh hello
echo "==================> iDEOS...compiling cpp to .wast and .wasm"
# ${EOSIOCPP} -o $1.wast $1.cpp 
/usr/local/bin/eosiocpp -o $1.wast $1.cpp 
echo "==================> iDEOS...genearting.abi"
# ${EOSIOCPP} -g $1.abi $1.cpp 
/usr/local/bin/eosiocpp -g $1.abi $1.cpp 