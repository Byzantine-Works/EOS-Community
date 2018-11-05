import React, {Component} from 'react';
import Header from './header';
import Footer from './footer';

class Home extends Component{
    render(){
       
        return(
            <div className="HomePage">
                <div className="wellcomBanner">
                    <Header />
                </div>
                <div className="formDetail">
                    <div className="container">
                        <div className="formInner detailInner">
                            <h4>Price Calculation</h4>
                            <ul>
                                <li>Number of account <span>160037</span></li>
                                <li>Ram Required (kb) <span>22725.253</span></li>
                                <li>CPU-Stake Rough Estimate <span>5.14 EOS</span></li>
                                <li>Price Estimate EOS <span>2195.6348</span></li>
                                <li> Price Estimate USD <span>$10978.17</span></li>
                            </ul>
                            <p>The estimated cost of the airdrop with these settings will be $ 10978.17 USD</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home;