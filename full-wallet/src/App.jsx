import React from 'react';
import { connect } from 'react-redux';

import AccountCreate from './Containers/AccountCreate';
import Dashboard from './Containers/Dashboard';
import Vote from './Containers/Vote';
import * as actions from './actions/actions';


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
            {/* <img src="/asset/logo.png"></img> */}
                <Dashboard updateState={this.props.updateState} dispatch={this.props.dispatch}></Dashboard>

            </div>

        );
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);