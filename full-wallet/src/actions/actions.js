import * as types from './actionsType';
import axios from 'axios';
import config from './../config.json'
import Eos from 'eosjs';
import EosApi from 'eosjs-api';
import lodash from 'lodash';
// import fetch from 'node-fetch';
// import { TextDecoder, TextEncoder } from 'text-encoding';
// const defaultPrivateKey = "5KDJZqtbfyJZmrAx97C8WB2b2V92NBm2rVi7WMFVBFuGdb5dWwQ";
// const signatureProvider = new eosjs.SignatureProvider([defaultPrivateKey], fetch);
// const { TextDecoder, TextEncoder } = require('text-encoding');
// const rpc = new eosjs.Rpc.JsonRpc('http://41.161.77.154:8888');
// const api = new eosjs.Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
require('dotenv').config();
// import Int64 from 'node-int64';
// var UINT64 = require('cuint').UINT64;


// everything is optional
// let options = {
//     httpEndpoint: 'https://cors-anywhere.herokuapp.com/http://54.183.9.138:8888',
//     chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
// }

// let eosApi = EosApi(options)

const eos = Eos({
    keyProvider: '5KjDGssHn6aYBs32NwWiGvh2Aa7FbRpu7RGXv9ToNgj8FyS1vyw',// private key
    httpEndpoint: 'https://cors-anywhere.herokuapp.com/http://54.183.9.138:8888',
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
})



// const eos = Eos({
//     keyProvider: '5HtyHKqr43GQpZhLg3RWhHz59JHQqb1uQzb2QyYwz1nuEieo6QY',// private key
//     httpEndpoint: 'https://cors-anywhere.herokuapp.com/https://api.kylin-testnet.eospacex.com',
//     chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',

// })


var myBuffer = [];
var str = 'test';
var buffer = new Buffer(str, 'utf16le');
for (var i = 0; i < buffer.length; i++) {
    myBuffer.push(buffer[i]);
}



export const updateState = data => ({
    type: types.UPDATE_STATE,
    payload: { data },
});

export const loadABI = data => ({
    type: types.LOAD_ABI,
    payload: { data },
})

export const loadWASM = data => ({
    type: types.LOAD_WASM,
    payload: { data },
})




// Asynchronous actions 


export const loadDataAccount = e => {
    let account = e.target.value;
    return async dispatch => {
        dispatch(updateState(["account", account]));
        try {
            let balance = await axios(process.env.URL_ACCOUNT_RESOURCES + account + '?api_key=' + config.apikey);
            console.log(balance);
            await dispatch(updateState(["balance", balance.data.core_liquid_balance]));
            await dispatch(updateState(["cpu", balance.data.cpu_limit]));
            await dispatch(updateState(["net", balance.data.net_limit]));
            let staking = {
                staked: balance.data.voter_info.staked / 10000,
                unstaked: Number(balance.data.core_liquid_balance.split(' ')[0]),
            }

            let ram = {
                used: balance.data.ram_usage,
                available: balance.data.ram_quota-balance.data.ram_usage, 
                max: balance.data.ram_quota
            }
            await dispatch(updateState(["ram", ram]));
            await dispatch(updateState(["staking", staking]));
            console.log(balance)
        } catch (error) {
            return;
        }

    }
}

export const estimateContract = (account) => {
    return async (dispatch, getState) => {
        let abi = getState().abi;
        let bill = {};
        console.log("account in action : ", account)
        await abi.actions.forEach(async action => {
            let dataTypes = {
                symbol: 'EOS',
                account_name: account,
                asset: '0.0001 EOS',
                extended_asset: '0.0001 EOS@'+account,
                uint64: 1,
                string: 'test',
                bytes: myBuffer,
                int64: 1,
                bool: 0
            }

            let acts = [];
            let data = {};
            let usage = {};
            let field = lodash.find(abi.structs, ['name', action.name])
            field.fields.forEach(arg => {
                data[arg.name] = dataTypes[arg.type];

            });

            console.log
            acts.push(
                {
                    account: account,
                    name: action.name,
                    authorization: [{
                        actor: account,
                        permission: 'active'
                    }],
                    data
                });

            // if(action.name === 'resetex'){    

            try {
                let ramBefore = await eos.getAccount(account);
                let respTransac = await eos.transaction({ actions: acts });
                console.log(respTransac);
                let ramAfter = await eos.getAccount(account);

                usage.ram = ramAfter.ram_usage - ramBefore.ram_usage;
                usage.net = respTransac.processed.net_usage;
                usage.cpu = respTransac.processed.receipt.cpu_usage_us;

                bill[action.name] = usage;

                await dispatch(updateState(["bill", bill]));
                // let transac = await eos.getTransaction(respTransac.transaction_id);
                // console.log(action.name, ": ", transac);
            } catch (error) {
                if (typeof error === 'string') {
                    let err = JSON.parse(error);
                    console.log(action.name, ": ", err);
                } else console.log(error);
            }
        // }
        })

    }

}