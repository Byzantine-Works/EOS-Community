import React from 'react';
import Switch from "react-switch";
import lodash from 'lodash';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import Terminal from 'terminal-in-react';

const Actions = props => {
  console.log(props.actions)
  // const toggle= (e) => {
  //   props.isActionDeployed(e.target.id);
  // }

  const change = (e, action, data) => {
    props.inputAction(action, e.target.id, data);
    
  }
  const testA = (e) => {
    console.log(e.target.id);
    props.testAction(e.target.id);
  }

  const buffer = (str) => {
    var myBuffer = [];
    var buffer = new Buffer(str, 'utf16le');
    for (var i = 0; i < buffer.length; i++) {
      myBuffer.push(buffer[i]);
    }
    return myBuffer;
  }

let int = ["int8", "uint8", "int16", "uint16", "int32", "uint32", "int64", "uint64", "int128", "uint128", "varuint32", "varint32", "float32", "float64", "float128", "weight_type", "block_id_type"];

  let abi;
  try {
      abi = props.contracts[props.currContract] !== undefined && props.contracts[props.currContract].abi !== undefined ? JSON.parse(props.contracts[props.currContract].abi) : null;
  } catch(error) {
    // props.updateState(["errorMessage", "abiCorrupted"])
  }

  const actions = props.actions !== undefined ? abi.actions.map(el => {
    let field = lodash.find(abi.structs, ["name", el.name])
    return <ul className="ActionItem" key={'Drop'+el.name} width="100%"><div className="ActionCont"><h5 id={el.name}>{el.name}</h5><button className="TestButton" id={el.name} onClick={(e)=> {return testA(e)}}>test</button>
        <div>
          {field.fields.map(val =>{
            return <ul>{val.name+" ("+val.type+"): "}<input className="InputValue" id={val.name} onChange={(e)=>{
              let data;
              if(int.includes(val.type)) data = Number(e.target.value);
              else if(val.type === 'bool') {
                if(e.target.value === 'true' || e.target.value === '1' ) data = true;
                else if(e.target.value === 'false' || e.target.value === '0' ) data = false;
              }
              else if(val.type === 'bytes') data = buffer(e.target.value);
              else data = e.target.value;
              
              return change(e, el.name, data)}}></input></ul>
          })}
        </div>
        </div>
    </ul>
        
  }) : null;

  return (
    <div id="actions">
      <div className="actionsBar">
      <span style={{position:'fixed', width:'100%', zIndex:'1'}}>{props.mainNet ? <div className="MainNet">Main net</div> : <div className="TestNet">Test net</div>}</span>
      <label id="switch" htmlFor="material-switch" style={{position:'fixed', zIndex:'100'}}>
        <Switch
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              checked={props.mainNet}
              onChange={props.changeMode}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
              position='fixed'
        />
      </label>
      </div>
      {props.contracts[props.currContract] ? actions : null}
    </div>
  )
}

export default Actions;