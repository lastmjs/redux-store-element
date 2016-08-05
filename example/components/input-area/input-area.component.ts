class TestInputAreaComponent {
    beforeRegister() {
        this.is = 'test-input-area';
    }

    handleClick(e) {
        this.action = {
            type: 'CHANGE_TEMP',
            newTemp: this.$.testInput.value
        };
    }
}

Polymer(TestInputAreaComponent);
