import {createStore} from 'redux';

let stores = {};
let currentElementId = 0;

export class ReduxStoreElement extends HTMLElement {
    constructor() {
        super();

        this._rootReducer = null;
        this._storeName = 'DEFAULT_STORE';
        this._action = null;
        this.elementId = `redux-store-element-${currentElementId++}`;
    }

    static get observedAttributes() {
        return [
            'store-name'
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'store-name': {
                this.storeName = newValue;
                break;
            }
        }
    }

    set rootReducer(val) {
        if (val !== this._rootReducer) {
            this._rootReducer = val;
            if (this._rootReducer && this._storeName) {
                this.createTheStore();
            }
        }
    }

    get rootReducer() {
        return this._rootReducer;
    }

    set storeName(val) {
        if (val !== this._storeName) {
            this._storeName = val;
            if (this._rootReducer && this._storeName) {
                this.createTheStore();
            }
        }
    }

    get storeName() {
        return this._storeName;
    }

    set action(val) {
        if (val !== this._action) {
            this._action = val;
            stores[this._storeName].store.dispatch(val);
        }
    }

    get action() {
        return this._action;
    }

    connectedCallback() {
        if (!stores[this._storeName]) {
            setTimeout(() => {
                this.connectedCallback();
            });
            return;
        }

        this.unsubscribe = stores[this._storeName].store.subscribe(() => {
            this.dispatchEvent(new CustomEvent('statechange', {
                detail: {
                    state: stores[this._storeName].store.getState()
                },
                bubbles: false
            }));
        });
    }

    getState() {
        return stores[this._storeName].store.getState();
    }

    getStores() {
        return stores;
    }

    createTheStore() {
        //TODO I think we can get rid of this check because the setters for storeName and rootReducer do reference equality checking. If a user sets the rootReducer or storeName and the reference is different, then a new store should be created.
        //TODO I am not sure though, so keep this check for now
        if (stores[this._storeName]) return; // I think it is safe to presume that a store should only be created once. Whithout this check there are some problems when a root reducer is set multiple times for one store

        stores[this._storeName] = {
            store: createStore(this._rootReducer),
            rootReducer: this._rootReducer
        };
    }
}

window.customElements.define('redux-store', ReduxStoreElement);

export function _resetGlobals() {
    stores = {};
    currentElementId = 0;
}
