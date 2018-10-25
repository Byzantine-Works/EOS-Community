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
import Loader from 'react-spinners/GridLoader';
import { css } from 'react-emotion';


console.log(abi);
let types = [];
abi.structs.forEach(x => {
    x.fields.forEach(y => {
        if (!types.includes(y.type)) types.push(y.type);
    });
});

console.log(types);


const eos = Eos({
    keyProvider: '5KjDGssHn6aYBs32NwWiGvh2Aa7FbRpu7RGXv9ToNgj8FyS1vyw',// private key
    httpEndpoint: 'https://cors-anywhere.herokuapp.com/http://13.57.210.230:8888',
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'

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
    loading: store.loading,
    cpuTotal: store.cpuTotal,
    ramTotal: store.ramTotal,
    netTotal: store.netTotal,
    cpuRate: store.cpuRate,
    netRate: store.netRate,
    ramPrice: store.ramPrice,
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
        let wasm = this.props.wasm;
        let abi = this.props.abi;
        let wasmResp = await eos.setcode(account, 0, 0, wasm);
        let abiResp = await eos.setabi(account, abi);
        await console.log("WASM resp: ", wasmResp);
        await  console.log("ABI resp: ", abiResp);
        this.props.updateState(["deploymentRam", this.props.contractSize * 10.045]);
        await this.props.updateState(["deploymentCpu", wasmResp.processed.receipt.cpu_usage_us+abiResp.processed.receipt.cpu_usage_us]);
        await this.props.updateState(["deploymentNet", (wasmResp.processed.receipt.net_usage_words+abiResp.processed.receipt.net_usage_words)*8]);



        console.log("abiResp:", abiResp);
        console.log("wasm response: ", wasmResp);

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
                stake_net_quantity: '3.0000 EOS',
                stake_cpu_quantity: '3.0000 EOS',
                transfer: 0
            })
        });
        console.log(accCreate)

        let ramBefore = await eos.getAccount(text);
        let respTransac = await eos.transfer({
            from: 'victor',
            to: text,
            quantity: '0.0002 EOS',
            memo: 'first transaction'
        });
        let ramAfter = await eos.getAccount(text);
        console.log(respTransac)

        this.props.updateState(["deposit", { ramBefore: ramBefore, ramAfter: ramAfter, respTransac: respTransac }]);

        ramBefore = await eos.getAccount(text);
        respTransac = await eos.transfer({
            from: 'victor',
            to: text,
            quantity: '0.0002 EOS',
            memo: 'first transaction'
        });
        ramAfter = await eos.getAccount(text);
        console.log("ramAfter: ", ramAfter);


        this.props.updateState(["withdraw", { ramBefore: ramBefore, ramAfter: ramAfter, respTransac: respTransac }]);
        this.props.getResourcesPrice();

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
        this.props.updateState(["loading", true]);
        let account = await this.pushTransaction();
        await this.deployContract(account);
        await this.props.estimateContract(account);
        // this.props.updateState(["bill", bill]);
        // await this.generateCsv(bill); 

    }
    async conversion(e) {
        console.log(e.target)
        let price = this.props.ramPrice ? this.props.ramPrice : await this.props.getRamPrice();
        let result = (val / 1000) * price;
        console.log("result: ", result);
        return result;
    }


    async readFile(e) {
        console.log(e.target.files)
        let filereader = new FileReader();
        let that = this
        let id = e.target.id;
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

        let resources = [
            <span>Staking: {this.props.staking.staked} EOS / {this.props.staking.staked+this.props.staking.unstaked} EOS<Staking staking={this.props.staking}></Staking></span>,
            <span>CPU: {this.props.cpu.used/1000} ms / {this.props.cpu.max/1000} ms<Cpu cpu={this.props.cpu} bill={this.props.bill}></Cpu></span>,
            <span>Net: {this.props.net.used/1000} KB / {this.props.net.max/1000} KB<Net net={this.props.net} bill={this.props.bill}></Net></span>,
            <span>Ram: {this.props.ram.used/1000} KB / {this.props.ram.max/1000} KB<Ram bill={this.props.bill} ram={this.props.ram} contractSize={this.props.contractSize}></Ram></span>
        ]

        let actionsCost = [
            <span>CPU: {(this.props.cpuTotal) / 1000} ms ({(this.props.cpuTotal * this.props.cpuRate).toFixed(4)} EOS)<CpuCost style={{ display: 'inline' }} cpu={this.props.cpu} bill={this.props.bill} height={100}></CpuCost></span>,
            <span>Net: {(this.props.netTotal) / 1000} KB ({(this.props.netTotal * this.props.netRate).toFixed(4)} EOS)<NetCost net={this.props.net} bill={this.props.bill}></NetCost></span>,
            <span>Ram: {(this.props.ramTotal) / 1000} KB ({(this.props.ramTotal * this.props.ramPrice).toFixed(4)} EOS)<RamCost bill={this.props.bill} ram={this.props.ram}></RamCost></span>
        ];
        const override = css`
        position: absolute;
        border-color: red;
        margin: 0 auto;
        z-index: 5;`;



        return (
            <div className="Dashboard">
                <input id="account" onChange={this.props.loadDataAccount} placeholder="Account Name"></input>
                <div className="graphContainer">
                <div className="Params">
                        <label className="Abi"><div className="plus-button"></div>  {this.props.abi ? this.props.contractName+".abi" : "Load the ABI file"}<input id="abi" type="file" placeholder="abi" onChange={this.readFile}></input></label><br/>
                        <label className="Wasm"><div className="plus-button"></div>  {this.props.wasm ? this.props.contractName+".wasm" : "Load your WASM file"}<input id="wasm" type="file" placeholder="wasm" onChange={this.readFile}></input></label>
                        <button id="estimate" onClick={this.estimate}>Estimate</button>
                </div>
                {this.props.csvData ? <ContractBill csvData={this.props.csvData} netRate={this.props.netRate} ramPrice={this.props.ramPrice} cpuRate={this.props.cpuRate}></ContractBill> : null}

                {this.props.bill ? <div className="ActionsCost"><h4>Actions cost</h4>{actionsCost}</div> : null}
                {this.props.account ? <div className="AccountResources"><h4>Account resources</h4>{resources}</div> : null}


                    
                    
                    <div className='sweet-loading'>
                        <Loader
                            className={override}
                            sizeUnit={"px"}
                            size={25}
                            color={'white'}
                            loading={this.props.loading} />

                    </div>
                    </div>
            </div>

        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);