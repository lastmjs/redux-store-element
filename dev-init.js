#!/usr/bin/env node

//TODO to make this a module of its own, get the package name from package.json somehow

var exec = require('child_process').exec;
var cmd = `
    mkdir -p example/bower_components/redux-store-element &&
    ln -s ../../../redux-store.html example/bower_components/redux-store-element/redux-store.html &&
    ln -s ../../../redux-store-dist.html example/bower_components/redux-store-element/redux-store-dist.html &&
    ln -s ../../../redux-store.ts example/bower_components/redux-store-element/redux-store.ts &&
    ln -s ../../../redux-store.js example/bower_components/redux-store-element/redux-store.js
`;

var newProcess = exec(cmd);

newProcess.stdout.on('data', function(data) {
    console.log(data);
});

newProcess.stderr.on('data', function(data) {
    console.log(data);
});
