import React from 'react';


const ContractBill = props => {
    let actionsPrice = [];
    let cpu = [];
    let net = [];
    for(let action in props.bill){
        cpu.push(props.bill[action].net);
        net.push(props.bill[action].cpu);
        actionsPrice.push(<div className="actionPrice"><p>{action.toString()}<br></br>Net usage: {props.bill[action].net} bytes, CPU usage: {props.bill[action].cpu} us, RAM usage: {props.bill[action].ram} bytes</p></div>);
    }

    return (
        <div className="ContractBillContainer">
        {props.bill ? 
            actionsPrice : 
            null}
        </div>
    )

}

export default ContractBill;
