import React from 'react';

const component = props => {

  let status = props.walletStatus ? 'locked' : 'unlocked';

  return (
    <div id="statusbar">
      <div id="showWallets">
        {props.account}
      </div>
    
       

    </div>
  )
}

export default component;
