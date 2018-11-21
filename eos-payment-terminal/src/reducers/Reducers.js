import * as types from '../actions/actionsType';
import State from '../model/State';



const updateState = (state = new State(), action) => {
    const { type } = action;
    let updatedState = null;
    switch (type) {
        case types.UPDATE_STATE: {
            updatedState = { ...state };

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
                let precision = state.balance[state.token].precision;
                if(state.USD) updatedState[action.payload.data[0]] = Number(action.payload.data[1]).toFixed(precision ? precision : 4);
                else updatedState[action.payload.data[0]] = Number(action.payload.data[1]).toFixed(4);
            }
            else if(action.payload.data[0] === 'transactionID') {
                let newTransactionIDS = [...state.transactionID, action.payload.data[1]];
                updatedState = {...updatedState, transactionID: newTransactionIDS};
            }
            else if(action.payload.data[0] === 'transacIrrevers') {
                let newTransacIrrevers = {...state.transacIrrevers};
                if(action.payload.data[1][1]) newTransacIrrevers[action.payload.data[1][0]] = true;
                else newTransacIrrevers[action.payload.data[1][0]] = false;
                updatedState = {...updatedState, transacIrrevers: newTransacIrrevers};
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

