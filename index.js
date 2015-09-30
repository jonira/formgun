#! /usr/bin/env node
var cmder = require('commander');
var fs = require('fs');

var execute = exports.execute = function(args) {

  var res = parse(args);

  var params = res.params;
  if(params.name) {
    try {
    fs.mkdirSync(params.name);
    }
    catch(ex) {
      if(ex.code === 'EEXIST') {
        throw new Error('Cannot create directory "' + params.name 
        + '", directory already exists.')
      }
      console.log(ex);
    }
  }

  return res;
};

var parse = exports.parse = function(args) {
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
