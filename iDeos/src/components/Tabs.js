import React from 'react';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
ScatterJS.plugins( new ScatterEOS() );
// import renderHelpers from './../utils/renderHelpers';

// const _new = () => {
//   console.log('new!');
// };

// const _upload = () => {
//   console.log('upload!');
// };

const component = (props) => {
  const items = [];
  const files = props.openedFiles;

  files.forEach((path, index) => {
    let rendClass;
    if (path === props.currFilePath) rendClass = 'displayedFile';
    else rendClass = 'openedFile';
    items.push(<span key={index}>
      <button className={rendClass} onClick={() => props.clickTab(path)}>
        {path
            .split('/')
            .slice(-1)
            .join('')}
      </button>
      <button
        className="quit"
        onClick={() => {
            props.clickQuit(path);
            // props.open(files[index])
          }}
      >
          x
      </button>
    </span>);
  });

  const onclick = async () => {

    let network  = props.networks.main;
    console.log(network);



    const scatter = ScatterJS.scatter;
    //let network = {httpEndpoint: 'https://proxy.eosnode.tools:443', chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' }
    const connected = await scatter.connect("iDeos");

    if(connected) {
      const requiredFields = { accounts:[network] };
      let id = await scatter.getIdentity(requiredFields);
      console.log(id);
      const account = id.accounts.find(x => x.blockchain === 'eos');
      props.updateState(["mainAccount", account.name])
      console.log("account: ", account);
      console.log("scatter: ", scatter);

      // You can pass in any additional options you want into the eosjs reference.
      const eosOptions = { expireInSeconds:60 };

      // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
      const eos = scatter.eos(network, Eos, eosOptions);
      props.updateState(["scatterNet", eos]);
    }

  }



  return (
  <div className="NavBar">{items}<button className="Scatter" onClick={onclick}>{props.scatterNet ? <p>&#10004;</p> : null}Pair with scatter</button></div>
  )
};

export default component;
