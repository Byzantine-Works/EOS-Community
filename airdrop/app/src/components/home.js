import React, {Component} from 'react';
import Header from './header';
import Footer from './footer';
import $ from "jquery";
import axios from 'axios';

function handleClick(e) {
    e.preventDefault();
    $('.formInner').css('display', 'block');
    $('.detailInner').css('display', 'block');
    console.log('submit button clicked')

    var userParams = {
        // Need this to populate from React Front End forms (sample dummy data below)
    }

    var dummydata = {
        'ACCOUNT_NAME': 'junglefoxfox',
        'TOKEN_NAME': 'AIRSIX',
        'MAX_TOKEN_SUPPLY': '1000000',
        'SNAPSHOT_MONTH': 'November',
        'MIN_EOS_HELD': '100',
        'MAX_EOS_HELD': '9999999',
        'RATIO_OR_FLAT': 'Airdrop Flat Amount',
        'AIRDROP_RATIO': '5',
        'AIRDROP_FLAT': '0',
    };


    axios.post('http://localhost:9001/get_estimate', dummydata)
    .then((res) => {
        console.log('Client POST Res :', res);
        var PRICE_ESTIMATE = res.data
        console.log('PRICE_ESTIMATE', PRICE_ESTIMATE)

        // Sample Response Below: 
        // PRICE_ESTIMATE = { numberOfAccounts: 88871,
        //     ramRequiredKb: 12619.681,
        //     cpuStakeEstimate_EOSLow: 6478,
        //     cpuStakeEstimate_EOSHigh: 19933,
        //     netStakeEstimate_EOS: 2.85,
        //     priceEstimate_Eos: 1210.4415,
        //     priceEstimate_Usd: 6052.2 }

        // Need to pull ^ into response form, with possibly some sort of "Loading..." message during the async Submit button call

    })
    .catch((err) => {
       console.log('axios POST err: ', err);
    })
    
}

function downloadButton(e) {
    console.log('downloadButton clicked')
    var userParams = {
        'ACCOUNT_NAME': '',
        'TOKEN_NAME': '',
        'MAX_TOKEN_SUPPLY': '',
        'SNAPSHOT_MONTH': '',
        'MIN_EOS_HELD': '',
        'MAX_EOS_HELD': '',
        'RATIO_OR_FLAT': '',
        'AIRDROP_RATIO': '',
        'AIRDROP_FLAT': '',
    }      
}

class Home extends Component{
    render(){
       
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
                                    <input type="text" maxlength='12' />
                                    <label>Token Name</label>
                                    <input type="text" maxlength='7' />
                                    <label>Max token supply</label>
                                    <input type="text" placeholder="1000000" />
                                    <label>Snapshot month</label>
                                    <select>
                                        {/* <option value="">Select</option> */}
                                        <option value="">Genesis</option>
                                        <option value="">Jungle Testnet</option>
                                        <option value="">July</option>
                                        <option value="">August</option>
                                        <option value="">September</option>
                                        <option value="">October</option>
                                        <option value="">November</option>
                                    </select>
                                    <label>Min EOS held</label>
                                    <select>
                                        <option value="">0</option>
                                        <option value="">1</option>
                                        <option value="">10</option>
                                        <option value="">100</option>
                                        <option value="">1000</option>
                                        <option value="">10000</option>
                                        <option value="">100000</option>
                                        <option value="">1000000</option>
                                    </select>
                                    <label>Max EOS held</label>
                                    <select>
                                        <option value="">No Max</option>
                                        <option value="">0</option>
                                        <option value="">1</option>
                                        <option value="">10</option>
                                        <option value="">100</option>
                                        <option value="">1000</option>
                                        <option value="">10000</option>
                                        <option value="">100000</option>
                                        <option value="">1000000</option>
                                    </select>
                                    <label>Ratio or flat</label>
                                    <p>
                                        <label><input type="radio" name="option" checked /> <span>Ratio</span></label>
                                        <label><input type="radio" name="option" /> <span>Flat</span></label>
                                    </p>
                                    <label>Airdrop ratio</label>
                                    <input type="number" />
                                    <label>Airdrop flat</label>
                                    <input type="number" className="fields" />
                                    <input type="submit" className="submitButton actives" onClick={handleClick} />
                                </form>
                            </div>
                        </div>
                        <div className="formInner detailInner">
                            <h4>Price Calculation</h4>
                            <ul>
                                <li>Number of account <span>160037</span></li>
                                <li>Ram Required (kb) <span>22725.253</span></li>
                                <li>CPU-Stake Rough Estimate <span>5.14 EOS</span></li>
                                <li>Price Estimate EOS <span>2195.6348</span></li>
                                <li> Price Estimate USD <span>1337.17</span></li>
                            </ul>
                            <p>The estimated cost of the airdrop with these settings will be $ 1337.17 USD</p>

                            <button onClick={downloadButton}>
                                Download Airdrop Scripts
                            </button>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home;