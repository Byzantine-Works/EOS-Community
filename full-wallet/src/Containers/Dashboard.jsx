import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Cpu from '../Components/Cpu';
import Net from '../Components/Net';
import Staking from '../Components/Staking';
import Ram from '../Components/Ram';
import ContractBill from '../Components/ContractBill';
import Eos from 'eosjs';
import abi from './exchange.abi.json';
import CpuCost from '../Components/CpuCost.jsx';
import RamCost from '../Components/RamCost.jsx';
import NetCost from '../Components/NetCost.jsx';
import { CSVLink, CSVDownload } from "react-csv";


console.log(abi);
let types = [];
abi.structs.forEach(x => {
    x.fields.forEach( y => {
        if(!types.includes(y.type)) types.push(y.type);
    });
});

console.log(types);


const eos = Eos({
    keyProvider: '5KjDGssHn6aYBs32NwWiGvh2Aa7FbRpu7RGXv9ToNgj8FyS1vyw',// private key
    httpEndpoint: 'https://cors-anywhere.herokuapp.com/http://54.183.9.138:8888',
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'

})



// const eos = Eos({
//     keyProvider: '5HtyHKqr43GQpZhLg3RWhHz59JHQqb1uQzb2QyYwz1nuEieo6QY',// private key
//     httpEndpoint: 'https://cors-anywhere.herokuapp.com/https://api.kylin-testnet.eospacex.com',
//     chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'

// })

const mapStateToProps = store => ({
    account : store.account,
    cpu: store.cpu,
    net: store.net,
    balance: store.balance,
    staking: store.staking,
    ram: store.ram,
    abi: store.abi,
    wasm: store.wasm,
    contractName: store.contractName,
    bill: store.bill,
    contractSize: store.contractSize,
    csvData: store.csvData,
    deploymentRam: store.deploymentRam


})

