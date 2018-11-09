import React from 'react';
import { connect } from 'react-redux';
import Dashboard from './Containers/Dashboard';
import Vote from './Containers/Vote';
import * as actions from './actions/actions';
import logo from './logo.png'
import byzantine from './Byzantine.png'


const mapStateToProps = store => ({
    account: store.account,

});

const mapDispatchToProps = dispatch => ({
    updateState: data => dispatch(actions.updateState(data)),

});

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
            {/* <img className="byzantine" src={byzantine} width="200"></img> */}
            <img src={logo}></img>
                <Dashboard updateState={this.props.updateState} ></Dashboard>
            </div>

        );
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);