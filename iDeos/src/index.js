import { createStore, applyMiddleware } from 'redux';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';
import registerServiceWorker from './utils/registerServiceWorker';
import Reducers from './reducers/reducers';
// import middleware from './middleware/middleware';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(Reducers, composeWithDevTools(), applyMiddleware(thunk));

ReactDOM.render(
  // wrap the App in the Provider and pass in the store
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
