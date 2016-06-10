import {createStore} from '../../node_modules/redux/dist/redux.min.js';

let store;
let listenersToAdd = [];

class ReduxStoreComponent {
    public is;
    public properties;

    beforeRegister() {
        this.is = 'redux-store';
        this.properties = {
            rootReducer: {
                type: Object,
                observer: 'rootReducerSet'
            },
            action: {
                type: Object,
                observer: 'actionChanged'
            }
        };
    }

    ready() {
        if (store) {
            this.subscribe();
        }
        else {
            listenersToAdd = [...listenersToAdd, {
                context: this
            }];
        }
    }

    subscribe() {
        store.subscribe(() => {
            this.fire('statechange', {
                state: store.getState()
            }, {
                bubbles: false
            });
        });
    }

    actionChanged(newValue, oldValue) {
        store.dispatch(newValue);
    }

    rootReducerSet(newValue, oldValue) {
        store = createStore(newValue);
        listenersToAdd.forEach((element) => {
            this.subscribe.apply(element.context);
        });
        listenersToAdd = [];
    }
}

Polymer(ReduxStoreComponent);
