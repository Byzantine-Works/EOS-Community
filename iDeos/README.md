# iDeos
iDeos is a fully integrated IDE to create, edit, test and deploy smart contracts on the EOS blockchain. It comes with a prepackaged access to a remote Byzanti.ne testnet and allows custom configuration to local testnet if needed. Additionally, one can interact with mainnet with iDeos.  It is implemented using electron and communicates with remote/local testnet/mainnet alleviating the need to run eosio chain locally.

- Install Dependencies
```sh
npm install
```

- Run development mode
```sh
npm run electron-dev
```

- Build the electron app
```sh
npm run electron-pack
```
This will build the electron app to an exec file and can take about an hour.


# Documentation

## Open a contract:
Add a contract directory to the workspace through **Files > Open Directory**. If the .abi file is here and not corrupted you should see all the actions of the contract being shown on the right pan.

## Create an account on the test net:
You have the possibility to create accounts on the testnet with **Tools > Create an Account**. The default account is **ideos** from which you can create accounts to deploy your contracts. There can not be more than one deployed contract per account.

## Connection to a test net Account:
To execute properly your actions you may need to set your contract account as a key provider with **Tools > Connect to an Account**. The accounts that you already created with iDeos are stored locally, and displayed in the dropdown of the dialog box.

## Connection to a main net Account:
You cannot create accounts on main net but you can pair with your existing account through scatter to set it as a key provider. This should be used to deploy and test contracts on the main net. Be careful, any actions on main net mode may cost you resources and EOS.  

## Deploy a contract:
If a contract directory with a valid .wasm and .abi files is opened, an account has been created and set as a key provider, you can then deploy your contract on the chain through **Deploy** in the command bar or **Tools > Deploy Contract**. If the operation is successful, the output is displayed in the console with broadcast set to **true**.

## Test Actions:
After Deployment the contract is now ready to be tested. Fill the actions arguments inputs properly, click on test and check the output in the console. 

## Editing a Contract:
Use the development environment to edit the files of your contracts, save them and and reopen them on the next utilisation.

## Building:
This feature is still in development. In the meantime you can use Emscripten to compile your C++ code to WebAssembly. Instructions of installation : https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html. 

 

iDeos can be deployed on any platform and requires Node 8.12.0 or later to run properly.




