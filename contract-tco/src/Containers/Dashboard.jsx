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
import Message from '../Components/Message.jsx';
import { css } from 'react-emotion';
import Typed from 'react-typed';
import CircularProgressbar from 'react-circular-progressbar';
require('dotenv').config();


console.log(abi);
let types = [];
abi.structs.forEach(x => {
    x.fields.forEach(y => {
        if (!types.includes(y.type)) types.push(y.type);
    });
});

console.log(types);



const eos = Eos({
    keyProvider: process.env.KEY_PROVIDER,// private key
    httpEndpoint: process.env.HTTP_ENDPOINT,
    chainId: process.env.CHAIN_ID
})

// const eos = Eos({
//     keyProvider: '5HtyHKqr43GQpZhLg3RWhHz59JHQqb1uQzb2QyYwz1nuEieo6QY',// private key
//     httpEndpoint: 'https://cors-anywhere.herokuapp.com/https://api.kylin-testnet.eospacex.com',
//     chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'

// })

const mapStateToProps = store => ({
    account: store.account,
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
    deploymentRam: store.deploymentRam,
    deploymentNet: store.deploymentNet,
    deploymentCpu: store.deploymentCpu,
    loading: store.loading,
    cpuTotal: store.cpuTotal,
    ramTotal: store.ramTotal,
    netTotal: store.netTotal,
    cpuRate: store.cpuRate,
    netRate: store.netRate,
    ramPrice: store.ramPrice,
    progress: store.progress,
    wasmName: store.wasmName,
    abiName: store.abiName
})

const mapDispatchToProps = dispatch => ({
    updateState: data => dispatch(actions.updateState(data)),
    loadDataAccount: data => dispatch(actions.loadDataAccount(data)),
    loadABI: data => dispatch(actions.loadABI(data)),
    loadWASM: data => dispatch(actions.loadWASM(data)),
    estimateContract: data => dispatch(actions.estimateContract(data)),
    getResourcesPrice: () => dispatch(actions.getResourcesPrice())

});

class Dashboard extends Component {

    constructor(props) {
        super(props);
        console.log(props)

        this.readFile = this.readFile.bind(this);
        this.pushTransaction = this.pushTransaction.bind(this);
        this.deployContract = this.deployContract.bind(this);
        this.generateCsv = this.generateCsv.bind(this);
        this.estimate = this.estimate.bind(this);
        this.conversion = this.conversion.bind(this);
        this.test = this.test.bind(this);
    }

    async test() {
        let table = await eos.getAccount('victorfaucon');
        console.log(table);
    }


    async deployContract(account) {
        console.log("in setcontract");
        this.props.updateState(["progress", 29]);
        let wasm = this.props.wasm;
        let abi = this.props.abi;
        let wasmResp = await eos.setcode(account, 0, 0, wasm);
        this.props.updateState(["progress", 32]);
        let abiResp = await eos.setabi(account, abi);
        this.props.updateState(["progress", 36]);
        await console.log("WASM resp: ", wasmResp);
        await console.log("ABI resp: ", abiResp);
        this.props.updateState(["deploymentRam", this.props.contractSize * 10.045]);
        await this.props.updateState(["deploymentCpu", wasmResp.processed.receipt.cpu_usage_us + abiResp.processed.receipt.cpu_usage_us]);
        await this.props.updateState(["deploymentNet", (wasmResp.processed.receipt.net_usage_words + abiResp.processed.receipt.net_usage_words) * 8]);
        this.props.updateState(["progress", 39]);

    }

