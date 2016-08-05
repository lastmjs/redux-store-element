class TestTextComponent {
    beforeRegister() {
        this.is = 'test-text';
    }

    mapStateToThisDefault(e) {
        this.$.testTextDefault.innerHTML = e.detail.state.temp;
    }

    mapStateToThisHello(e) {
        this.$.testTextHello.innerHTML = e.detail.state.temp;
    }
}

Polymer(TestTextComponent);
