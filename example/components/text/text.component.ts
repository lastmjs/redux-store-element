class TestTextComponent {
    beforeRegister() {
        this.is = 'test-text';
    }

    localStateChangeClick(e) {
        this.action = {
            type: 'LOCAL_STATE_CHANGE',
            props: {
                monkey: 5
            }
        };
    }

    mapStateToThisDefault(e) {
        const state = e.detail.state;

        this.querySelector('#testTextDefaultStore').innerHTML = state.temp;

        state.textComponent && (this.querySelector('#testLocalState').innerHTML = state.textComponent.monkey);
    }

    mapStateToThisStore2(e) {
        const state = e.detail.state;
        this.querySelector('#testTextStore2').innerHTML = state.temp;
    }
}

Polymer(TestTextComponent);
