import * as types from './actionTypes';
import Eos from 'eosjs';
import renderHelpers from '../utils/renderHelpers';
import ecc from 'eosjs-ecc';
import lodash from 'lodash';
import ScatterJS  from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';


const fs = window.require('fs');
const path = window.require('path');
const os = window.require('os');
console.log("path resolve: ", __dirname+'accounts.json');
ScatterJS.plugins( new ScatterEOS() );


// const eos = Eos({
//   keyProvider: '5KjDGssHn6aYBs32NwWiGvh2Aa7FbRpu7RGXv9ToNgj8FyS1vyw',// private key
//   httpEndpoint: 'https://cors-anywhere.herokuapp.com/http://13.57.210.230:8888',
//   chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'

// })


var myBuffer = [];
var str = 'test';
var buffer = new Buffer(str, 'utf16le');
for (var i = 0; i < buffer.length; i++) {
  myBuffer.push(buffer[i]);
}

export const newFile = data => ({
  type: types.NEW_FILE,
  payload: { data },
});

/**
 * TODO: use thunk to do asynch folder operation before feeding to action->reducer
 */

export const newFileAsync = (data) => {
  const path = data;
  return dispatch =>
    new Promise((resolve, reject) => {
      // wrap our file system call in a Promise
      const code = '// Your code here';
      fs.writeFile(path, code, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(`New file ${path} created successfully`);
        }
      });
    }).then(() => {
      dispatch(newFile(data));
    });
};

export const newDirectory = data => ({
  type: types.NEW_DIRECTORY,
  payload: { data },
});

/**
 * TODO: use thunk to do asynch folder operation before feeding to action->reducer
 */
export const newDirectoryAsync = (data) => {
  const path = data;
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      if (!fs.existsSync(path)) {
        fs.mkdir(path, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve('New directory ${path} created successfully');
          }
        });
      }
    }).then(() => {
      dispatch(newDirectory(path));
    });
};

/**
 * TODO: Need to CREATE FOLDER AND ALSO CREATE A CONTRACT FILE in the folder
 * TODO: use thunk to do asynch folder operation before feeding to action->reducer
 */
export const newContractAsync = (data) => {
  const path = data;
  return dispatch =>
    new Promise((resolve, reject) => {
      if (!fs.existsSync(path)) {
        fs.mkdir(path, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(`New contract directory ${path} created successfully`);
          }
        });
      }
    })
      .then(response =>
        new Promise((resolve, reject) => {
          const re = /[\/\\]/; // we want split on "/" (UNIX) or "\" (Win32) for different

          const tempArr = path.split(re);
          const fileName = `${tempArr[tempArr.length - 1]}.cpp`; // make the file the same name as the contract dir
          const filePath = `${path}/${fileName}`;
          fs.writeFile(filePath, `// Contract ${fileName} code here`, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(`${response}...File ${filePath} saved successfully`);
            }
          });
        }))
      .then(() => {
        dispatch(newContract({ contract_path: path, file_path: 'TODO' }));
        // dispatch(openFile(path));
      })
      .catch((err) => {
        // TODO: Is this really how we want to handle errors?
        throw err;
      });
};

/**
 * @param payload should have 2 keys: 'contract_path' and 'file_path'
 */
export const newContract = data => ({
  type: types.NEW_CONTRACT,
  payload: { data },
});

export const saveFile = data => ({
  type: types.SAVE,
  payload: { data },
});

/**
 *  TODO: use thunk to do asynch file operation before feeding to action->reducer
 */

export const saveFileAsync = (data) => {
  const path = data;
  return (dispatch, getState) =>{
  if(getState().dirtyFiles.includes(path)) {
    new Promise((resolve, reject) => {
      // wrap our file system call in a Promise
      const code = getState().data;
      fs.writeFile(path, code, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(`File ${path} saved successfully`);
        }
      });
    }).then(() => {
      dispatch(saveFile(data));
    });
  }
}
};

export const updateState = data => ({
  type: types.UPDATE_STATE,
  payload: { data },
})

