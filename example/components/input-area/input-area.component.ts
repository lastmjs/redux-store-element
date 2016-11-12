class TestInputAreaComponent {
    beforeRegister() {
        this.is = 'test-input-area';
    }

    handleClick(e) {
        this.action = {
            type: 'CHANGE_TEMP',
            newTemp: this.$.testInput.value
        };

        this.action = {
            type: 'LOCAL_STATE_CHANGE',
            props: {
                monkey: 5
            }
        };
    }
}

Polymer(TestInputAreaComponent);
