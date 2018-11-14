// external dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from '@uifabric/icons';
import SplitPane from 'react-split-pane';

// internal dependencies
import './App.css';
import * as actions from '../actions/actions';
import FileExplorer from './FileExplorer';
import CommandBar from './CommandBar';
import CodeEditor from './CodeEditor';
import Actions from './Actions'
import Tabs from './Tabs';
import StatusBar from './StatusBar';
import Output from './Output';
import ErrorModal from './ErrorModal';
import CreateAccountModal from './CreateAccountModal';
import ConnectAccountModal from './ConnectAccountModal';
import ConfigureNetworkModal from './ConfigureNetworkModal';
import SelectWalletModal from './SelectWalletModal';
import renderHelpers from './../utils/renderHelpers'

// Register icons and pull the fonts from the default SharePoint cdn:
initializeIcons();

// const fs = window.require('fs');

const { ipcRenderer, remote } = window.require('electron');
const dialog = remote.dialog;

const Ratio = (fraction) => {
  if (fraction < 0 || fraction > 1) {
    throw new Error(`Fraction (${fraction}) should be a ratio between 0.0 to 1.0!`);
  }
  return `${fraction * 100}%`;
};

ipcRenderer.on('opened-directory', (event, arg) => {
  // TODO: Do something…
});

const mapStateToProps = store => ({
  // files: store.fileSystemState.files,
  code: store.data,
  createAccountModalHidden: store.createAccountModalHidden,
  connectAccountModalHidden: store.connectAccountModalHidden,
  configureNetworkModalHidden: store.configureNetworkModalHidden,
  selectWalletModalHidden: store.selectWalletModalHidden,
  currFilePath: store.currFilePath,
  currContract: store.currContract,
  contracts: store.contracts,
  messages: store.messages,
  networks: store.networks,
  openedFiles: store.openedFiles,
  projectRoot: store.projectRoot,
  walletStatus: store.activeWalletStatusIsLocked,
  activeWallet: store.activeWallmapStateToPropset,
  wallets: store.wallets,
  mainNet: store.mainNet,
  keys: store.keys,
  account: store.account,
  actions: store.actions,
  scatterNet: store.scatterNet,
  error: store.error

});

const mapDispatchToProps = dispatch => ({
  // addFile: files => dispatch(actions.addFile(files)),
  connectAccount : (key, account) => dispatch(actions.connectAccount(key, account)),
  changeMode: () => dispatch(actions.changeMode()),
  clearWorkspace: () => dispatch(actions.clearWorkspace()),
  closeFile: data => dispatch(actions.closeFile(data)),
  closeCreateAccountModal: () => dispatch(actions.closeCreateAccountModal()),
  closeSelectWalletModal: () => dispatch(actions.closeSelectWalletModal()),
  configureNetwork: (test, main) => dispatch(actions.configureNetwork(test, main)),
  // createWalletName: data => dispatch(actions.createWalletName(data)),
  
  createAccountNameAsync: data => dispatch(actions.createAccountNameAsync(data)),
  deploy: data => dispatch(actions.deploy(data)),
  editorChange: data => dispatch(actions.editorChange(data)),
  editFileContents:  data => dispatch(actions.editFileContents(data)),
  genKeys: data => dispatch(actions.genKeys()),
  projectFilesystemChange: data => dispatch(actions.projectFilesystemChange(data)),
  inputAction: (action, value, data) => dispatch(actions.inputAction(action, value, data)),
  isActionDeployed: data => dispatch(actions.isActionDeployed(data)),
  logConsoleOutput: data => dispatch(actions.logConsoleOutput(data)),
  newFile: data => dispatch(actions.newFile(data)),
  newFileAsync: data => dispatch(actions.newFileAsync(data)),
  openFile: data => dispatch(actions.openFile(data)),
  openDirectory: data => dispatch(actions.openDirectory(data)),
  openWalletAsync: data => dispatch(actions.openWalletAsync(data)),
  populateWalletList: data => dispatch(actions.populateWalletList(data)),
  saveFile: data => dispatch(actions.saveFile(data)),
  saveFileAsync: data => dispatch(actions.saveFileAsync(data)),
  newDirectoryAsync: data => dispatch(actions.newDirectoryAsync(data)),
  newDirectory: data => dispatch(actions.newDirectory(data)),
  newContractAsync: data => dispatch(actions.newContractAsync(data)),
  newContract: data => dispatch(actions.newContract(data)),
  setActiveWallet: data => dispatch(actions.setActiveWallet(data)),
  setWalletStatus: data => dispatch(actions.setWalletStatus(data)),
  showAndPopulateSelectWalletModal: () => dispatch(actions.showAndPopulateSelectWalletModal()),
  showConfigureNetworkModal: () => dispatch(actions.showConfigureNetworkModal()),
  showCreateAccountModal: () => dispatch(actions.showCreateAccountModal()),
  showConnectAccountModal: () => dispatch(actions.showConnectAccountModal()),
  showErrorModal: data => dispatch(actions.showErrorModal(data)),
  showSelectWalletModal: () => dispatch(actions.showSelectWalletModal()),
  testAction: data => dispatch(actions.testAction(data)),
  updateState: data => dispatch(actions.updateState(data))
});

