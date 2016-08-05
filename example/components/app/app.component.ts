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
                case 'CHANGE_TEMP': {
                    var newState = Object.assign({}, state);

                    newState.temp = action.newTemp;

                    return newState;
                }
                default: {
                    return state;
                }
            };
        };

        this.rootReducerHello = function(state, action) {

            if (!state) {
                return initialState;
            }

            switch(action.type) {
                case 'CHANGE_TEMP': {
                    var newState = Object.assign({}, state);

                    newState.temp = action.newTemp;

                    return newState;
                }
                default: {
                    return state;
                }
            };
        };
    }
}

Polymer(TestAppComponent);
