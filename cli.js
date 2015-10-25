#!/usr/bin/env node
 var argv = require('minimist')(process.argv.slice(2));

var gun = require('./index.js');
var util = require('util');

var parse = exports.parse = function(args) {
  if(!args) {
    throw new Error('invalid');
  }

  var formName, action, inputName, inputType;

  action = argv._[0];
  formName = argv._[1];

  inputName = argv.n ? argv.n : argv.name;
  inputType = argv.t ? argv.t : argv.type;

  var res = {
      'name': formName,
      'action': action,
      'input': {
          'name': inputName,
          'type': inputType
      }
  };

//  console.log(require('util').inspect(cmder, { depth: null }));

  console.log(argv);
  console.log(res);
  return res;
};

gun.execute(parse(argv));
