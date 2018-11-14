const createWindow = require('./../windowHelpers');
const { dialog } = require('electron');
const fsHelpers = require('./../utils/fshelpers');
const menuHelpers = require('./../utils/menuhelpers');
const eosio = require('./../eosio/eosio');

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Window',
        click: () => {
          createWindow();
        },
      },
      {
        label: 'New File',
        click: () => {
          fsHelpers.newFile();
        },
      },
      {
        label: 'New Contract',
        click: () => {
          console.log('New Contract');
          fsHelpers.newContract();
        },
      },
      {
        label: 'New Directory',
        click: () => {
          console.log('New Directory');
          fsHelpers.newDirectory();
        },
      },
      {
        label: 'Open File',
        click: () => {
          fsHelpers.openFile();
        },
      },
      {
        label: 'Open Directory',
        click: () => {
          fsHelpers.openDirectory();
        },
      },
      { type: 'separator' },
      {
        label: 'Save', // save current file
        click: () => {
          fsHelpers.save();
        },
      },
      {
        label: 'Save As',
        click: () => {
          fsHelpers.saveAs();
        },
      },
      { type: 'separator' },
      {
        label: 'Close Window',
        role: 'close',
      },
      { role: 'quit' },
    ],
  },
  {
    label: 'Tools',
    submenu: [
      // {
      //   // select .cpp file for build through menubar
      //   label: 'Build Contract',
      //   click: () => {
      //     // eosio.compileCompleteContract(path);
      //     menuHelpers.build();
      //   },
      // },
      {
        // select .wasm file for deploy through menubar
        label: 'Deploy Contract',
        click: () => {
          menuHelpers.unlockAndDeploy();
        },
      },
      { type: 'separator' },
      // {
      // Testing get wallet status function
      // label: 'Get Wallet Status',
      // click: () => {
      // eosio.getWalletStatus();
      // },
      // },
      // {
      // Testing list all wallets
      //   label: 'print all wallets',
      //   click: () => {
      //     eosio.listAllWallets();
      //   },
      // },
      // {
      //   label: 'Select Wallet',
      //   click: () => {
      //     // show modal or something with list of wallets
      //     // menuHelpers.showSelectWalletModal();
      //     menuHelpers.showAndPopulateSelectWalletModal();
      //   }
      // },
      {
        label: 'Create New Account',
        click: () => {
          // eosio.createWallet();
          menuHelpers.showCreateAccountModal(); // just testing with this button for now...
        },
      },
      {
        label: 'Connect Account',
        click: () => {
          // eosio.createWallet();
          menuHelpers.showConnectAccountModal(); // just testing with this button for now...
        },
      },
      {
        label: 'Configure Network',
        click: () => {
          // eosio.createWallet();
          menuHelpers.showConfigureNetworkModal(); // just testing with this button for now...
        },
      },
      // {
      //   label: 'Unlock Wallet',
      //   click: () => {
      //     // eosio.unlockWallet();
      //     menuHelpers.unlockWallet();
      //   },
      // },
      // {
      //   label: 'Lock Wallet',
      //   click: () => {
      //     // eosio.lockWallet();
      //     menuHelpers.lockWallet();

      //   },
      // },
      // { type: 'separator' },
      // {
      //   label: 'Start Local EOS Blockchain',
      //   click: () => {
      //     eosio.startTestNetNewTerminal();
      //   },
      // },
      // {
      //   label: 'Stop Local EOS Blockchain',
      //   click: () => {
      //     eosio.killTestNet();
      //   },
      // },
    ],
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  {
    label: 'About',
    submenu: [
      {
        label: 'About iDeos',
        click: () => {
          dialog.showMessageBox({ message: 'iDeos v 0.0.1' });
        },
      },
    ],
  },
];

module.exports = template;
