import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";


const ContractBill = props => {
    let entries = props.csvData.map(action => {
        if(action.action === "Deployment" || action.action === "Total" || action.action === "Total runtime cost" || action.action === "Total EOS") return null;
        else return <span key={action.action} style={{display:"inline-block", width: "100%", textAlign: "right", marginTop: "15px"}}>{action.action}: {((action.cpu*props.cpuRate)+(action.net*props.netRate)+(action.ram*props.ramPrice)).toFixed(4)} EOS</span>
    })
    let runTimeA = props.csvData.map(action => {
        if(action.action === "Deployment" || action.action === "Total" || action.action === "Total runtime cost" || action.action === "Total EOS") return null;
        else return Number(action.total_EOS);
    });
    console.log(runTimeA);
    let totalRun= runTimeA.reduce((a, b) => {
        a = a + b;
        return a;
    })



    return (
        <div className="ContractBill">
            {entries}
            <div style={{display:"inline-block", left:"5%", width: "100%", marginTop: "20px", marginBottom: "20px", height:"0px", border:"solid white 1px",borderLeft: 'none', borderRight: 'none'}}></div>
            Total runtime cost: {totalRun.toFixed(4)} EOS

            <div style={{display:"inline-block", left:"5%", width: "100%", marginTop: "20px", marginBottom: "20px", height:"0px", border:"solid white 1px",borderLeft: 'none', borderRight: 'none'}}></div>            
            Design cost: {(props.totalDeployment).toFixed(4)} EOS
            
            <div style={{display:"inline-block", left:"5%", width: "100%", marginTop: "20px", marginBottom: "20px", height:"0px", border:"solid white 1px",borderLeft: 'none', borderRight: 'none'}}></div>            
            Total cost: {(totalRun+props.totalDeployment).toFixed(4)} EOS
            
            {props.csvData ? <CSVLink data={props.csvData} target="_blank" ><div className="LinkContainer">Download csv</div></CSVLink> : null} 

        </div>
    )

}

export default ContractBill;