const mapDispatchToProps = dispatch => ({
    updateState: data => dispatch(actions.updateState(data)),
    loadDataAccount: data => dispatch(actions.loadDataAccount(data)),
    loadABI: data => dispatch(actions.loadABI(data)),
    loadWASM: data => dispatch(actions.loadWASM(data)),
    estimateContract: data => dispatch(actions.estimateContract(data))

});

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        console.log(props)

        this.readFile = this.readFile.bind(this);
        this.pushTransaction = this.pushTransaction.bind(this);
        this.deployContract = this.deployContract.bind(this);
        this.generateCsv = this.generateCsv.bind(this);
    }


    async deployContract(account){
        console.log("in setcontract");
        let wasm = this.props.wasm;
        let abi = this.props.abi;
        let wasmResp = await eos.setcode(account, 0, 0, wasm);
        let ramBefore = await eos.getAccount(account);
        let abiResp = await eos.setabi(account, abi);
        let ramAfter = await eos.getAccount(account);
        this.props.updateState(["deploymentRam", ramAfter.ram_usage-ramBefore.ram_usage]);
        console.log(ramBefore);
        console.log(ramAfter);

        console.log("abiResp:", abiResp);
        console.log("wasm response: ", wasmResp);
        this.generateCsv(account);

    }

    async pushTransaction() {

        var text = "";
        let check = false;
        
        var possible = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 12; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        try {
        let account = await eosLibertyTest.getAccount(text);
        this.pushTransaction()
        
        } catch(error) {
            check = true;
        }
        console.log(text);
        

        let accCreate = await eos.transaction(tr => {
            tr.newaccount({
                creator: 'victor',
                name: text,
                owner: 'EOS7AyWifeevBwdZamViPcboQC8k9nT86q6merJELVGBhq35PU7J6',
                active: 'EOS5vdEYmN5ftnhWGrKyCMHGsSA7zjApx9js3hUFEZzyDZKWMijtK'
                })
                tr.buyrambytes({
                    payer: 'victor',
                    receiver: text,
                    bytes: 500000
                  })
                 
                  tr.delegatebw({
                    from: 'victor',
                    receiver: text,
                    stake_net_quantity: '10.0000 EOS',
                    stake_cpu_quantity: '10.0000 EOS',
                    transfer: 0
                  })
            })
        
        console.log("account create: ", accCreate);
        await this.deployContract(text);

    }

    async generateCsv(account) {
        await this.props.estimateContract(account);
        let data = [{action: 'Deployment', ram: this.props.deploymentRam}]
        var [cpuT, ramT, netT] = [[], [], []];
        ramT.push(this.props.deploymentRam);
        for(let action in this.props.bill) {
            let obj = {};
            obj.action = action;
            
            obj.cpu = this.props.bill[action].cpu;
            cpuT.push(obj.cpu);

            obj.ram = this.props.bill[action].ram;
            ramT.push(obj.ram);
            
            obj.net = this.props.bill[action].net;
            netT.push(obj.net);
            data.push(obj);
        }

        let cT = cpuT.reduce((a, b) => {a = a + b; return a;});
        let rT = ramT.reduce((a, b) => {a = a + b; return a;});
        let nT = netT.reduce((a, b) => {a = a + b; return a;});
        data.push({action: 'Total', cpu: cT, ram: rT, net: nT});

        
        this.props.updateState(["csvData", data]);

    }




    async readFile(e) {
        console.log(e.target.files)
            let filereader = new FileReader();
            let that = this
            let id = e.target.id;
            filereader.onloadend = function(){
                let content = filereader.result;
                if(id === 'abi') that.props.loadABI(content);
                else that.props.loadWASM(content);
            }
            this.props.updateState(["contractName", e.target.files[0].name.split('.')[0]]);
            this.props.updateState(["contractSize", e.target.files[0].size]);
            await filereader.readAsBinaryString(e.target.files[0]);
    }

    render() {
        // var myChart = new Chart(ctx, {...});

        let resources = [
             <span>Staking<Staking staking={this.props.staking}></Staking></span>,
             <span>CPU<Cpu cpu={this.props.cpu} bill={this.props.bill}></Cpu></span>,
             <span>Net<Net net={this.props.net} bill={this.props.bill}></Net></span>,
             <span>Ram<Ram bill={this.props.bill} ram={this.props.ram} contractSize={this.props.contractSize}></Ram></span>
        ]

        let actionsCost = [
                <span><p style={{display:'inline'}}>CPU</p><CpuCost style={{display:'inline'}} cpu={this.props.cpu} bill={this.props.bill} height={100}></CpuCost></span>,
                <span>Net<NetCost net={this.props.net} bill={this.props.bill}></NetCost></span>,
                <span>Ram<RamCost bill={this.props.bill} ram={this.props.ram}></RamCost></span>   
        ]



        return (
            <div className="Dashboard">
                <div className="GraphMonitor">
                    {this.props.account ? <div className="AccountResources"><h4>Account resources</h4>{resources}</div> : null}
                    {this.props.bill ? <div className="ActionsCost"><h4>Actions cost</h4>{actionsCost}</div>  : null}
                </div>
                <span className="Params">
                    <p>Account name</p><input id="account" onChange={this.props.loadDataAccount}></input><br></br>
                    <input id="abi" type="file" placeholder="abi" onChange={this.readFile}></input><br></br>
                    <input id="wasm" type="file" placeholder="wasm" onChange={this.readFile}></input>
                {this.props.abi && this.props.wasm ? <button id="estimate" onClick={this.pushTransaction}>Estimate</button> : null}
                </span>
                {/* <button onClick={this.deployContract}>Deploy contract</button>
                <button onClick={this.pushTransaction}>Push</button> */}

                {this.props.csvData ? <CSVDownload data={this.props.csvData} target="_blank" >Download Bill</CSVDownload> : null}
                {/* <ContractBill bill={this.props.bill} abi={this.props.abi}></ContractBill> */}
            </div>

        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard);