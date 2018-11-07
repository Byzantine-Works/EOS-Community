import React, {Component} from 'react';
import Header from './header';
import Footer from './footer';
import loader from './loading.gif';
import $ from "jquery";
import axios from 'axios';

// function handleClick(e) {
//     e.preventDefault();
//     $('.formInner').css('display', 'block');
//     $('.loader').fadeIn();
//     $('.detailInner').fadeIn('5000');
//     $('.loader').fadeOut();
//     console.log('submit button clicked')

//     var accountName = $('#accountName').val();
//     var tokenName = $('#tokenName').val();
//     var tokenSupply = $('#tokenSupply').val();
//     var snapshot = $('#snapshot').val();
//     var minEOS = $('#minEOS').val();
//     var maxEOS = $('#maxEOS').val();
//     var option = $("input[name='option']:checked").val()
//     var ratio = $('#ratio').val();
//     var flat = $('#flat').val();

//     var userParams = {
//         // Need this to populate from React Front End forms (sample dummy data below)
//         'ACCOUNT_NAME': accountName,
//         'TOKEN_NAME': tokenName,
//         'MAX_TOKEN_SUPPLY': tokenSupply,
//         'SNAPSHOT_MONTH': snapshot,
//         'MIN_EOS_HELD': minEOS,
//         'MAX_EOS_HELD': maxEOS,
//         'RATIO_OR_FLAT': 'Airdrop '+option+' Amount',
//         'AIRDROP_RATIO': ratio,
//         'AIRDROP_FLAT': flat,
//     }
//     console.log('userParams: ', userParams);
 
//     // var dummydata = {
//     //     'ACCOUNT_NAME': 'junglefoxfox',
//     //     'TOKEN_NAME': 'AIRSIX',
//     //     'MAX_TOKEN_SUPPLY': '1000000',
//     //     'SNAPSHOT_MONTH': 'November',
//     //     'MIN_EOS_HELD': '100',
//     //     'MAX_EOS_HELD': '9999999',
//     //     'RATIO_OR_FLAT': 'Airdrop Flat Amount',
//     //     'AIRDROP_RATIO': '5',
//     //     'AIRDROP_FLAT': '0',
//     // };


//     axios.post('http://localhost:9001/get_estimate', userParams)
//     .then((res) => {
//         console.log('Client POST Res :', res);
//         var PRICE_ESTIMATE = res.data
//         console.log('PRICE_ESTIMATE', PRICE_ESTIMATE)

//         // Sample Response Below: 
//         // PRICE_ESTIMATE = { numberOfAccounts: 88871,
//         //     ramRequiredKb: 12619.681,
//         //     cpuStakeEstimate_EOSLow: 6478,
//         //     cpuStakeEstimate_EOSHigh: 19933,
//         //     netStakeEstimate_EOS: 2.85,
//         //     priceEstimate_Eos: 1210.4415,
//         //     priceEstimate_Usd: 6052.2 }

//         // Need to pull ^ into response form, with possibly some sort of "Loading..." message during the async Submit button call

//     })
//     .catch((err) => {
//        console.log('axios POST err: ', err);
//     })
    
// }