class App extends Component {
  constructor(props) {
    super(props);

    this.clickQuit = this.clickQuit.bind(this);
    this.clickTab = this.clickTab.bind(this);

    const that = this;

    ipcRenderer.on('newDirectory', () => {
      const title = 'New Directory';
      const buttonLabel = 'Create Directory';
      const nameFieldLabel = 'Directory'; // OSX only
      dialog.showSaveDialog({ title, buttonLabel, nameFieldLabel }, (arg) => {
        if (arg) {
          that.props.newDirectoryAsync(arg);
        } else {
          // TODO: Do something…
        }
      });
    });

    ipcRenderer.on('newContract', () => {
      const title = 'New Contract';
      const buttonLabel = 'Create Contract';
      const nameFieldLabel = 'Contract';
      dialog.showSaveDialog({ title, buttonLabel, nameFieldLabel }, (arg) => {
        if (arg) {
          that.props.newContractAsync(arg);
          // let fileName = arg.split('/').slice(-1) + '.cpp'
          // console.log("OPen nEW CXONTRACT: ", arg+fileName)
          // that.props.openFile(arg+'/'+fileName)
        } else {
          // TODO: Do something…
        }
      });

    });

    ipcRenderer.on('newFile', () => {
      // TODO put showOpenDialog in Main Process, pass path to App as string
      const title = 'New File';
      const buttonLabel = 'Create File';
      dialog.showSaveDialog({ title, buttonLabel }, (arg) => {
        if (arg) {
          that.props.newFileAsync(arg);
        }
      });
    });

    ipcRenderer.on('openDirectory', (event) => {
      const title = 'Open Directory';
      const buttonLabel = 'Open Directory';
      dialog.showOpenDialog({ title, buttonLabel, properties: ['openDirectory'] }, (arg) => {
        if (arg) {
          console.log(arg[0]);
          that.props.openDirectory(arg[0]);
        }
      });
    });

    ipcRenderer.on('openFile', () => {
      // TODO put showOpenDialog in Main Process, pass path to App as string
      const title = 'Open File';
      const buttonLabel = 'Open File';
      dialog.showOpenDialog({ title, buttonLabel }, (arg) => {
        if (arg) that.props.openFile(arg[0]);
      });
    });

    ipcRenderer.on('saveAs', () => {
      const title = 'Save As';
      dialog.showSaveDialog({ title }, (arg) => {
        if (arg) {
          that.props.saveFileAsync(arg);
        }
      });
    });

    ipcRenderer.on('saveFile', () => {
      if (that.props.store.getState().currFilePath !== '') {
        const path = that.props.store.getState().currFilePath;
        console.log("save path: ", path)
        that.props.saveFileAsync(path);
      } else {
        const title = 'Save';
        dialog.showSaveDialog({ title }, (arg) => {
          if (arg) {
            that.props.saveFileAsync(arg);
          }
        });
      }
    });

    ipcRenderer.on('build', () => {
      renderHelpers.build(that.props.currFilePath);
    });

    ipcRenderer.on('unlockAndDeploy', () => {
      // if (path === '' || path === undefined) {
      //   dialog.showOpenDialog(arg => {
      //     if (arg) path = arg;
      //   });
      // } else {
      //   path = path
      //     .split('/')
      //     .slice(0, -1)
      //     .join('/');
      // }
      renderHelpers.unlockAndDeploy(that.props.currFilePath, that.props.activeWallet);
    });

    ipcRenderer.on('consoleOutput', (event, data) => {
      that.props.logConsoleOutput(data);
    });

    ipcRenderer.on('setWalletStatus', (event, data) => {
      that.props.setWalletStatus(data);
    });

    ipcRenderer.on('lockWallet', () => {
      ipcRenderer.send('lockNamedWallet', that.props.activeWallet);
    });

    ipcRenderer.on('unlockWallet', () => {
      ipcRenderer.send('unlockNamedWallet', that.props.activeWallet);
    });

    ipcRenderer.on('showCreateAccountModal', () => {
      that.props.showCreateAccountModal();
    });
    ipcRenderer.on('showConnectAccountModal', () => {
      that.props.showConnectAccountModal();
    });

    ipcRenderer.on('showConfigureNetworkModal', () => {
      that.props.showConfigureNetworkModal();
    });
    // ipcRenderer.on('showSelectWalletModal', (event) => {
    //   console.log('receiving showSelectWalletModal');
    //   that.props.showSelectWalletModal();
    // });

    ipcRenderer.on('showAndPopulateSelectWalletModal', () => {
      that.props.showAndPopulateSelectWalletModal();
    });

    ipcRenderer.on('populateWalletList', (event, data) => {
      that.props.populateWalletList(data);
    });

    ipcRenderer.on('setActiveWallet', (event, data) => {
      that.props.setActiveWallet(data);
    });
  } // end App constructor

