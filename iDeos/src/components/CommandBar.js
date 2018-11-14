import React from 'react';
// import { CommandBar, CommandButton } from 'office-ui-fabric-react';
import { CommandBar } from 'office-ui-fabric-react';
import renderHelpers from './../utils/renderHelpers';

const component = (props) => {
  console.log('props', props);
  const items = [
    // {
    //   key: 'build',
    //   name: 'Build',
    //   onClick: () => {
    //     renderHelpers.preBuild();
    //   },
    //   // onRender: this._new.bind(this)
    // },
    {
      key: 'build deploy',
      name: 'Deploy',
      onClick: () => {
        props.deploy();
      },
      // onRender: this._upload.bind(this)
    },
  ];

  return <CommandBar className="CommandBar" items={items} />;
};

export default component;
