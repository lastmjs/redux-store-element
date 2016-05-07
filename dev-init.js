#!/usr/bin/env node

//TODO to make this a module of its own, get the package name from package.json somehow

var exec = require('child_process').exec;
var cmd = `
    mkdir -p bower_components/polymer-redux-store &&
    mkdir -p bower_components/polymer-redux-store/dist &&
    ln -s ../../redux-store.html bower_components/polymer-redux-store/redux-store.html &&
    ln -s ../../../dist/redux-store.js bower_components/polymer-redux-store/dist/redux-store.js
`;

var newProcess = exec(cmd);

newProcess.stdout.on('data', function(data) {
    console.log(data);
});

newProcess.stderr.on('data', function(data) {
    console.log(data);
});
