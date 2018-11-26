import React, { Component } from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
const fs = window.require('fs');
const os = window.require('os');
const lodash = window.require('lodash');

/* https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/Dialog/examples/Dialog.Basic.Example.tsx */

class ConnectAccountModal extends Component {
  constructor(props) {
    super(props);
    this.checked = false;
    this.account = false;
    this.onchange = this.onchange.bind(this);
    this.onsend = this.onsend.bind(this);
  }

  onchange(e) {
    this.account = e.target.children[0].children[0].textContent;

  }

  onsend() {
    let a = this.account ? this.account : document.getElementById('account-name').value;
    let listDir = fs.readdirSync(os.homedir())
    if(this.checked && listDir.includes("eosio_accounts")){
      a = this.account;
      let accounts = JSON.parse(fs.readFileSync(os.homedir()+'/eosio_accounts/accounts.json'));
      let keys = lodash.find(accounts, ["name", a]);
      if(this.props.mainNet) {
        let mainNet = {keyProvider: keys.active.private, httpEndpoint: this.props.networks.main.httpEndpoint, chainId:this.props.networks.main.chainId};
        this.props.configureNetwork(this.props.networks.test, mainNet);
      } else {
        let testNet = {keyProvider: keys.active.private, httpEndpoint: this.props.networks.test.httpEndpoint, chainId: this.props.networks.test.chainId};
        this.props.configureNetwork(testNet, this.props.networks.main);

      }

      console.log(keys);

    }

    
      console.log(a);
      this.props.connectAccount(document.getElementById('privateKey').value, a)
      this.props.showConnectAccountModal();

  }



  render() {
    let accounts;
    let listDir = fs.readdirSync(os.homedir())
    if(!listDir.includes("eosio_accounts")) {
      accounts = [{key: 'ideos', text: 'ideos'}]
    } else {
      accounts = JSON.parse(fs.readFileSync(os.homedir()+'/eosio_accounts/accounts.json')).map(el => {
      return {key: el.name, text: el.name };
    });
  }


    return (
      <div>
        <Dialog
          id="connect-account-modal"
          hidden={this.props.connectAccountModalHidden}
          onDismiss={this.props.closeConnectAccountModal}
          minWidth="300px"
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Connect to an account',
            subText: 'Please enter the name of your account',
          }}
          modalProps={{
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride',
          }}
        >
          <div className="docs-TextFieldExample">
          Choose an account created externally:
            <TextField id="account-name" label="Account Name" />

            <TextField id="privateKey" label="Active Private Key" />
          Choose an account already created with iDeos:
            <Dropdown placeHolder="Select a Account"
                      label="Select a Account"
                      id="wallet-dropdown"
                      onFocus={this.onchange}
                      ariaLabel="wallet-dropdown"
                      options={accounts}/><br/>
            Set this account as key provider: <input id="keyProvider" type="checkbox" onChange={()=>{
              this.checked = !this.checked;
              console.log(!this.checked)
            }}></input>
          </div>
          <DialogFooter>
            <PrimaryButton
              onClick={this.onsend}
              text="Connect"
            />
            <DefaultButton onClick={this.props.showConnectAccountModal} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

export default ConnectAccountModal;
