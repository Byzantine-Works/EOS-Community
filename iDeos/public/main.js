// dependencies
const electron = require('electron');
const createWindow = require('./windowHelpers');
const menuTemplate = require('./menus/menu');
const { ipcMain } = require('electron');
const { Platform } = require('./constants');
const fsHelpers = require('./utils/fshelpers');
const eosio = require('./eosio/eosio');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer');

// const eosio = require("./eosio/eosio");

// constants
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

// variables
let mainWindow;

/**
 *  This is script is run within the "main process".
 *  https://github.com/electron/electron/blob/master/docs/tutorial/application-architecture.md#main-and-renderer-processes
 *
 */

app.on('ready', () => {
  createWindow();

  // install React and Redux devtool extensions
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));

  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));

  // create and load menus
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Can test here if buttons are not hooked up. Uncomment to compile on "ready".
  // eosio.compileCompleteContract(); // need to give path to .cpp filea

  // preBuild event from renderer process bounces build event back to get directory path
  // goes here or in menu helpers?
  // ipcMain.on('preBuild', event => {
  // });

  ipcMain.on('build', (event, path) => {
    fsHelpers.buildContract(path);
  });

  ipcMain.on('unlockAndDeployMain', (event, path, walletName) => {
    console.log('in Main: ', path, walletName);
    fsHelpers.unlockAndDeploy(path, walletName);
  });

  ipcMain.on('createWallet', (event, walletName) => {
    console.log('ipcMain got message createWallet...wallet name:', walletName);
    fsHelpers.createWallet(walletName);
  });

  ipcMain.on('openWallet', (event, walletName) => {
    console.log('ipcMain got message openWallet... walletName:', walletName);
    eosio.openWallet(walletName);
  });

  ipcMain.on('listAllWallets', event => {
    console.log('ipcMain.listAllWallets');
    eosio.listAllWallets();
  });

  ipcMain.on('lockNamedWallet', (event, walletName) => {
    console.log('ipcMain.lockNamedWallet ', walletName);
    eosio.lockWallet(walletName);
  });

  ipcMain.on('unlockNamedWallet', (event, walletName) => {
    console.log('ipcMain.unlockNamedWallet ', walletName);
    eosio.unlockWallet(walletName);
  });

});

app.on('window-all-closed', () => {
  if (process.platform !== Platform.macOS) {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

module.exports = createWindow;
