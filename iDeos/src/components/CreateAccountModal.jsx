import React, { Component } from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

/* https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/Dialog/examples/Dialog.Basic.Example.tsx */

class CreateAccountModal extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div>
        <Dialog
          id="create-account-modal"
          hidden={this.props.createAccountModalHidden}
          onDismiss={this.props.closeCreateAccountModal}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Create an account',
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
            <TextField id="account-name" label="Account Name" />
            Owner:
            <TextField id="OPublic Key" label="Public Key" value={this.props.keys.owner.public} />
            <TextField id="OPrivate Key" label="Private Key" value={this.props.keys.owner.private} />

            Active:
            <TextField id="APublic Key" label="Public Key" value={this.props.keys.active.public} />
            <TextField id="APrivate Key" label="Private Key" value={this.props.keys.active.private} />


          </div>
          <DialogFooter>
          <PrimaryButton
              onClick={this.props.genKeys}
              text="Generate Keys"
            />
            <PrimaryButton
              onClick={() =>
                this.props.createAccountNameAsync([document.getElementById('account-name').value,
                                                   document.getElementById('OPublic Key').value,
                                                   document.getElementById('OPrivate Key').value,
                                                   document.getElementById('APublic Key').value,
                                                   document.getElementById('APrivate Key').value,
                                                   ])
              }
              text="Create Account"
            />
            <DefaultButton onClick={this.props.closeCreateAccountModal} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

export default CreateAccountModal;
