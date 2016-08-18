const Builder = require('systemjs-builder');

const builder = new Builder();

builder.config({
    transpiler: 'plugin-babel',
    typescriptOptions: {
        target: 'es6',
        module: 'es6',
        typeCheck: false,
        tsconfig: false
    },
    meta: {
        '*.ts': {
            loader: 'ts'
        }
    },
    packages: {
        ts: {
            main: 'lib/plugin.js'
        },
        typescript: {
            main: 'lib/typescript.js',
            meta: {
                'lib/typescript.js': {
                    exports: 'ts'
                }
            }
        }
    },
    map: {
        ts: './node_modules/plugin-typescript/',
        typescript: './node_modules/typescript/',
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js'
    }
});

builder.buildStatic('redux-store.ts', 'redux-store.js', {
    minify: true
});