  // openDirectory = () => {
  //   console.log('openDirectory');
  //   // ipcRenderer.send("request-open-directory", "please!");
  //   // this.props.addFile(fshelpers.newFile());
  // };
  clickTab(path) {

      this.props.saveFileAsync(this.props.currFilePath);
      this.props.openFile(path);

  }

  clickQuit(path) {
    const openedF = this.props.openedFiles;
    const pathIndex = openedF.indexOf(path);

    const promise = new Promise((resolve) => {
      this.props.closeFile(path);
      resolve();
    });
    promise.then(() => {
      if (this.props.openedFiles.length === 0) {
        this.props.clearWorkspace();
      } else if (this.props.openedFiles.length > 0 && pathIndex === 0) {
        this.props.openFile(this.props.openedFiles[0]);
      } else if (this.props.openedFiles.length === pathIndex) {
        this.props.openFile(this.props.openedFiles[this.props.openedFiles.length - 1]);
      } else {
        this.props.openFile(this.props.openedFiles[pathIndex]);
      }
    });
  }

  render() {
    return (
      <Fabric>
        <SplitPane
          split="vertical"
          minSize={165}
          defaultSize={Ratio(0.2)}
          style={{ position: 'relative' }}
        >
          <div className="Explorer">
            <CommandBar
              activeWallet={this.props.activeWallet}
              currFilePath={this.props.currFilePath}
              deploy={this.props.deploy}
            />
            <FileExplorer
              openFile={this.props.openFile}
              projectRoot={this.props.projectRoot}
              projectFilesystemChange={this.props.projectFilesystemChange}
            />
          </div>
          <SplitPane split="horizontal" defaultSize={Ratio(0.7)} style={{ position: 'relative' }}>
          <SplitPane
          split="vertical"
          minSize={165}
          defaultSize={Ratio(0.8)}
          style={{ position: 'relative' }}>

            <div className="Editor">
              <Tabs
                currFilePath={this.props.currFilePath}
                clickQuit={this.clickQuit}
                clickTab={this.clickTab}
                openedFiles={this.props.openedFiles}
                networks={this.props.networks}
                mainNet={this.props.mainNet}
                updateState={this.props.updateState}
                scatterNet={this.props.scatterNet}
              />
              <CodeEditor code={this.props.code}
                          editorChange={this.props.editorChange}
                          editFileContents={this.props.editFileContents} 
                          currFilePath={this.props.currFilePath} />
            </div>
            <div className="Actions">
              <Actions contracts={this.props.contracts} currContract={this.props.currContract} 
                       testAction={this.props.testAction} changeMode={this.props.changeMode}
                       actions={this.props.actions} mainNet={this.props.mainNet}
                       inputAction={this.props.inputAction}/>
            </div>
            </SplitPane>

            <div className="Terminal">
              <Output messages={this.props.messages} />
            </div>
        
          </SplitPane>
        </SplitPane>
        <CreateAccountModal
          createAccountModalHidden={this.props.createAccountModalHidden}
          closeCreateAccountModal={this.props.closeCreateAccountModal}
          createAccountNameAsync={this.props.createAccountNameAsync}
          currContract={this.props.currContract}
          updateState={this.props.updateState}
          keys={this.props.keys}
          genKeys={this.props.genKeys}
        />
        <ConnectAccountModal
          connectAccountModalHidden={this.props.connectAccountModalHidden}
          showConnectAccountModal={this.props.showConnectAccountModal}
          configureNetwork={this.props.configureNetwork}
          networks={this.props.networks}
          connectAccount={this.props.connectAccount}
          mainNet={this.props.mainNet}
          createAccountNameAsync={this.props.createAccountNameAsync}
          currContract={this.props.currContract}
          updateState={this.props.updateState}
          keys={this.props.keys}
        />
        <ConfigureNetworkModal
          configureNetwork={this.props.configureNetwork}
          showConfigureNetworkModal={this.props.showConfigureNetworkModal}
          configureNetworkModalHidden={this.props.configureNetworkModalHidden}
          networks={this.props.networks}
        />
        <SelectWalletModal
          selectWalletModalHidden={this.props.selectWalletModalHidden}
          closeSelectWalletModal={this.props.closeSelectWalletModal}
          openWalletAsync={this.props.openWalletAsync}
          wallets={this.props.wallets}
        />
        <ErrorModal
          error={this.props.error}
          showErrorModal={this.props.showErrorModal}
        />
        <StatusBar account={this.props.account}/>
      </Fabric>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
