import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from './App';
import './App.scss';
// import registerServiceWorker from './utils/registerServiceWorker';
import Reducers from './reducers/Reducers';
import Dashboard from './Containers/Dashboard';


// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(Reducers, composeWithDevTools(), applyMiddleware(thunk));

ReactDOM.render(
  // wrap the App in the Provider and pass in the store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
// registerServiceWorker();