function downloadButton(e) {
    console.log('downloadButton clicked')
    // var userParams = {
    //     'ACCOUNT_NAME': '',
    //     'TOKEN_NAME': '',
    //     'MAX_TOKEN_SUPPLY': '',
    //     'SNAPSHOT_MONTH': '',
    //     'MIN_EOS_HELD': '',
    //     'MAX_EOS_HELD': '',
    //     'RATIO_OR_FLAT': '',
    //     'AIRDROP_RATIO': '',
    //     'AIRDROP_FLAT': '',
    // }      
}

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
        'ACCOUNT_NAME': '',
        'TOKEN_NAME': '',
        'MAX_TOKEN_SUPPLY': '999111222',
        'SNAPSHOT_MONTH': '',
        'MIN_EOS_HELD': '',
        'MAX_EOS_HELD': '',
        'RATIO_OR_FLAT': '',
        'AIRDROP_RATIO': '',
        'AIRDROP_FLAT': '',
        }

        this.handleClick = this.handleClick.bind(this);
    }

    
    handleClick (e) {
        e.preventDefault();
        $('.formInner').css('display', 'block');
        $('.loader').fadeIn();
        $('.detailInner').fadeIn('5000');
        $('.loader').fadeOut();
        console.log('submit button clicked')
    
        var accountName = $('#accountName').val();
        var tokenName = $('#tokenName').val();
        var tokenSupply = $('#tokenSupply').val();
        var snapshot = $('#snapshot').val();
        var minEOS = $('#minEOS').val();
        var maxEOS = $('#maxEOS').val();
        var option = $("input[name='option']:checked").val()
        var ratio = $('#ratio').val();
        var flat = $('#flat').val();
    
        var userParams = {
            // Need this to populate from React Front End forms (sample dummy data below)
            'ACCOUNT_NAME': accountName,
            'TOKEN_NAME': tokenName,
            'MAX_TOKEN_SUPPLY': tokenSupply,
            'SNAPSHOT_MONTH': snapshot,
            'MIN_EOS_HELD': minEOS,
            'MAX_EOS_HELD': maxEOS,
            'RATIO_OR_FLAT': 'Airdrop '+option+' Amount',
            'AIRDROP_RATIO': ratio,
            'AIRDROP_FLAT': flat,
        }
        console.log('userParams: ', userParams);
     
    
        axios.post('http://localhost:9001/get_estimate', userParams)
        .then((res) => {
            console.log('Client POST Res :', res);
            var PRICE_ESTIMATE = res.data
            console.log('PRICE_ESTIMATE', PRICE_ESTIMATE)
        })
        .catch((err) => {
           console.log('axios POST err: ', err);
        })
        
    }
    

    render(){
        console.log("state MAX_TOKEN_SUPPLY", this.state.MAX_TOKEN_SUPPLY)
       
        return(
            <div className="HomePage">
                <div className="wellcomBanner">
                    <Header />
                </div>
                <div className="formDetail">
                    <div className="container">
                        <div className="formInner">
                            <div className="formWrap">
                                <form>
                                    <label>Account Name</label>
                                    <input type="text" id="accountName" maxlength='12' />
                                    <label>Token Name</label>
                                    <input type="text" id="tokenName" maxlength='7' />
                                    <label>Max token supply</label>
                                    {/* <input type="text" id="tokenSupply" placeholder="1000000" /> */}
                                    {/* <input type="text" id="tokenSupply" value={this.state.MAX_TOKEN_SUPPLY} onChange={(e) => this.setState('MAX_TOKEN_SUPPLY': e.target.value)}/> */}
                                    <input type="text" id="tokenSupply" value={this.state.MAX_TOKEN_SUPPLY} onChange={(e) => this.setState({MAX_TOKEN_SUPPLY: e.target.value})}/>
                                    <label>Snapshot month</label>
                                    <select id="snapshot">
                                        {/* <option value="">Select</option> */}
                                        <option value="Genesis">Genesis</option>
                                        <option value="Jungle Testnet">Jungle Testnet</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                    </select>
                                    <label>Min EOS held</label>
                                    <select id="minEOS">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="10">10</option>
                                        <option value="100">100</option>
                                        <option value="1000">1000</option>
                                        <option value="10000">10000</option>
                                        <option value="100000">100000</option>
                                        <option value="1000000">1000000</option>
                                    </select>
                                    <label>Max EOS held</label>
                                    <select id="maxEOS">
                                        <option value="No Max">No Max</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="10">10</option>
                                        <option value="100">100</option>
                                        <option value="1000">1000</option>
                                        <option value="10000">10000</option>
                                        <option value="100000">100000</option>
                                        <option value="1000000">1000000</option>
                                    </select>
                                    <label>Ratio or flat</label>
                                    <p>
                                        <label><input type="radio" value="Ratio" name="option" checked /> <span>Ratio</span></label>
                                        <label><input type="radio" value="Flat" name="option" /> <span>Flat</span></label>
                                    </p>
                                    <label>Airdrop ratio</label>
                                    <input type="number" id="ratio" />
                                    <label>Airdrop flat</label>
                                    <input type="number" className="fields" id="flat" />
                                    {/* <input type="submit" className="submitButton actives" onClick={handleClick} /> */}
                                    <input type="submit" className="submitButton actives" onClick={this.handleClick} />
                                    {/* <input type="submit" className="submitButton actives" onClick={(e)=> {this.handleClick} /> */}
                                </form>
                            </div>
                        </div>

                        <div className="loader">
                            <img src={loader} />
                        </div>

                        <div className="formInner detailInner">
                            <h4>Price Calculation</h4>
                            <ul>
                                <li>Number of account <span>160037</span></li>
                                <li>Ram Required (kb) <span>22725.253</span></li>
                                <li>CPU-Stake Rough Estimate <span>5.14 EOS</span></li>
                                <li>Price Estimate EOS <span>2195.6348</span></li>
                                <li>Price Estimate USD <span>1337.17</span></li>
                            </ul>
                            <p>The estimated cost of the airdrop with these settings will be $ 1337.17 USD</p>

                            <button onClick={downloadButton}>
                                Download Airdrop Scripts
                            </button>
                            <div className="clearfix"></div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home;