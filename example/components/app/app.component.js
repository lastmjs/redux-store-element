class TestAppComponent extends Polymer.Element {
    constructor() { super(); }
    static get is() { return 'test-app'; }

    ready() {
        super.ready();

        var initialState = {
            temp: 'initial temp'
        };

        this.rootReducerDefault = function(state, action) {
            if (!state) {
                return initialState;
            }

            switch(action.type) {
                case 'CHANGE_TEXT': {
                    return Object.assign({}, state, {
                        text: action.text
                    });
                }
                default: {
                    return state;
                }
            };
        };

        this.rootReducerStore2 = function(state, action) {
            if (!state) {
                return initialState;
            }

            switch(action.type) {
                case 'CHANGE_TEXT': {
                    return Object.assign({}, state, {
                        text: action.text
                    });
                }
                default: {
                    return state;
                }
            };
        };
    }
}

window.customElements.define(TestAppComponent.is, TestAppComponent);
