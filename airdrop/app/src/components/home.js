import React, {Component} from 'react';
import Header from './header';
import Footer from './footer';
import loader from './loading.gif';
import $ from "jquery";
import axios from 'axios';
// import { CSVLink, CSVDownload } from "react-csv"

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




class Home extends Component{
    constructor(props) {
        super(props)
        // this.state = {
        // 'ACCOUNT_NAME': '',
        // 'TOKEN_NAME': '',
        // 'MAX_TOKEN_SUPPLY': '999111222',
        // 'SNAPSHOT_MONTH': '',
        // 'MIN_EOS_HELD': '',
        // 'MAX_EOS_HELD': '',
        // 'RATIO_OR_FLAT': '',
        // 'AIRDROP_RATIO': '',
        // 'AIRDROP_FLAT': '',
        // }
        var defaultParams = {
        'ACCOUNT_NAME': '',
        'TOKEN_NAME': '',
        'MAX_TOKEN_SUPPLY': '999111222',
        'SNAPSHOT_MONTH': '',
        'MIN_EOS_HELD': '',
        'MAX_EOS_HELD': '',
        'RATIO_OR_FLAT': '',
        'AIRDROP_RATIO': '1.0',
        'AIRDROP_FLAT': '0',
        }
        this.state = {
            'userParams': defaultParams,
            'priceEstimate': false
        }
        
        this.handleChangeMaxTokenSupply = this.handleChangeMaxTokenSupply.bind(this);
        this.handleChangeAirdropRatio = this.handleChangeAirdropRatio.bind(this);
        this.handleChangeAirdropFlat = this.handleChangeAirdropFlat.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChangeMaxTokenSupply (e) {
        console.log('Event', e)
        let newUserParams = {...this.state.userParams};
        // console.log('newUserParams', newUserParams)
        console.log('this.state', this.state)
        newUserParams.MAX_TOKEN_SUPPLY = e.target.value;
        
        // this.state.userParams.MAX_TOKEN_SUPPLY = e.target.value; // Does not work, use react method
        this.setState({userParams: newUserParams})
    }
    handleChangeAirdropRatio (e) {
        console.log('Event', e)
        let newUserParams = {...this.state.userParams};
        // console.log('newUserParams', newUserParams)
        console.log('this.state', this.state)
        newUserParams.AIRDROP_RATIO = e.target.value;
        
        this.setState({userParams: newUserParams})
    }
    handleChangeAirdropFlat(e) {
        console.log('Event', e)
        let newUserParams = {...this.state.userParams};
        // console.log('newUserParams', newUserParams)
        console.log('this.state', this.state)
        newUserParams.AIRDROP_FLAT = e.target.value;
        
        this.setState({userParams: newUserParams})
    }
    
    async handleClick (e) {
        console.log(e.target)
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
     
        var that = this;
        console.log('that', that)

        axios.post('/get_estimate', userParams)
        // axios.post('http://localhost:9001/get_estimate', userParams)
        .then((res) => {
            // console.log('Client POST Res :', res);
            var PRICE_ESTIMATE = res.data
            console.log('Client POST res.data = PRICE_ESTIMATE', PRICE_ESTIMATE)
            /*     example PRICE_ESTIMATE = { numberOfAccounts: 88871, */ 
            //     ramRequiredKb: 12619.681,
            //     cpuStakeEstimate_EOSLow: 6478,
            //     cpuStakeEstimate_EOSHigh: 19933,
            //     netStakeEstimate_EOS: 2.85,
            //     priceEstimate_Eos: 1210.4415,
            //     priceEstimate_Usd: 6052.2 }

            // console.log('AXIOS that.state BEFORE ', that.state.priceEstimate)
            that.setState({priceEstimate: PRICE_ESTIMATE})
            // console.log('AXIOS that.state AFTER: ', that.state.priceEstimate)


        })
        .catch((err) => {
           console.log('axios POST err: ', err);
        })
        
        console.log('HANDLECLICK this.state', this)
    }

    async downloadCsv(e) {
    console.log('downloadCSV clicked')
        console.log(e.target)
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
            'RATIO_OR_FLAT': 'Airdrop ' + option + ' Amount',
            'AIRDROP_RATIO': ratio,
            'AIRDROP_FLAT': flat,
        }

        // axios.post('http://localhost:9001/downloadcsv', userParams)
        axios.post('/downloadcsv', userParams)
            .then((res) => {
                // console.log('Client POST Res :', res);
                var stringcsv = res.data
                console.log('In DownloadCsv Post Response', stringcsv)

                var elementcsv = document.createElement("a");
                var fileb = new Blob([stringcsv], { type: 'text/plain' });
                elementcsv.href = URL.createObjectURL(fileb);
                elementcsv.download = "airdrop.csv";
            
                elementcsv.click();
            })
            .catch((err) => {
                console.log('axios POST err: ', err);
            })

    }
    async downloadSh(e) {
    console.log('downloadSH clicked')
    console.log(e.target)
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
        'RATIO_OR_FLAT': 'Airdrop ' + option + ' Amount',
        'AIRDROP_RATIO': ratio,
        'AIRDROP_FLAT': flat,
    }

