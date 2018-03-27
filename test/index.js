import './process.js';
import '../node_modules/@webcomponents/shadydom/shadydom.min.js';
import '../node_modules/@webcomponents/custom-elements/custom-elements.min.js';
import '../node_modules/guesswork/test-runner.ts';
import './redux-store-test.js';

window.document.body.innerHTML = `
    <test-runner id="testRunner">
        <redux-store-test></redux-store-test>
    </test-runner>
`;
