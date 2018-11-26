const { ipcRenderer } = window.require('electron');

const renderHelpers = {};

renderHelpers.preBuild = () => {
  ipcRenderer.send('preBuild');
};

renderHelpers.build = (path) => {
  ipcRenderer.send('build', path);
};

renderHelpers.unlockAndDeploy = (path, walletName) => {
  console.log('deploying', path, 'on ', walletName);
  ipcRenderer.send('unlockAndDeployMain', path, walletName);
};

renderHelpers.getWalletStatus = () => {
  ipcRenderer.send('getWalletStatus');
};

renderHelpers.createWallet = (walletName) => {
  ipcRenderer.send('createWallet', walletName);
};

renderHelpers.openWallet = (walletName) => {
  ipcRenderer.send('openWallet', walletName);
};

renderHelpers.listAllWallets = () => {
  ipcRenderer.send('listAllWallets');
};

module.exports = renderHelpers;
