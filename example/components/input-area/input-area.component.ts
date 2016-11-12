class TestInputAreaComponent {
    beforeRegister() {
        this.is = 'test-input-area';
    }

    dispatchClick(e) {
        this.action = {
            type: 'CHANGE_TEXT',
            text: this.querySelector('#testInput').value
        };
    }
}

Polymer(TestInputAreaComponent);
