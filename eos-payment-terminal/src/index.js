import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

import mainReducer from './reducers/Reducers';
import './App.scss'
const store = createStore(mainReducer, composeWithDevTools());

// we are adding composeWithDevTools here to get easy access to the Redux dev tools

render(
    <Provider store={store}>
            <App />
    </Provider>
, document.getElementById('wallet'));
