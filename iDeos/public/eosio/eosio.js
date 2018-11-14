const os = require('os');
const { Platform } = require('../constants');
const { execFile, exec } = require('child_process'); // for calling command line stuff
const util = require('util');
const menuHelpers = require('./../utils/menuhelpers');
const isDev = require('electron-is-dev');
const fs = require('fs');

// persist wallet names and pw to this file
// TODO: set to a relative path, should be in users home folder
// const walletsFile = `/home/stefan/.eosWallets/wallets.json`;

const walletsFile = os.platform() == Platform.macOS ? `${os.homedir()}/eosio-wallet/wallets.json` : `${os.homedir()}/.eosWallets/wallets.json`;
const eosWalletStore = os.platform() == Platform.macOS ? `${os.homedir()}/eosio-wallet/` : `${os.homedir()}/.eosWallets/`;


// }
//  if (os.platform() == Platform.linux){
//   const walletsFile = `${os.homedir()}/.eosWallets/wallets.json`;
//   const eosWalletStore = `${os.homedir()}/.eosWallets/`;
// }
// TODO: set to a relative path, should be in users home folder


// TODO: set to a relative path
// const walletsFile = '/Users/victor.faucon/eosio-wallet/wallets.json';
// const eosWalletStore = '/Users/victor.faucon/eosio-wallet/';

// allowed charactrers for a valid eos account name. Must not contain zeros. Periods are also allowed but we aleready use them in the name generator
const VAL_ACCT_NAME = '12345abcdefghijklmnopqrstuvwxyz';

if (isDev) {
  // TODO: Do something in here or delete.
}

const eosio = {};

/**
 *  Starts the local EOS Test Net
 *  STEP #1
 */
eosio.startTestNet = () => {
  // if (os.platform() == Platform.macOS || os.platform() == Platform.linux) {
  const execFileP = util.promisify(execFile);
  const startTestNet = execFile(`${__dirname}/startTestNet.sh`);

  startTestNet.stdout.on('data', (data) => {
    // TODO: Do something…
  });

  startTestNet.stderr.on('data', (data) => {
    // TODO: Do something…
  });

  startTestNet.on('close', (code) => {
    // TODO: Do something…
  });
  // }
};

/**
 *  Starts the local EOS Test Net in new terminal window
 *
 */
eosio.startTestNetNewTerminal = () => {
  if (os.platform() == Platform.macOS || os.platform() == Platform.linux) {
    menuHelpers.sendConsoleOutput(`======= startTestNet =====>, ${os.platform()}`);
    // const execFileP = util.promisify(execFile);

    const startTestNet = exec('nodeos -e -p eosio --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --contracts-console; bash;');
    menuHelpers.sendConsoleOutput('nodeos passed');

    startTestNet.stdout.on('data', (data) => {
      menuHelpers.sendConsoleOutput(`stdout: ${data}`);
    });

    startTestNet.stderr.on('data', (data) => {
      // console.log(`stderr: ${data}`);
      menuHelpers.sendConsoleOutput(data);
    });

    startTestNet.on('close', (code) => {
      menuHelpers.sendConsoleOutput(`child process exited with code ${code}`);
    });
  }
};

/**
 *  Kills the local EOS Test Net
 *  For demo purposes
 */
eosio.killTestNet = () => {
  if (os.platform() == Platform.macOS || os.platform() == Platform.linux) {
    menuHelpers.sendConsoleOutput();
    const startTestNet = exec(`kill $(ps -e | grep nodeos | awk '{print $1}')`);

    startTestNet.stdout.on('data', (data) => {
      menuHelpers.sendConsoleOutput(`stdout: ${data}`);
    });

    startTestNet.stderr.on('data', (data) => {
      menuHelpers.sendConsoleOutput(`stderr: ${data}`);
    });

    startTestNet.on('close', (code) => {
      menuHelpers.sendConsoleOutput(`child process exited with code ${code}`);
    });
  }
};

/**
 *  STEP #2
 * 
 *  @param {string} walletName
 *  name of 'aciveWallet' in the App
 *  
 *  Unlock wallet that is current 'activeWallet' in the App.
 */
