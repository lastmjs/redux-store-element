class TestInputAreaComponent {
    beforeRegister() {
        this.is = 'test-input-area';
    }

    handleClick(e) {
        console.log(this.querySelector('#redux-store-element').getState());

        this.action = {
            type: 'CHANGE_TEMP',
            newTemp: this.$.testInput.value
        };
    }
}

Polymer(TestInputAreaComponent);
