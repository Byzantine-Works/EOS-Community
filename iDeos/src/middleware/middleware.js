import * as types from '../actions/actionTypes';

const middleware = {};

middleware.logger = store => next => (action) => {
  console.log(`=== ${action.type} ==>`);
  if (action.type !== types.EDITOR_CHANGE) {
    console.log('=== middleware ===> store: ', store);
  }
  next(action);
};

export default middleware;
