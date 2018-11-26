import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import lodash from 'lodash';


const ContractBill = props => {
    let entries = props.csvData.map(action => {
        if (action.action === "Total design cost" || action.action === "Overall cost (EOS)" || action.action === "EOS Equivalent" || action.action === "Total runtime cost")  return null;
        else return <span key={action.action} style={{display:"inline-block", width: "100%", textAlign: "right", marginTop: "15px"}}>{action.action}: {((action.cpu_us*props.cpuRate)+(action.net_bytes*props.netRate)+(action.ram_bytes*props.ramPrice)).toFixed(4)} EOS</span>
    })
    let runTimeA = props.csvData.map(action => {
        if (action.action === "Total design cost" || action.action === "Overall cost (EOS)" || action.action === "EOS Equivalent" || action.action === "Total runtime cost")  return null;
        else return Number(action.total_EOS);
    });
    console.log(runTimeA);
    let totalRun= runTimeA.reduce((a, b) => {
        a = a + b;
        return a;
    });

    let totalRT = lodash.find(props.csvData, ["action", "Total runtime cost"]);

    let sucActions = props.csvData.map(el=>{return el.action});

    props.abi.actions.forEach(el => {
        if(!sucActions.includes(el.name)) entries.push(<span key={el.name} style={{display:"inline-block", width: "100%", textAlign: "right", marginTop: "15px"}}>{el.name}: N/A</span>)

    })
    



    return (
        <div className="ContractBill">
            {entries}<br/>

            <div className="RTContainer">
                <ul>CPU: {(totalRT.cpu*props.cpuRate).toFixed(4)} EOS</ul>
                <ul>NET: {(totalRT.net*props.netRate).toFixed(4)} EOS</ul>
                <ul>RAM: {(totalRT.ram*props.ramPrice).toFixed(4)} EOS</ul>
            </div>
            
            <div style={{display:"inline-block", left:"5%", width: "100%", marginTop: "20px", marginBottom: "20px", height:"0px", border:"solid white 1px",borderLeft: 'none', borderRight: 'none'}}></div>
            Total Runtime cost: {totalRun.toFixed(4)} EOS

            <div style={{display:"inline-block", left:"5%", width: "100%", marginTop: "20px", marginBottom: "20px", height:"0px", border:"solid white 1px",borderLeft: 'none', borderRight: 'none'}}></div>            
            Total Design cost: {(props.totalDeployment).toFixed(4)} EOS
            
            <div style={{display:"inline-block", left:"5%", width: "100%", marginTop: "20px", marginBottom: "20px", height:"0px", border:"solid white 1px",borderLeft: 'none', borderRight: 'none'}}></div>            
            Overall cost: {(totalRun+props.totalDeployment).toFixed(4)} EOS
            
            {props.csvData ? <CSVLink data={props.csvData} target="_blank" ><div className="LinkContainer">Download csv</div></CSVLink> : null} 

        </div>
    )

}

export default ContractBill;