export const isActionDeployed = data => ({
  type: types.IS_ACTION_DEPLOYED,
  payload: { data },
})

export const inputAction = (action, value, data) => ({
  type: types.INPUT_ACTION,
  payload: { action, value, data },
})

export const projectFilesystemChange = () => ({
  type: types.PROJECT_FILESYSTEM_CHANGE,
});

export const editorChange = data => ({
  type: types.EDITOR_CHANGE,
  payload: { data },
});

export const editFileContents = data => ({
  type: types.EDIT_FILE_CONTENTS,
  payload: { data },
});

export const openFileContract = (data, contract) => ({
  type: types.OPEN_FILE_CONTRACT,
  payload: { data, contract },
});

export const openFileRandom = (data) => ({
  type: types.OPEN_FILE_RANDOM,
  payload: { data },
});

export const closeFile = data => ({
  type: types.CLOSE_FILE,
  payload: { data },
});

export const openDirectory = data => ({
  type: types.ADD_FOLDER_TO_WORKSPACE,
  payload: { data },
});

export const logConsoleOutput = data => ({
  type: types.LOG_CONSOLE_OUTPUT,
  payload: { data },
});

export const clearWorkspace = () => ({
  type: types.CLEAR_WORKSPACE,
});

export const setWalletStatus = data => ({
  type: types.SET_WALLET_STATUS,
  payload: { data },
});

export const closeCreateAccountModal = () => ({
  type: types.CLOSE_CREATE_ACCOUNT_MODAL,
});

export const showCreateAccountModal = () => ({
  type: types.SHOW_CREATE_ACCOUNT_MODAL,
});

export const showConnectAccountModal = () => ({
  type: types.SHOW_CONNECT_ACCOUNT_MODAL,
});

export const closeSelectWalletModal = () => ({
  type: types.CLOSE_SELECT_WALLET_MODAL,
});

export const showSelectWalletModal = () => ({
  type: types.SHOW_SELECT_WALLET_MODAL,
});

export const showErrorModal = data => ({
  type: types.SHOW_ERROR_MODAL,
  payload: { data }
});

export const showConfigureNetworkModal = () => ({
  type: types.SHOW_CONFIGURE_NETWORK_MODAL
})

export const createAccountName = data => ({
  type : types.CREATE_ACCOUNT_NAME,
  payload: { data },
});

export const configureNetwork = (test, main) => ({
  type: types.CONFIGURE_NETWORK,
  payload: { test, main }
});

export const changeMode = () => ({
  type: types.CHANGE_MODE,
});

export const connectAccount = (key, account) => ({
  type: types.CONNECT_ACCOUNT,
  payload: { key, account }
})

/**
 *  TODO: use thunk to do asynch file operation before feeding to action->reducer
 */
