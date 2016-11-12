class TestAppComponent {
    beforeRegister() {
        this.is = 'test-app';
    }

    ready() {
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

Polymer(TestAppComponent);
