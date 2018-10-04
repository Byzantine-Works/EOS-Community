import * as types from '../actions/actionsType';
import State from '../model/State';



const updateState = (state = new State(), action) => {
    const { type } = action;
    let updatedState = null;
    switch (type) {
        case types.UPDATE_STATE: {
            updatedState = { ...state };
            updatedState[action.payload.data[0]] = action.payload.data[1];

            if(action.payload.data[0] === 'amount') {
                updatedState.amRend = action.payload.data[1];
                updatedState.amount = Number(action.payload.data[1]);

            }

            else if(action.payload.data[0] === 'fiatAm') {
                updatedState.fiatAmRend = action.payload.data[1];
                updatedState.fiatAm = Number(action.payload.data[1]);
            } 
            else if(action.payload.data[0] === 'fiatAmRend') {
                updatedState[action.payload.data[0]] = Number(action.payload.data[1]).toFixed(4);
            }

            else if(action.payload.data[0] === 'amRend') {
                updatedState[action.payload.data[0]] = Number(action.payload.data[1]).toFixed(state.balance[state.token].precision);
            }

            else {
                updatedState[action.payload.data[0]] = action.payload.data[1];
            }

            return updatedState;
        }
        case types.UPDATE_SCATTER: {
            let scatterStatus = !state.scatter;
            updatedState = { ...state, scatter: scatterStatus };
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

