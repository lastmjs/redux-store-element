import {createStore} from '../../../node_modules/redux/dist/redux.min.js';

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
            },
            localStateName: {
                type: String
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
        stores[this.storeName].store.subscribe(() => {
            this.fire('statechange', {
                state: stores[this.storeName].store.getState()
            }, {
                bubbles: false
            });
        });
    }

    getState() {
        return stores[this.storeName].store.getState();
    }

    actionChanged(newValue, oldValue) {
        const augmentedReducer = (state, action) => {
            const augmentedState = applyLocalStateChangesToState(this, state, action);
            return stores[this.storeName].rootReducer(augmentedState, action);

            function applyLocalStateChangesToState(context, state, action) {
                if (action.type === 'LOCAL_STATE_CHANGE') {
                    if (context.localStateName) {
                        const newState = Object.assign({}, state, {
                            [context.localStateName]: createActionPropertiesObject(action)
                        });
                        return newState;
                    }
                    else {
                        throw 'LOCAL_STATE_CHANGE action dispatched, but localStateName has not been set. You must set the local-state-name attribute on this redux-store-element.';
                    }
                }
                return state;
            }

            function createActionPropertiesObject(action) {
                return Object.keys(action).filter((key) => {
                    return key !== 'type';
                }).reduce((accum, key) => {
                    accum[key] = action[key];
                    return accum;
                }, {});
            }
        };

        stores[this.storeName].store.replaceReducer(augmentedReducer);
        stores[this.storeName].store.dispatch(newValue);
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
        stores[this.storeName] = {
            store: createStore(this.rootReducer),
            rootReducer: this.rootReducer
        };

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
