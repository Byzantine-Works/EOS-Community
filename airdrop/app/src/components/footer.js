import React, {Component} from 'react';
import logo from './logo.png';

class Footer extends Component{
    render(){
       
        return(
            <div className="footer">
                <div className="container clearfix">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>© Byzantine Labs Inc. 2018</p>
                </div> 
            </div>
        )
    }
}

export default Footer;