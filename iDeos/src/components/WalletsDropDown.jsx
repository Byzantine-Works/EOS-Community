import React, { Component } from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export class WalletsDropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selectedItems: []
    };
  }

  render() {
    const { selectedItem, selectedItems } = this.state;

    const wallets = this.props.wallets.map(w => {
      return { key: w, text: w };
    });

    return (
      <div className="wallets-Dropdown">
        <Dropdown
          placeHolder="Select a wallet"
          label="Select a Wallet"
          id="wallet-dropdown"
          ariaLabel="wallet-dropdown"
          options={wallets}
        />
      </div>
    )
  }
}

export default WalletsDropdown;
