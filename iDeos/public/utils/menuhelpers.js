const { dialog, BrowserWindow } = require('electron');
// const { Platform } = require("../../src/utils/constants");
// const fs = require("fs");
// const eosio = require('./../eosio/eosio')
const { ipcMain } = require('electron');

const menuHelpers = {};

menuHelpers.build = () => {
  BrowserWindow.getFocusedWindow().webContents.send('build');
};

menuHelpers.unlockAndDeploy = () => {
  BrowserWindow.getFocusedWindow().webContents.send('unlockAndDeploy');
};

menuHelpers.sendConsoleOutput = message => {
  BrowserWindow.getAllWindows()[0].webContents.send('consoleOutput', message);
};

menuHelpers.sendWalletStatus = status => {
  BrowserWindow.getAllWindows()[0].webContents.send('setWalletStatus', status);
};

menuHelpers.showCreateAccountModal = () => {
  console.log('sending showCreateAccountModal message');
  BrowserWindow.getAllWindows()[0].webContents.send('showCreateAccountModal');
};

menuHelpers.showConnectAccountModal = () => {
  console.log('sending showConnectAccountModal message');
  BrowserWindow.getAllWindows()[0].webContents.send('showConnectAccountModal');
};

menuHelpers.showConfigureNetworkModal = () => {
  console.log('sending showConfigureNetworkModal message');
  BrowserWindow.getAllWindows()[0].webContents.send('showConfigureNetworkModal');
};

// menuHelpers.showSelectWalletModal = () => {
//   console.log('sending showSelectWalletModal message');
//   BrowserWindow.getAllWindows()[0].webContents.send('showSelectWalletModal');
// };

menuHelpers.showAndPopulateSelectWalletModal = () => {
  console.log('sending showAndPopulateSelectWalletModal message');
  BrowserWindow.getAllWindows()[0].webContents.send('showAndPopulateSelectWalletModal');
};

menuHelpers.populateWalletList = WalletArray => {
  console.log('in menuHelpers.populateWalletList');
  BrowserWindow.getAllWindows()[0].webContents.send('populateWalletList', WalletArray);
}

menuHelpers.setActiveWallet = walletName => {
  console.log('in setActiveWallet, walletName: ', walletName);
  BrowserWindow.getAllWindows()[0].webContents.send('setActiveWallet', walletName);
};

menuHelpers.lockWallet = () => {
  console.log('in menuhelpers.lockWallet');
  BrowserWindow.getAllWindows()[0].webContents.send('lockWallet');
};

menuHelpers.unlockWallet = () => {
  console.log('in menuhelpers.unlockWallet');
  BrowserWindow.getAllWindows()[0].webContents.send('unlockWallet');
};

// preBuild event from renderer process bounces build event back to get directory path
// TODO: stay here or move to Main.js to remove ipcMain req in menuhelpers
ipcMain.on('preBuild', (event) => {
  menuHelpers.build();
});

module.exports = menuHelpers;