export const createAccountNameAsync = data => {
  let accountName = data[0];
  
  return async (dispatch, getState) => {
  
    const eos = getState().mainNet ? getState().scatterNet : Eos(getState().net);

    if(getState().mainNet) {
      dispatch(logConsoleOutput(JSON.stringify("Account creation is not available on Main Net.")));
      await dispatch(closeCreateAccountModal());
    }
    else {
    try {
    let accCreate = await eos.transaction(tr => { 
    tr.newaccount({
      creator: 'ideos',
      name: accountName,
      owner: data[1],
      active: data[3]
    })
      tr.buyrambytes({
          payer: 'ideos',
          receiver: accountName,
          bytes: 500000
        })
       
        tr.delegatebw({
          from: 'ideos',
          receiver: accountName,
          stake_net_quantity: '3.0000 EOS',
          stake_cpu_quantity: '3.0000 EOS',
          transfer: 0
        })

        tr.transfer({
          from: 'ideos',
          to: accountName,
          quantity: '3.0000 EOS',
          memo: 'transfer testideos'
        })
  });
  console.log("accR: ", accCreate)
  dispatch(logConsoleOutput(JSON.stringify(accCreate)));

  await dispatch(closeCreateAccountModal());
  await dispatch(createAccountName(accountName));

  let a = {name:accountName, owner:{public: data[1], private: data[2]},
                             active: {public: data[3], private: data[4]}
                            };


  let listDir = fs.readdirSync(os.homedir());
  if(!listDir.includes("eosio_accounts")) {
    fs.mkdirSync(os.homedir()+'/eosio_accounts');
    fs.writeFileSync(os.homedir()+'/eosio_accounts/accounts.json', '[{"name":"ideos","owner":{"public":"EOS7uDvyMENfty6Zbk4FksGRzuohKDYPqXbTzaiwbcJqEG1MzyKYm","private":"5K71w2uenhVkQ5E16bxZtGL65aJYhWbmgHCBeBJYU3Ve1ZmX7YS"},"active":{"public":"EOS6ZETJawibdavobXqgWkz4joaBq3zgV5RbUGjN6R8jhbsNZGCj4","private":"5JrgcGV3md4gnWg8WxPqPtTtTpXnwJJr597bvMdMwtSUTteVtj5"}}]');
  }

  let content = JSON.parse(fs.readFileSync(os.homedir()+'/eosio_accounts/accounts.json'));
  content.push(a);
  content = JSON.stringify(content);


  fs.writeFileSync(os.homedir()+'/eosio_accounts/accounts.json', content);

  } catch(error) {
    dispatch(logConsoleOutput(JSON.stringify(error)));
    console.log(error)
  }


      // we're going to let the external wallet script handle updating wallet state.  We'll just close the modal.
      
    };
  }
};

export const openWalletAsync = (data) => {
  const walletName = data;
  return dispatch =>
    new Promise((resolve) => {
      renderHelpers.openWallet(walletName);

      // resolve right away...we're leaving final results to the async script...it updates state.
      resolve();
    }).then(() => {
      // we're going to let the external wallet script handle updating wallet state.  We'll just close the modal.
      dispatch(closeCreateAccountModal());
      dispatch(closeSelectWalletModal());
    });
};

/**
 * TODO: populate modal dropdown with wallet names here?
 * TODO: use a redux/thunk function? populate go out and populate list by reading wallets Dir?
 */
export const showAndPopulateSelectWalletModal = () => dispatch =>
  new Promise((resolve) => {
    renderHelpers.listAllWallets();

    // resolve right away...we're leaving final results to the async script...it updates state.
    resolve();
  }).then(() => {
    // we're going to let the external wallet script handle updating wallet state.  We'll just close the modal.
    dispatch(showSelectWalletModal());
  });



  export const openFile = (data) => {

    const checkFile = async (path, dec) => {
      try {
        console.log(path.split('.')[-1]);
        if(dec === 'hex') return fs.readFileSync(path);
        else if(dec === 'bin') return fs.readFileSync(path, 'binary');
        else return fs.readFileSync(path, 'utf8');
      
      } catch(err) {
        return null;}
    }

    return async (dispatch, getState) => {
      let path = data;
      let univPath = path.split(".")
      let contract = {};
      let ext = ['cpp', 'wasm', 'hpp', 'abi', 'wast']

      if(ext.includes(univPath.pop())){
        univPath;
        univPath = univPath.join(".");

        contract.cpp = await checkFile(univPath+'.cpp', 'utf8');
        contract.wasm = await checkFile(univPath+'.wasm', 'utf8');
        contract.hpp = await checkFile(univPath+'.hpp', 'utf8');
        contract.abi = await checkFile(univPath+'.abi', 'utf8');
        contract.wasmHex = await checkFile(univPath+'.wasm', 'hex');
        console.log(contract);
        dispatch(openFileContract(data, contract));

        //console.log(JSON.parse(contract.abi));
    
        let actions = {};
        try {
            JSON.parse(getState().contracts[getState().currContract].abi).actions.forEach(a => {
            actions[a.name] = {isDeployed: true };
          });
          
            dispatch(updateState(["actions", actions]));
          } catch(err) {
            console.log(err);
          }
      }

    else dispatch(openFileRandom(data));


  }
  }



