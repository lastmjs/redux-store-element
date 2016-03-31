import {createStore} from '../node_modules/redux/dist/redux.min.js';
import {rootReducer} from '../example/redux/reducers.ts';

//TODO this needs to become a singleton...I'm not sure if it is at the moment, I think each element declaration in the markup is creatign a new object
(() => {

    const is = 'redux-store';

    const store = createStore(rootReducer);

    const properties = {
        action: {
            type: Object,
            observer: 'actionChanged'
        }
    };

    const ready = function() {
        store.subscribe(() => {
            this.fire('stateChange', {
                state: store.getState()
            });
        });
    };

    const actionChanged = function(newValue, oldValue) {
        store.dispatch(newValue);
    };

    Polymer({
        is,
        properties,
        ready,
        actionChanged
    });
})();
