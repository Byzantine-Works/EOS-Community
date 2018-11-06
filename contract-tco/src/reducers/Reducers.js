import * as types from '../actions/actionsType';
import State from './../models/Store';



const updateState = (state = new State(), action) => {
    const { type } = action;
    let updatedState = null;
    switch (type) {
        case types.UPDATE_STATE: {
            updatedState = { ...state };
            updatedState[action.payload.data[0]] = action.payload.data[1];
            return updatedState;
        }

        case types.LOAD_ABI: {
            updatedState = { ...state };
            updatedState.abi = JSON.parse(action.payload.data);
            return updatedState;
        }

        case types.LOAD_WASM: {
            updatedState = { ...state };
            updatedState.wasm = action.payload.data;
            return updatedState;
        }

        default : {
            return state;
        }
    
    }

}

const mainReducer = (state = new State(), action) => {
    let newState = updateState(state, action); 
    return newState;
}

export default mainReducer;

