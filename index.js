#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));

var cli = require('./src/cli.js');

cli.execute(argv);
