import {InitialState} from './initial-state.ts';
import {Actions} from './actions.ts';

export const rootReducer = (state=InitialState, action) => {
    switch(action.type) {
        case 'CHANGE_TEMP': {
            let newState = Object.assign({}, state);

            newState.temp = action.newTemp;

            return newState;
        }
        default: {
            return state;
        }
    };
};
