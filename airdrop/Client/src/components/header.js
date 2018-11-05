import React, {Component} from 'react';
import logo from './logoMain.png';
import $ from "jquery";

class Header extends Component{
    render(){
       
        return(
            <div className="header ">
                <div className="container clearfix">
                    <div className="logo">
                        <a href="/" className="lit"><img src={logo} className="App-logo" alt="logo" /></a>
                    </div>
                    <div className="menuSections">
                        <nav>
                            <ul>
                                <li><a href="/">About</a></li>
                                <li><a href="/">Product</a></li>
                                <li><a href="/">Support</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;