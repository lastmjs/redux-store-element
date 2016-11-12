class TestTextComponent {
    beforeRegister() {
        this.is = 'test-text';
    }

    mapStateToThisDefault(e) {
        const state = e.detail.state;

        this.querySelector('#testTextDefault').innerHTML = state.temp;
        this.querySelector('#testLocalState').innerHTML = state.inputArea;
    }

    mapStateToThisHello(e) {
        const state = e.detail.state;
        this.querySelector('#testTextHello').innerHTML = state.temp;
    }
}

Polymer(TestTextComponent);
