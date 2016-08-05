import {createStore} from '../../node_modules/redux/dist/redux.min.js';

let stores = {};
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
            listenersToAdd = [...listenersToAdd, {
                context: this
            }];
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
        listenersToAdd.forEach((element) => {
            element.context.storeName = this.storeName;
            this.subscribe.apply(element.context);
        });
        listenersToAdd = [];
    }
}

Polymer(ReduxStoreComponent);
