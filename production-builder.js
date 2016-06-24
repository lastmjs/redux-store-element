const Builder = require('systemjs-builder');

const builder = new Builder('./', 'test-config.js');

builder.bundle('bower_components/redux-store-element/redux-store.ts', 'redux-store.js')
.then(() => {
    console.log('build complete');
})
.catch((err) => {
    console.log(err);
});