eosio.unlockWallet = (walletName = 'default') => {
  if (os.platform() == Platform.macOS || os.platform() == Platform.linux) {
    menuHelpers.sendConsoleOutput(`====== unlockWallet ${walletName} ======>' ${os.platform()}`);

    // read named wallet's password from wallets.json file (default location: /home/<user>/.eosWallets/wallets.json)
    const pw = eosio.getWalletPW(walletName);

    const unlockWallet = exec(`/usr/local/bin/cleos wallet unlock -n ${walletName} --password ${pw}`);

    unlockWallet.stdout.on('data', (data) => {
      menuHelpers.sendConsoleOutput(`stdout: ${data}`);

      eosio.getWalletStatus(walletName);
    });

    unlockWallet.stderr.on('data', (data) => {
      menuHelpers.sendConsoleOutput(`stderr: ${data}`);
    });

    unlockWallet.on('close', (code) => {
      menuHelpers.sendConsoleOutput(`child process exited with code ${code}`);
    });
  }
};

/**
 *  STEP #3
 *
 * @param {String} fullFilePath
 * Should be the full path name to the file...
 */
eosio.compileCompleteContract = (fullFilePath) => {
  if (os.platform() == Platform.macOS || os.platform() == Platform.linux) {

    if (typeof fullFilePath === 'string') {
      fullFilePath = fullFilePath.replace('.cpp', '');
    } else if (Array.isArray(fullFilePath)) {
      fullFilePath = fullFilePath[0].replace('.cpp', '');
    }

    const fpArr = fullFilePath.split('/');
    const fileName = fpArr[fpArr.length - 1];

    menuHelpers.sendConsoleOutput(`====== compile ${fileName} =======> ${os.platform()}`);

    // get string from incoming fullFilePath array and remove .cpp extension
    // TODO: regex search for .cpp anchored to end of string
    // fullFilePath = fullFilePath.replace('.cpp', '');


    const execP = util.promisify(exec);

    execP(`/usr/local/bin/eosiocpp -o ${fullFilePath}.wast ${fullFilePath}.cpp`)
      .then((data) => {
        menuHelpers.sendConsoleOutput(data);
        return execP(`/usr/local/bin/eosiocpp -g  ${fullFilePath}.abi  ${fullFilePath}.cpp `);
      })
      .then((data) => {
        menuHelpers.sendConsoleOutput(data);
      })
      .catch((error, stdout, stderr) => {
        menuHelpers.sendConsoleOutput(error);
        if (stdout !== undefined) menuHelpers.sendConsoleOutput(stdout);
        if (stdout !== undefined) menuHelpers.sendConsoleOutput(stderr);
      });
  }
};

/**
 *
 * STEP #4
 *
 * @param {String} accountName
 * Account name for contract.  Ex: hello123
 *
 * @param {String} fullContractFolderPath
 * @param {String} walletName
 * Full file path to contract folder
 *
 */
