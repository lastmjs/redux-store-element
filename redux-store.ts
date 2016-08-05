import {createStore} from '../../node_modules/redux/dist/redux.min.js';

let stores = {};

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
        this.listenersToAdd = [];
    }

    ready() {
        if (stores[this.storeName]) {
            this.subscribe();
        }
        else {
            this.listenersToAdd = [...this.listenersToAdd, {
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
        this.listenersToAdd.forEach((element) => {
            element.context.storeName = this.storeName;
            this.subscribe.apply(element.context);
        });
        this.listenersToAdd = [];
    }
}

Polymer(ReduxStoreComponent);
