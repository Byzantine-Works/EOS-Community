import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";


const ContractBill = props => {
    console.log("DRam and ramPrice", props.deploymentRam, props.ramPrice)
    let entries = props.csvData.map(action => {
        console.log(action);
        if(action.action === "Deployment" || action.action === "Total" || action.action === "Total Resources EOS" || action.action === "Total EOS") return null;
        else return <span key={action.action} style={{display:"inline-block", width: "100%", float: "left", marginTop: "15px"}}>{action.action}: {((action.cpu*props.cpuRate)+(action.net*props.netRate)+(action.ram*props.ramPrice)).toFixed(4)} EOS</span>
    })

    return (
        <div className="ContractBill">
            {entries}
            <div style={{display:"inline-block", left:"5%", width: "90%", marginTop: "20px", marginBottom: "20px", height:"0px", border:"solid white 1px"}}></div>
            Deployment cost:  {(props.deploymentRam*props.ramPrice).toFixed(4)} EOS
            {props.csvData ? <CSVLink data={props.csvData} target="_blank" ><div className="LinkContainer">Download csv</div></CSVLink> : null} 
        </div>
    )

}

export default ContractBill;
