class TestTextComponent extends Polymer.Element {
    static get is() { return 'test-text'; }
    constructor() { super(); }

    localStateChangeClick(e) {
        this.action = {
            type: 'LOCAL_STATE_CHANGE',
            monkey: 5,
            chunkey: 3,
            you: 5
        };
    }

    mapStateToThisDefault(e) {
        const state = e.detail.state;

        this.shadowRoot.querySelector('#testTextDefaultStore').innerHTML = state.text;
        state.textComponent && (this.shadowRoot.querySelector('#testLocalState').innerHTML = state.textComponent.monkey);
    }

    mapStateToThisStore2(e) {
        const state = e.detail.state;

        this.shadowRoot.querySelector('#testTextStore2').innerHTML = state.text;
    }
}

window.customElements.define(TestTextComponent.is, TestTextComponent);