eosio.createAccountAndUploadContract = (fullContractFolderPath, walletName = 'default', password, accountName) => {
  if (os.platform() == Platform.macOS || os.platform() == Platform.linux) {
    console.log("file path in createAccountAndUploadContract: ", fullContractFolderPath)

    if (Array.isArray(fullContractFolderPath)) {
      fullContractFolderPath = fullContractFolderPath[0];
    }

    const fpArr = fullContractFolderPath.split('/');
    const pathName = fpArr[fpArr.length - 1];

    menuHelpers.sendConsoleOutput(`====== deploy ${pathName} ${walletName} ======> ${os.platform()}`);

    // const asyncUnlock = new Promise(function (resolve, reject) {
    //   if (!eosio.getWalletStatus()) {
    //     console.log('new promise thing and wallet is locked');
    //     return execP('/usr/local/bin/cleos wallet unlock --password PW5KTJzSGjp8Wgc1Rt225qgNAEo1CZub9E6tMwCuhmKBfmVEubeUj');
    //   }
    // });

    // set valid account name
    if (!accountName) {
      // get last dir from full path see https://stackoverflow.com/questions/16695369/how-to-get-last-folder-name-from-folder-path-in-javascript
      accountName = `${fullContractFolderPath[0].match(/([^\/]*)\/*$/)[1].slice(0, 5)}.`;

      // generate account name with begining (5) of target path and randomly selected valid chars
      while (accountName.length < 12) {
        accountName += VAL_ACCT_NAME.charAt(Math.floor(Math.random() * VAL_ACCT_NAME.length));
      }
    }
    // console.log('accountName: ', accountName, 'length: ', accountName.length);

    const execP = util.promisify(exec);

    // check if active wallet is locked, if true ulock active wallet
    // if (eosio.getWalletStatus(walletName)) {
    //   console.log(`${walletName} is locked`);
    //   eosio.unlockWallet(walletName);
    // }

    // let unlockWalletP = new Promise((resolve, reject) => {
    //   console.log('in unlockWalletP');
    //   return eosio.unlockWallet(walletName);
    // });

    let getWalletPwP = (walletName, cb) => {
      return new Promise((resolve, reject) => {
        eosio.getWalletPW(walletName, cb);
      });
    }

    // new Promise((resolve, reject) => {
    //   console.log('is this gonna work?');
    //   return eosio.unlockWallet(walletName);
    // })

    execP(`/usr/local/bin/cleos wallet lock -n ${walletName}`)
      .then(data => {
        console.log('data in eosio: ', data)
        return execP(`/usr/local/bin/cleos wallet unlock -n ${walletName} --password ${password}`)
      })
      .then(data => {
        console.log('after wallet unlock ', data);
        //TODO get keys from cleos wallet keys
        // cleos wallet keys lists keys from all unlocked wallets
        return execP(`/usr/local/bin/cleos wallet keys`);
      })
      .then(data => {
        let key = JSON.parse(data)[0];
        console.log(`creating account ${accountName} with public key: ${key}`);
        menuHelpers.sendConsoleOutput(`creating account ${accountName} with public key: ${key}`);
        return execP(`/usr/local/bin/cleos create account eosio ${accountName} ${key} ${key}`)
      })
      .then(data => {
        // menuHelpers.sendConsoleOutput(data);
        console.log('after create account', data);
        if (fullContractFolderPath.includes('.cpp')) {
          let pathArr = fullContractFolderPath.split('/');
          fullContractFolderPath = pathArr.slice(0, pathArr.length - 1).join('/')
        }
        console.log('set contract on', fullContractFolderPath);
        return execP(`/usr/local/bin/cleos set contract ${accountName} ${fullContractFolderPath} -p ${accountName}`)
      })
      .then((data) => {
        console.log('data in eosio: ', data)
        menuHelpers.sendConsoleOutput(data);
      })
      .catch((error, stdout, stderr) => {
        console.log('error in eosio: ', error)
        // menuHelpers.sendConsoleOutput(error);
      });
  }
};

// this is cheating
// TODO do this with promises
eosio.getPwAndDeploy = (fullContractFolderPath, walletName = 'default') => {

  let pw;

  JSON.parse(fs.readFileSync(walletsFile)).forEach(w => {
    if (w.walletName === walletName) {
      pw = w.walletPassword;
    }
  });
  console.log('should deploy after this with wallet: ', walletName, 'pw: ', pw);
  eosio.createAccountAndUploadContract(fullContractFolderPath, walletName, pw);
}

/**
 *
 * STEP #5
 *
 * lock user wallet after contract is uploaded to blockchain
 * @param {string} walletName
 * defaults to 'default'
 *
 */
eosio.lockWallet = (walletName = 'default') => {
  if (os.platform() == Platform.macOS || os.platform() == Platform.linux) {
    menuHelpers.sendConsoleOutput(`====== lockWallet ${walletName} ======> ${os.platform()}`);

    const lockWallet = exec(`/usr/local/bin/cleos wallet lock -n ${walletName}`);

    lockWallet.stdout.on('data', data => {
      menuHelpers.sendConsoleOutput(`stdout: ${data}`);

      eosio.getWalletStatus(walletName);
    });

    lockWallet.stderr.on('data', data => {
      menuHelpers.sendConsoleOutput(`stderr: ${data}`);
    });

    lockWallet.on('close', code => {
      menuHelpers.sendConsoleOutput(`child process exited with code ${code}`);
    });
  }
};


// Retrieves list of wallets from cleos. Unlocked wallets are followd witn an ' *'.
// Currently determines status of 'default' wallet and returns boolean.
// TODO: determine name of 'activeWallet' from application state and return its status
eosio.getWalletStatus = (activeWallet = 'default') => {
  if (os.platform() == Platform.macOS || os.platform() == Platform.linux) {

    const getWalletStatus = exec('/usr/local/bin/cleos wallet list');

    let collected = '';
    let wallets = {};

    // get data stream in single string
    getWalletStatus.stdout.on('data', data => {
      collected += data;
    });

    getWalletStatus.stdout.on('end', () => {
      // Delete first line
      collected = collected.split("\n").slice(1).join("\n");
      let newCol = JSON.parse(collected);

      newCol.forEach(name => {
        wallets[name.split(' ')[0]] = name[name.length - 1] === '*' ? { isLocked: false } : { isLocked: true };
      });

      menuHelpers.sendWalletStatus(wallets[activeWallet].isLocked);
      return wallets[activeWallet].isLocked;
    });
  }
};