    async pushTransaction() {
        let check = false;
        var text = "";

        var possible = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 12; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        try {
            await eosLibertyTest.getAccount(text);
            this.pushTransaction()

        } catch (error) {
            check = true;
        }
        console.log(text);
        this.props.updateState(["progress", 2]);
        console.log("eos: ", eos);

        // let options = {
        //     authorization: 'victor@active',
        //     broadcast: true,
        //     sign: true,
        //   }




        let accCreate = await eos.transaction(tr => {
            tr.newaccount({
                creator: process.env.ACCOUNT,
                name: text,
                owner: process.env.PUB_OWNER,
                active: process.env.PUB_ACTIVE
            })
            // tr.buyrambytes({
            //     payer: 'ideos',
            //     receiver: text,
            //     bytes: 500000
            // })

            // tr.delegatebw({
            //     from: 'ideos',
            //     receiver: text,
            //     stake_net_quantity: '3.0000 EOS',
            //     stake_cpu_quantity: '3.0000 EOS',
            //     transfer: 0
            // })
        });
        console.log(accCreate)
        this.props.updateState(["progress", 5])

        // let ramBefore = await eos.getAccount(text);
        // this.props.updateState(["progress", 8])
        // let respTransac = await eos.transfer({
        //     from: 'victor',
        //     to: text,
        //     quantity: '0.0002 EOS',
        //     memo: 'first transaction'
        // });
        // await console.log("deposit is Dashboard :", respTransac)
        // let ramAfter = await eos.getAccount(text);
        // this.props.updateState(["progress", 12])
        // console.log(respTransac)

        // this.props.updateState(["deposit", { ramBefore: ramBefore, ramAfter: ramAfter, respTransac: respTransac }]);

        // ramBefore = await eos.getAccount(text);
        // this.props.updateState(["progress", 16])

        // // let options = {
        // //     authorization: text+'@active',
        // //   };

        // try {
        //     respTransac = await eos.transfer({
        //         from: text,
        //         to: 'eoseos',
        //         quantity: '0.0001 EOS',
        //         memo: 'first transaction'
        //     });
        //     console.log("respTransac: ", respTransac);

        // } catch (err) {
        //     console.log(JSON.parse(err));
        // }
        // this.props.updateState(["progress", 19])
        // ramAfter = await eos.getAccount(text);
        // this.props.updateState(["progress", 23])
        // console.log("ramAfter: ", ramAfter);


        // this.props.updateState(["withdraw", { ramBefore: ramBefore, ramAfter: ramAfter, respTransac: respTransac }]);


        this.props.getResourcesPrice();
        this.props.updateState(["progress", 25]);

        return text;

    }

