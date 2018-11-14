import React, { Component } from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import Dropdown from './WalletsDropDown';

/* https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/Dialog/examples/Dialog.Basic.Example.tsx */

class ErrorModal extends Component {
  constructor(props) {
    super(props);
    this.errors;
  }

  render() {
    return (
      <div>
        <Dialog
          id="errorBox"
          hidden={this.props.error}
          onDismiss={this.props.showErrorModal}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Select a Wallet',
            subText: 'select your active wallet',
          }}
          modalProps={{
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride',
          }}
        >
          <div className="docs-TextFieldExample">
            {/* show list of wallets here */}
            {/* <TextField id="wallet-name" label="Wallet Name" /> */}
            <Dropdown wallets={this.props.wallets} openWallet={this.props.openWalletAsync} />
          </div>
          <DialogFooter>
            <PrimaryButton
              text="open wallet"
              onClick={() => this.props.openWalletAsync(document.getElementById('wallet-dropdown-option').getAttribute('aria-label'))} />
            <DefaultButton onClick={this.props.closeErrorModal} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

export default ErrorModal;
