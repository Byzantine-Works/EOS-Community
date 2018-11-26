import WorkspaceDirectory from './WorkspaceDirectory';

export default class State {
  constructor() {
    // files which have been modified but not persisted to the filesystem
    this.dirtyFiles = [];

    // files currently 'open' (visible in the tab bar above File Editor)
    this.openedFiles = [];

    // the currently 'selected' file, displayed in the File Editor
    this.selectedFile = null;

    // flag for locked/unlocked status of active wallet
    this.activeWalletStatusIsLocked = true;

    // current state of the editor. updates on character entry or removal.
    this.data = '// welcome to iDeos';

    // filepath of the file currently opened in the nter to testnet or mainnet
    
    this.currFilePath = '';

    // log messages sent from eosio or file system commands. sent from the main process
    this.messages = [];

    // list of wallets found on the system:
    this.wallets = [];

    // a user can have multiple wallets - we set activeWallet to 'default on initialization'
    this.activeWallet = 'default';

    // visible state of modals
    this.createAccountModalHidden = true;
    this.selectWalletModalHidden = true;

    this.projectRoot = '';

    //List the different contracts in the workspace
    this.contracts = {};

    //Track testnet or mainnet mode
    this.mainNet = false;

    //eos object with Scatter identity injection
    this.scatterNet = false;

    //Store keys temporarily
    this.keys = {owner: {private: null, public:null}, active :{private: null, public:null}};

    //Proxy network
    this.networks = {test: {
                              keyProvider: '5JrgcGV3md4gnWg8WxPqPtTtTpXnwJJr597bvMdMwtSUTteVtj5',// private key
                              httpEndpoint: 'https://cors-anywhere.herokuapp.com/http://13.52.54.111:8888',
                              chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
                            },
                     main: {
                              blockchain:'eos',
                              protocol:'https',
                              host:'proxy.eosnode.tools',
                              port:443,
                              chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
                          }                        
                     }
  
    this.net =  {
      keyProvider: '5JrgcGV3md4gnWg8WxPqPtTtTpXnwJJr597bvMdMwtSUTteVtj5',// private key
      httpEndpoint: 'https://cors-anywhere.herokuapp.com/http://13.52.54.111:8888',
      chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
    }
    
    
    this.connectAccountModalHidden = true;

    this.configureNetworkModalHidden = true;


    // this.projectRoot = new WorkspaceDirectory('./', false);
    // this.projectRoot = new WorkspaceDirectory(
    //   '/Users/legate/Documents/Code Repos/5. Temporary/Application Support/Sample iDeos Project',
    //   false,
    // );

    // this.projectRoot = new WorkspaceDirectory('/Users/victor.faucon/Codesmith/Ideos/Blockchain-IDE/helloWorld', false);
    // this.projectRoot = new WorkspaceDirectory('/home/stefan/Blockchain-IDE/helloWorld', false);
    // this.projectRoot = new WorkspaceDirectory('d:/hacking/Blockchain-IDE/test/hello_world', false);
    // this.projectRoot = new WorkspaceDirectory(
    //   '/Users/legate/Documents/Code Repos/5. Temporary/IDEOS Demo Project',
    //   false,
    //   '/Users/victor.faucon/Codesmith/Ideos/Blockchain-IDE/hello', false
    // );
  }
}
