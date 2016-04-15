import {createStore} from '../node_modules/redux/dist/redux.min.js';

//TODO this needs to become a singleton...I'm not sure if it is at the moment, I think each element declaration in the markup is creatign a new object
(() => {

    const is = 'redux-store';

    let store;
    let listenersToAdd = [];

    const properties = {
        rootReducer: {
            type: Object,
            observer: 'rootReducerSet'
        },
        action: {
            type: Object,
            observer: 'actionChanged'
        }
    };

    const ready = function() {
        if (store) {
            subscribe.apply(this);
        }
        else {
            listenersToAdd = [...listenersToAdd, {
                context: this
            }];
        }
    };

    const subscribe = function() {
        store.subscribe(() => {
            this.fire('stateChange', {
                state: store.getState()
            });
        });
    };

    const actionChanged = function(newValue, oldValue) {
        store.dispatch(newValue);
    };

    const rootReducerSet = function(newValue, oldValue) {
        store = createStore(newValue);
        listenersToAdd.forEach(function(element) {
            subscribe.apply(element.context);
        });
    };

    Polymer({
        is,
        properties,
        ready,
        actionChanged,
        rootReducerSet
    });
})();