    async generateCsv(bill) {
        let data = [{ action: 'Deployment', ram: this.props.deploymentRam }]
        var [cpuT, ramT, netT] = [[], [], []];
        ramT.push(this.props.deploymentRam);
        console.log("in generateCSV: ", this.props.bill);
        for (let action in this.props.bill) {
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

        let cT = cpuT.reduce((a, b) => { a = a + b; return a; });
        let rT = ramT.reduce((a, b) => { a = a + b; return a; });
        let nT = netT.reduce((a, b) => { a = a + b; return a; });
        data.push({ action: 'Total', cpu: cT, ram: rT, net: nT });


        this.props.updateState(["csvData", data]);

    }

    async estimate() {
        if (this.props.wasm && this.props.abi) {
            this.props.updateState(["csvData", false]);
            this.props.updateState(["loading", true]);
            let account = await this.pushTransaction();
            await this.deployContract(account);
            await this.props.estimateContract(account);
        }
    }

    async conversion(e) {
        console.log(e.target)
        let price = this.props.ramPrice ? this.props.ramPrice : await this.props.getRamPrice();
        let result = (val / 1000) * price;
        console.log("result: ", result);
        return result;
    }


    async readFile(e) {
        this.props.updateState(["csvData", false]);
        this.props.updateState(["loading", false]);
        this.props.updateState(["progress", false]);
        if(this.props.csvData) e.target.id === 'abi' ? this.props.updateState(["wasm", false]) : this.props.updateState(["abi", false]);
        console.log(e.target.files)
        let filereader = new FileReader();
        let that = this
        let id = e.target.id;
        if(id === 'abi') this.props.updateState(["abiName", e.target.files[0].name]);
        else if(id === 'wasm') this.props.updateState(["wasmName", e.target.files[0].name]);

        filereader.onloadend = function () {
            let content = filereader.result;
            if (id === 'abi') that.props.loadABI(content);
            else that.props.loadWASM(content);
        }
        this.props.updateState(["contractName", e.target.files[0].name.split('.')[0]]);
        this.props.updateState(["contractSize", e.target.files[0].size]);
        await filereader.readAsBinaryString(e.target.files[0]);
    }


    render() {
        // var myChart = new Chart(ctx, {...});
        let totalDeployment = ((this.props.deploymentRam * this.props.ramPrice) + (this.props.deploymentNet * this.props.netRate) + (this.props.deploymentCpu * this.props.cpuRate));
        this.props.updateState(["totalDeployment", totalDeployment]);


        let resources = [
            <span>Staking: {this.props.staking.staked} EOS / {this.props.staking.staked + this.props.staking.unstaked} EOS<Staking staking={this.props.staking} totalDeployment={totalDeployment}></Staking></span>,
            <span>CPU: {this.props.cpu.used / 1000} ms / {this.props.cpu.max / 1000} ms<Cpu cpu={this.props.cpu} bill={this.props.bill} deploymentCpu={this.props.deploymentCpu} deploymentCpu={this.props.deploymentCpu}></Cpu></span>,
            <span>Net: {this.props.net.used / 1000} KB / {this.props.net.max / 1000} KB<Net net={this.props.net} bill={this.props.bill} deploymentNet={this.props.deploymentNet} deploymentNet={this.props.deploymentNet}></Net></span>,
            <span>Ram: {this.props.ram.used / 1000} KB / {this.props.ram.max / 1000} KB<Ram bill={this.props.bill} ram={this.props.ram} contractSize={this.props.contractSize} deploymentRam={this.props.deploymentRam}></Ram></span>
        ];

        let actionsCost = [
            <span>CPU: {(this.props.cpuTotal) / 1000} ms ({(this.props.cpuTotal * this.props.cpuRate).toFixed(4)} EOS)<CpuCost style={{ display: 'inline' }} cpu={this.props.cpu} bill={this.props.bill} height={100}></CpuCost></span>,
            <span>Net: {(this.props.netTotal) / 1000} KB ({(this.props.netTotal * this.props.netRate).toFixed(4)} EOS)<NetCost net={this.props.net} bill={this.props.bill}></NetCost></span>,
            <span>Ram: {(this.props.ramTotal) / 1000} KB ({(this.props.ramTotal * this.props.ramPrice).toFixed(4)} EOS)<RamCost bill={this.props.bill} ram={this.props.ram}></RamCost></span>
        ];
        const override = css`
        position: absolute;
        border-color: red;
        margin: auto 0;
        z-index: 5;`;


        let percentage = this.props.progress;
        const progressCir = this.props.loading ? <div className='ProgressCirc'>
            <CircularProgressbar
                percentage={percentage}
                text={`${percentage}%`}
                styles={{
                    path: { stroke: `rgb(62, 152, 199)` },
                    text: { fill: 'white', fontSize: '16px', fontFamily: 'Courier' }
                }} />
        </div> : null



        return (
            <div className="Dashboard">
                {/* <input id="account" onChange={this.props.loadDataAccount} placeholder="Account Name"></input> */}
                <div className="graphContainer">


                    {this.props.loading ? null :
                        <span className="typedContainer"><Typed
                            strings={['Estimate the cost of your EOS smart contract before deploying it:', '1. Load the ABI file of a smart contract. <br/><br/> 2. Load the WASM file, the compiled version of the contract. <br/><br/> 3. Click estimate. Be patient this could take up to 2 minutes.']}
                            typeSpeed={30}
                            shuffle={true}
                            cursorChar={'_'}
                        /></span>}

                    {this.props.csvData ? <ContractBill csvData={this.props.csvData} totalDeployment={totalDeployment} netRate={this.props.netRate} ramPrice={this.props.ramPrice} cpuRate={this.props.cpuRate} abi={this.props.abi}></ContractBill> : null}
                    {this.props.csvData ? <div className="ActionsCost"><h4>Actions cost</h4>{actionsCost}</div> : null}

                    <div className="Params" style={this.props.csvData ? {marginTop:'40px'}: null}>
                        <label className="Abi"><div className="plus-button"></div>  {this.props.abi ? this.props.abiName : "Load your ABI file"}<input id="abi" type="file" accept=".json, .abi" placeholder="abi" onChange={this.readFile}></input></label><br />
                        <label className="Wasm"><div className="plus-button"></div>  {this.props.wasm ? this.props.wasmName : "Load your WASM file"}<input id="wasm" type="file" accept=".wasm" placeholder="wasm" onChange={this.readFile}></input></label><br />
                        {/* <input id="accountInput" onChange={this.props.loadDataAccount} placeholder="Compare to your account"></input> */}
                        <button id="estimate" onClick={this.estimate}>Estimate</button>
                        {progressCir}<br/><br/>
                        {!this.props.csvData && this.props.progress === 100 ? <span>We are sorry, we were not able to estimate your contract.</span> : null}
                    </div>

                    {this.props.account && this.props.loading ? <div className="AccountResources"><h4>Account resources</h4>{resources}</div> : null}
                    {/* <Message/>  */}
                    {this.props.progress === 100 ? <Message/> : null}
                    
                </div>
            </div>

        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);