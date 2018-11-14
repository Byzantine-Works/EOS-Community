const os = require('os');
const { dialog, BrowserWindow } = require('electron');
const { Platform } = require('../constants');
const fs = require('fs');
const eosio = require('./../eosio/eosio');
const path = require('path');

const ROOT_APP_PATH = path.dirname(require.main.filename);

// TODO:: should use IPC communciations
const createDirectoryOld = () => {
  console.log('creating Directory');
  const dialogTitle = 'Create Directory';
  if (os.platform() === Platform.linux) {
    dialog.showMessageBox({ title: dialogTitle, message: 'TODO: crete directory in Linux' });
  }
  if (os.platform() == Platform.macOS) {
    const dir = dialog.showOpenDialog({ title: dialogTitle, properties: ['createDirectory'] });
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
  if (os.platform() === Platform.windows) {
    console.log('creating Directory on...', Platform.windows);
    const dir = dialog.showOpenDialog({ title: dialogTitle, properties: ['promptToCreate'] });
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
};

// TODO:: should use IPC communciations
const createContractOLD = () => {
  // place holder createContract just makes directory
  if (os.platform() === Platform.linux) {
    dialog.showMessageBox({ message: 'TODO: crete directory in Linux' });
  }
  if (os.platform() == Platform.macOS) {
    const dir = dialog.showOpenDialog({ properties: ['createDirectory'] });
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
};

const newDirectory = () => {
  console.log('in fshelpers...sending newDirectory message');
  const focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.webContents.send('newDirectory');
};

const newContract = () => {
  console.log('in fshelpers...sending newContract message');
  const focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.webContents.send('newContract');
};

const newFile = () => {
  // console.log('in fshelpers...sending newFile message');
  const focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.webContents.send('newFile');
};

const openFile = () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.webContents.send('openFile');
};

const openDirectory = () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.webContents.send('openDirectory');
};

const save = () => {
  // save current file place holder use saveAs dialog to save file
  const focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.webContents.send('saveFile');
};

const saveAs = () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.webContents.send('saveAs');
};

const buildContract = (dir) => {
  console.log("path extension: ", path.extname(dir))
  dir = dir || dialog.showOpenDialog();
  if (dir === '' || dir === undefined) {
    return;
  }
  if(path.extname(dir) === '.cpp') eosio.compileCompleteContract(dir);
};

const startTestNet = () => {
  eosio.startTestNet();
};

const unlockAndDeploy = (path, walletName) => {
  // TODO get path of 'active file' from editor. If no path, set with system dialog
  // console.log('in unlockdeploy in fshelpers')
  // console.log('path in unlockdeploy in fshelpers', path);
  if (!path) {
    path = dialog.showOpenDialog({
      defaultPath: ROOT_APP_PATH,
      properties: ['openDirectory'],
    });
  }
  if (path === '' || path === undefined) {
    return;
  }
  eosio.getPwAndDeploy(path, walletName);
};

// check status of wallet
const getWalletStatus = () => {
  eosio.getWalletStatus();
};

const createWallet = (walletName) => {
  console.log('in fshelpers...createWallet...walletName: ', walletName);
  eosio.createWallet(walletName);
};

module.exports = {
  newDirectory,
  newContract,
  newFile,
  openFile,
  openDirectory,
  save,
  saveAs,
  buildContract,
  unlockAndDeploy,
  createWallet,
};