export const setActiveWallet = data => ({
  type: types.SET_ACTIVE_WALLET,
  payload: { data },
});

export const populateWalletList = data => ({
  type: types.POPULATE_WALLET_LIST,
  payload: { data },
});


//Actions testing

export const testAction = (actionN) => {
  let actionName = actionN;
  return async (dispatch, getState) => {
    const eosOptions = { expireInSeconds:60 };
    let eosTestAct;
    if(getState().mainNet){
      let network  = getState().networks.main;
      const scatter = ScatterJS.scatter;
      const requiredFields = { accounts:[network] };
      console.log(network);
      await scatter.getIdentity(requiredFields);
      eosTestAct = scatter.eos(network, Eos, eosOptions);
    } else eosTestAct = Eos(getState().net)

  
    console.log(actionName);

  let abi = JSON.parse(getState().contracts[getState().currContract].abi);

  let acts = [];
  let data = {};
  let field = lodash.find(abi.structs, ['name', actionName]);
  field.fields.forEach(arg => {
      data[arg.name] = getState().actions[actionName][arg.name];
    });
    console.log(data, getState().account);

  acts.push(
      {
          account: getState().account,
          name: actionName,
          authorization: [{
              actor: getState().account,
              permission: 'active'
          }],
          data
      });

  try {
    console.log(acts);
      let respTransac = await eosTestAct.transaction({ actions: acts });
      dispatch(logConsoleOutput(JSON.stringify(respTransac)));
    
  } catch (error) {
    dispatch(logConsoleOutput(JSON.stringify(error)));
      if (typeof error === 'string') {
          let err = JSON.parse(error);
          console.log(actionName, ": ", err);
      } else console.log(error);
      }
  }
}



export const deploy = () => {
  return async(dispatch, getState) => {
    const eosOptions = { expireInSeconds:60 };
    let eosDep;
    if(getState().mainNet){
      let network  = getState().networks.main;
      const scatter = ScatterJS.scatter;
      const requiredFields = { accounts:[network] };
      console.log(network);
      await scatter.getIdentity(requiredFields);
      eosDep = scatter.eos(network, Eos, eosOptions);
    } else eosDep = Eos(getState().net)

    console.log("eosDep: ", eosDep);


    console.log("In deploy");
    console.log(getState().contracts[getState().currContract])

    let wasmHex = getState().contracts[getState().currContract].wasmHex;
    
    let abi = JSON.parse(getState().contracts[getState().currContract].abi);
  
    try {
    console.log(getState().account)

    let setwasm = await eosDep.setcode(getState().account, 0, 0, wasmHex);
    let setabi = await eosDep.setabi(getState().account, abi);

    if(setwasm.broadcast && setabi.broadcast) dispatch(logConsoleOutput("Your contract has been deployed successfully:"
    +JSON.stringify(setwasm)
    +JSON.stringify(setabi)))
    console.log("setcode :", setwasm, setabi);
    } catch(err) {
      dispatch(logConsoleOutput(JSON.stringify(err)));
      console.log(err);
    }

  }
}

export const genKeys = () => {
  return async (dispatch, getState) => {
  console.log("in genKeys")
  const genPub = async () => {
    let priv;
    let a = true;
    while (a) {
      priv = await ecc.randomKey();
      try {
      let check = await ecc.isValidPrivate(priv);
      console.log("check: ", check);
      return priv;

      } catch(e) {
        console.log(e)
      }
    }
    
  }

  let privKO = await genPub();
  await console.log(privKO)
  let pubKO = await ecc.privateToPublic(privKO);
  let checkPub = await ecc.isValidPublic(pubKO);
  console.log("checkPub", checkPub);

  let privKA = await genPub();
  let pubKA = await ecc.privateToPublic(privKA);

  let payload = {owner: {public: pubKO, private: privKO}, active: {public:pubKA, private:privKA}};
  dispatch(updateState(["keys", payload]));
  }

}

