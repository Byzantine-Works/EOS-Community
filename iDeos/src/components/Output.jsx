import React from 'react';
// import Terminal from 'terminal-in-react';

const Output = props => {
  let message = [];

  props.messages.forEach((log, idx) => {
    message.unshift(
      <div key={idx}>
        {log}<br/><br/>
      </div>
    );
  });

  return (
    <div className="console">
      {message}
    </div>
  )
}

export default Output;
