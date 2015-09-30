#! /usr/bin/env node
var cmder = require('commander');

var execute = exports.execute = function(args) {
  if(!args) {
    throw new Error('invalid');
  }
  console.log("args: " + args);

  var formName;
  cmder
    .version('0.0.0')
    .command('create <name>')
    .description('Create a new form')
    .action(function(name) {
      formName = name;
      console.log('hello');
    });

    cmder.parse(args);

  var res = {
    "params": {
      "name": formName
    }
  };

  return res;
};

exports.add = function (argument) {
  // body...
};

exports.host = function (argument) {
  // body...
};

execute(process.argv);