    axios.post('http://localhost:9001/downloadsh', userParams)
        .then((res) => {
            // console.log('Client POST Res :', res);
            var stringsh = res.data
            console.log('In DownloadSh Post Response', stringsh)

            var elementsh = document.createElement("a");
            var filea = new Blob([stringsh], { type: 'text/plain' });
            elementsh.href = URL.createObjectURL(filea);
            elementsh.download = "airdrop.sh";
        
            elementsh.click();
        })
        .catch((err) => {
            console.log('axios POST err: ', err);
        })
    }
        

    render(){
        // console.log("state MAX_TOKEN_SUPPLY", this.state.userParams.MAX_TOKEN_SUPPLY)
       
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
                                    <input type="text" id="accountName" maxLength='12' />
                                    <label>Token Name</label>
                                    <input type="text" id="tokenName" maxLength='7' />
                                    <label>Max token supply</label>
                                    {/* <input type="text" id="tokenSupply" placeholder="1000000" /> */}
                                    {/* <input type="text" id="tokenSupply" value={this.state.MAX_TOKEN_SUPPLY}/> */ }
                                    {/* <input type="text" id="tokenSupply" value={this.state.MAX_TOKEN_SUPPLY} onChange={(e) => this.setState({MAX_TOKEN_SUPPLY: e.target.value})}/> */}
                                    <input type="text" id="tokenSupply" value={this.state.userParams.MAX_TOKEN_SUPPLY} onChange={this.handleChangeMaxTokenSupply}/>
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
                                        <label><input type="radio" value="Ratio" name="option" defaultChecked /> <span>Ratio</span></label>
                                        <label><input type="radio" value="Flat" name="option" /> <span>Flat</span></label>
                                    </p>
                                    <label>Airdrop ratio</label>
                                    <input type="number" id="ratio" value={this.state.userParams.AIRDROP_RATIO} onChange={this.handleChangeAirdropRatio}/>
                                    <label>Airdrop flat</label>
                                    <input type="number" className="fields" id="flat" value={this.state.userParams.AIRDROP_FLAT} onChange={this.handleChangeAirdropFlat}/>
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
                            {/* //         // Example PRICE_ESTIMATE = { numberOfAccounts: 88871,
                            //         //     ramRequiredKb: 12619.681,
                            //         //     cpuStakeEstimate_EOSLow: 6478,
                            //         //     cpuStakeEstimate_EOSHigh: 19933,
                            //         //     netStakeEstimate_EOS: 2.85,
                            //         //     priceEstimate_Eos: 1210.4415,
                            //         //     priceEstimate_Usd: 6052.2 } */}
                            <ul>
                                <li>Number of account <span>{this.state.priceEstimate.numberOfAccounts} Accounts</span></li>
                                <li>Ram Required (kb) <span>{this.state.priceEstimate.ramRequiredKb} kb</span></li>
                                <li>CPU-Stake Rough Estimate <span>{this.state.priceEstimate.cpuStakeEstimate_EOSLow}-{this.state.priceEstimate.cpuStakeEstimate_EOSHigh} EOS</span></li>
                                <li>Price Estimate EOS <span>{this.state.priceEstimate.priceEstimate_Eos} EOS</span></li>
                                <li>Price Estimate USD <span>${this.state.priceEstimate.priceEstimate_Usd}</span></li>
                            </ul>
                            <p>The estimated cost of the airdrop with these settings will be ${this.state.priceEstimate.priceEstimate_Usd} USD</p>

                            <div>
                                {/* <input id="myInput" /> */}                                
                                <button onClick={this.downloadSh}>
                                    Download Airdrop Script
                                </button>
                                <button onClick={this.downloadCsv}>
                                    Download Airdrop Csv
                                </button>
                            </div>
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