// create new wallet newWalletName
// each Wallet must have a unique name
eosio.createWallet = (newWalletName) => {

  const walletList = exec('/usr/local/bin/cleos wallet list');
  let collected = '';
  let walletsArray;

  // check if .eosWallets/wallets.json exists
  // if not, create it at users home dir and write and empty array to it
  // this seems DANGEROUS. can overwrite users wallet passwords
  if (!fs.existsSync(walletsFile)) {
    fs.mkdirSync(`${os.homedir()}/eosio-wallet`);
    let walDir = `${os.homedir()}/eosio-wallet`;
    fs.writeFileSync(`${walDir}/wallets.json`, '[]');
  }

  // get list of wallets in an Array to check if default is already created
  walletList.stdout.on('data', data => {
    collected += data;
  });
  walletList.stdout.on('end', () => {
    collected = collected.split("\n").slice(1).join("\n");
    walletsArray = JSON.parse(collected);

    if (walletsArray.includes(newWalletName)) {
      menuHelpers.sendConsoleOutput(`${newWalletName} wallet already exists`);
    } else {
      const cleosCreateWallet = exec(`/usr/local/bin/cleos wallet create -n ${newWalletName}`);

      cleosCreateWallet.stdout.on('data', data => {
        data = data.split('\n');
        console.log('data after split: ', data);
        let walletName = data[0].split('wallet: ')[1];
        let walletPassword = data[3].replace(/"/g, '');
        let walletObj = { walletName, walletPassword };

        let storedWallets = JSON.parse(fs.readFileSync(walletsFile));
        storedWallets.push(walletObj);

        fs.writeFileSync(walletsFile, JSON.stringify(storedWallets), null, 2);

        menuHelpers.sendConsoleOutput(`stdout: ${data}`);

        // send wallet name to app state as 'active wallet'
        menuHelpers.setActiveWallet(walletName);
      });
      cleosCreateWallet.stderr.on('data', data => {
        menuHelpers.sendConsoleOutput(`stderr: ${data}`);
      });
      cleosCreateWallet.on('close', code => {
        menuHelpers.sendConsoleOutput(`child process exited with code ${code}`);
      });
    }
  });
}

// read the dir at the eosWalletStore path (default is /home/<user>/eosio-wallet/)
// push all wallet names into an array for display and selection.
eosio.listAllWallets = () => {

  let walletArray = fs.readdirSync(eosWalletStore);
  walletArray = walletArray.map(w => {
    return w.split('.')[0]
  });

  menuHelpers.populateWalletList(walletArray);
}

// open a wallet with a given name and set as active wallet
eosio.openWallet = walletName => {

  const openedWallet = exec(`/usr/local/bin/cleos wallet open -n ${walletName}`);

  openedWallet.stdout.on('data', data => {
    menuHelpers.sendConsoleOutput(data);
    menuHelpers.setActiveWallet(walletName);
  });
  openedWallet.stderr.on('data', data => {
    menuHelpers.sendConsoleOutput(`stderr: ${data}`);
  });
  openedWallet.on('close', code => {
    menuHelpers.sendConsoleOutput(`child process exited with code ${code}`);
  });
}

eosio.getWalletPW = walletName => {

  let pw;

  JSON.parse(fs.readFileSync(walletsFile)).forEach(w => {
    if (w.walletName === walletName) {
      pw = w.walletPassword;
    }
  });

  return pw;
}

// Currently compile tools are not available on Windows.
// if (os.platform() === Platform.windows) {
//   console.log('compiling on Windows is currently not supported');
//   // console.log(
//   //   '============> trying to run some command line...on ',
//   //   Platform.windows
//   // );
//   // // const bat = spawn('cmd.exe', ['/d/hacking/Blockchain-IDE', 'jt.bat']);
//   // const bat = spawn('cmd.exe', ['echo 'hello'']);
//   // bat.stdout.on('data', data => {
//   //   console.log(data.toString());
//   // });
//   // bat.stderr.on('data', data => {
//   //   console.log(data.toString());
//   // });
//   // bat.on('exit', code => {
//   //   console.log(`Child exited with code ${code}`);
//   // });
// }
// };

module.exports = eosio;
