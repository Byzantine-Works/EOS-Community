import * as types from './../actions/actionTypes';
import State from './../model/State';
import WorkspaceDirectory from './../model/WorkspaceDirectory';
import WorkspaceContract from './../model/WorkspaceContract';
import { WorkspaceRefreshedChildren } from './../model/WorkspaceDirectory';

const fs = window.require('fs');

const editor = (state = new State(), action) => {
  const { type } = action;
  let updatedState = null;
  switch (type) {

    case types.UPDATE_STATE: {
      let data = action.payload.data;
      updatedState = { ...state };
      updatedState[data[0]] = data[1];
      return updatedState;
    }
    // populate the list of 'opanable' wallets by reading eosio-wallets dir
    // action.payload.data is an array of wallet name strings
    case types.POPULATE_WALLET_LIST: {
      const newWalletsList = action.payload.data;
      updatedState = { ...state, wallets: newWalletsList };
      return updatedState;
    }

    // case types.IS_ACTION_DEPLOYED: {
    //   let data = action.payload.data;
    //   updatedState = { ...state };
    //   console.log()
    //   updatedState.actions[data].isDeployed = !state.actions[data].isDeployed;
    //   return updatedState;
    // }
    case types.INPUT_ACTION: {
      let act = action.payload.action;
      let value = action.payload.value;
      let nwActions = state.actions;
      nwActions[act][value] = action.payload.data;
      let updatedState = { ...state, actions: nwActions }
      return updatedState;

    }

    case types.CHANGE_MODE: {
      let newMode = !state.mainNet;
      let nwNetwork = newMode ? state.networks.main : state.networks.test;
      updatedState = { ...state, mainNet: newMode, net: nwNetwork };
      if(newMode) updatedState.account = state.mainAccount;
      else updatedState.account = state.testAccount;
      return updatedState;
    }

    // set the name of the active wallet
    // active wallet is the wallet contracts will be deployed under and will be locked/unlocked durring deploy commands
    case types.SET_ACTIVE_WALLET: {
      const newActiveWallet = action.payload.data;
      updatedState = { ...state, activeWallet: newActiveWallet };
      return updatedState;
    }

    // change wallet status to true (locked) or false (unlocked)
    case types.SET_WALLET_STATUS: {
      const newStatus = action.payload.data;
      updatedState = { ...state, activeWalletStatusIsLocked: newStatus };
      return updatedState;
    }

    case types.CREATE_ACCOUNT_NAME: {
      updatedState = { ...state, account: action.payload.data, createAccountModalHidden: true };
      return updatedState;
    }
    

    case types.CLOSE_CREATE_ACCOUNT_MODAL: {
      updatedState = { ...state, createAccountModalHidden: true };
      return updatedState;
    }

    case types.SHOW_CREATE_ACCOUNT_MODAL: {
      updatedState = { ...state, createAccountModalHidden: false };
      return updatedState;
    }

    case types.SHOW_CONNECT_ACCOUNT_MODAL: {
      updatedState = { ...state, connectAccountModalHidden: !state.connectAccountModalHidden };
      return updatedState;
    }

    case types.SHOW_CONFIGURE_NETWORK_MODAL: {
      updatedState = { ...state, configureNetworkModalHidden: !state.configureNetworkModalHidden };
      return updatedState;
    }

    case types.CONFIGURE_NETWORK: {
      let test = action.payload.test;
      let main = action.payload.main;
      let nwNetworks = { test: test, main: main }
      let nwNetwork = state.mainNet ? main : test;
      updatedState = { ...state, networks: nwNetworks, net: nwNetwork }
      return updatedState;
    }

    case types.CONNECT_ACCOUNT : {
      let privKey = action.payload.key;
      let account = action.payload.account;
      let updatedState = {...state};
      updatedState.keys.active.private = privKey;
      updatedState.account = account;
      updatedState.testAccount = account;

      return updatedState;

    }

    case types.CLOSE_SELECT_WALLET_MODAL: {
      updatedState = { ...state, selectWalletModalHidden: true };
      return updatedState;
    }

    case types.SHOW_SELECT_WALLET_MODAL: {
      updatedState = { ...state, selectWalletModalHidden: false };
      return updatedState;
    }

    case types.SHOW_ERROR_MODAL: {
      if(action.paload.data) updatedState = { ...state, error: action.paload.data };
      else updatedState = { ...state, error: false };
      return updatedState;
    }

    // recieve logging messages from main process
    case types.LOG_CONSOLE_OUTPUT: {
      const newMessages = [...state.messages];
      newMessages.push(action.payload.data);
      updatedState = { ...state, messages: newMessages };
      return updatedState;
    }

    case types.EDITOR_CHANGE: {
      updatedState = Object.assign({}, state);
      updatedState.data = action.payload.data;
      return updatedState;
    }

    case types.GET_STATE: {
      return action.payload.data;
    }
    case types.SAVE: {
      console.log('in SAVE reducer');
      updatedState = Object.assign(state);
      const path = action.payload.data;

      updatedState.currFilePath = path;
      updatedState.isCurrDirty = state.dirtyFiles.splice(state.dirtyFiles.indexOf(path), 1);
      return updatedState;
    }

    case types.NEW_FILE: {
      // console.log('in NEW_FILE reducer');
      updatedState = Object.assign({}, state);
      const path = action.payload.data;
      updatedState.currFilePath = path;

      // TODO:: Put the new file in focus...tabs

      return updatedState;
    }

    case types.PROJECT_FILESYSTEM_CHANGE: {
      // deep clone value of previous state.projectRoot
      const projectRoot = JSON.parse(JSON.stringify(state.projectRoot));
      console.log("project root: ", projectRoot);
      projectRoot.children = WorkspaceRefreshedChildren(state.projectRoot);

      updatedState = {
        ...state,
        projectRoot,
      };

      return updatedState;
    }

    case types.OPEN_FILE_RANDOM: {
      const path = action.payload.data;
      const newOpenedFiles = state.openedFiles;

      if (newOpenedFiles.includes(path) === false) newOpenedFiles.push(path);

      const data = fs.readFileSync(path, 'utf8');
      updatedState = { ...state, 
                          data,
                          openedFiles: newOpenedFiles };

      return updatedState;

    }

    case types.OPEN_FILE_CONTRACT: {
      const path = action.payload.data;
      console.log("path: ", path);

      const newOpenedFiles = state.openedFiles;

      if (newOpenedFiles.includes(path) === false) newOpenedFiles.push(path);
      let nwContracts = state.contracts;
      nwContracts[path.split('/').pop().split(".")[0]] = action.payload.contract;

      const data = fs.readFileSync(path, 'utf8');
      updatedState = {
        ...state,
        data,
        currFilePath: path,
        openedFiles: newOpenedFiles,
        contracts: nwContracts,
        currContract: path.split('/').pop().split(".")[0]
      };

      console.log('updatedState after', updatedState);

      return updatedState;
    }

    case types.CLOSE_FILE: {
      const path = action.payload.data;
      const newOpenedFiles = state.openedFiles.slice(0);
      console.log('path in reducers: ', path);
      console.log('index in reducers: ', newOpenedFiles.indexOf(path));

      newOpenedFiles.splice(newOpenedFiles.indexOf(path), 1);

      updatedState = { ...state, openedFiles: newOpenedFiles, currFilePath: '' };

      return updatedState;
    }

    case types.CLEAR_WORKSPACE: {
      updatedState = { ...state, data: '// welcome to iDeos', currFilePath: '' };
      return updatedState;
    }

    case types.ADD_FOLDER_TO_WORKSPACE: {
      const path = new WorkspaceDirectory(action.payload.data, false);
      console.log("path: ", path)
      updatedState = { ...state, projectRoot: path };
      return updatedState;
    }

    default: {
      return state;
    }
  }
};

function editFileContents(state = new State(), action) {
  if (action.type !== types.EDIT_FILE_CONTENTS) return state;

  const updatedState /* : State */ = Object.assign(state);
  const updatedFile = action.payload.data;
  const oldFile = updatedState.dirtyFiles.find(file => file === updatedFile);

  if (!oldFile) updatedState.dirtyFiles.push(updatedFile);

  return updatedState;
}

const mainReducer = (state = new State(), action) => {
  let newState = editor(state, action);
  newState = editFileContents(newState, action);

  return newState;
};

export default mainReducer;
