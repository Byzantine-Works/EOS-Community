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
                        <div className="formInner">
                            <div className="formWrap">
                                <form action="/detail">
                                    <label>Account Name</label>
                                    <input type="text" maxlength='12' />
                                    <label>Token Name</label>
                                    <input type="text" maxlength='7' />
                                    <label>Max token supply</label>
                                    <input type="text" />
                                    <label>Snapshot month</label>
                                    <select>
                                        <option value="">Select</option>
                                        <option value="">Genesis</option>
                                        <option value="">jungle Testent</option>
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
                                    <input type="number" />
                                    <input type="submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home;