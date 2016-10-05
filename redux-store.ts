import {createStore} from './node_modules/redux/dist/redux.min.js';

let stores = {};
let listenersToAdd = [];

class ReduxStoreComponent {
    public is;
    public properties;

    private listenersToAdd;

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
            },
            storeName: {
                type: String,
                observer: 'storeNameSet',
                value: 'default'
            }
        };
    }

    ready() {
        if (stores[this.storeName]) {
            this.subscribe();
        }
        else {
            listenersToAdd = [...listenersToAdd, this];
        }
    }

    subscribe() {
        stores[this.storeName].subscribe(() => {
            this.fire('statechange', {
                state: stores[this.storeName].getState()
            }, {
                bubbles: false
            });
        });
    }

    getState() {
        return stores[this.storeName].getState();
    }

    actionChanged(newValue, oldValue) {
        stores[this.storeName].dispatch(newValue);
    }

    rootReducerSet(newValue, oldValue) {
        if (this.rootReducer && this.storeName) {
            this.createTheStore();
        }
    }

    storeNameSet(newValue, oldValue) {
        if (this.rootReducer && this.storeName) {
            this.createTheStore();
        }
    }

    createTheStore() {
        stores[this.storeName] = createStore(this.rootReducer);
        listenersToAdd = listenersToAdd.filter((reduxStoreElement) => {
            const storeExists = (reduxStoreElement.storeName === this.storeName);

            if (storeExists) {
                reduxStoreElement.subscribe();
            }

            return !storeExists;
        });
    }
}

Polymer(ReduxStoreComponent);
