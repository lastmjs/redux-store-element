import {createStore} from '../node_modules/redux/dist/redux.min.js';

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
        this.fire('statechange', {
            state: store.getState()
        }, {
            bubbles: false
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
