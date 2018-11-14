import React, { Component } from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

/* https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/Dialog/examples/Dialog.Basic.Example.tsx */

class ConfigureNetworkModal extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <Dialog
          id="configure-network-modal"
          hidden={this.props.configureNetworkModalHidden}
          onDismiss={this.props.closeConnectAccountModal}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Configure the proxy networks',
          }}
          modalProps={{
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride',
          }}
        >
        Test Net:
          <div className="docs-TextFieldExample">
            <TextField id="ThttpEndpoint" label="HTTP Endpoint" value={this.props.networks.test.httpEndpoint}/>
            <TextField id="TprivateKey" label="Key Provider" value={this.props.networks.test.keyProvider}/>
            <TextField id="TchainId" label="Chain ID" value={this.props.networks.test.chainId}/>
          </div>

          Main Net:
          <div className="docs-TextFieldExample">
            <TextField id="MhttpEndpoint" label="HTTP Endpoint" value={this.props.networks.main.protocol+'://'+this.props.networks.main.host+":"+this.props.networks.main.port}/>
            <TextField id="MchainId" label="Chain ID" value={this.props.networks.main.chainId}/>
          </div>

          <DialogFooter>
            <PrimaryButton
              onClick={() => {
                let test = {}
                let main = {}
                test.httpEndpoint = document.getElementById('ThttpEndpoint').value;
                test.keyProvider = document.getElementById('TprivateKey').value;
                test.chainID = document.getElementById('TchainId').value;
                
                let url = document.getElementById('MhttpEndpoint').value;
                main.protocol = url.split('://')[0];
                main.port = url.split(':').pop();
                main.host = url.split(':')[1].slice(2);
                main.chainId = document.getElementById('MchainId').value;
                main.blockchain = 'eos'
                console.log("main: ", main)

                this.props.configureNetwork(test, main);
                this.props.showConfigureNetworkModal();
              }
            }
              text="Connect"
            />
            <DefaultButton onClick={this.props.showConfigureNetworkModal} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

export default ConfigureNetworkModal;
