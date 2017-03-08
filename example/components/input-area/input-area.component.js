class TestInputAreaComponent extends Polymer.Element {
    static get is() { return 'test-input-area'; }
    constructor() { super(); }

    dispatchClick(e) {
        this.action = {
            type: 'CHANGE_TEXT',
            text: this.shadowRoot.querySelector('#testInput').value
        };
    }
}

window.customElements.define(TestInputAreaComponent.is, TestInputAreaComponent);
