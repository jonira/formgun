
//var cmder = require('commander');

var gun = requrire('./index.js');

var parse = exports.parse = function(args) {
  if(!args) {
    throw new Error('invalid');
  }

  var formName, action;
  cmder
    .version('0.0.0')
    .command('create <name>')
    .description('Create a new form')
    .option('-url, --submit_url', 'url to post submit')
    .option('--submit_text', 'submit button text')
    .option('--succ_msg', 'message to show if submit succeeds')
    .option('--err_msg', 'message to show if submit fails')
    .action(function(name) {
      formName = name;
      action = 'create';
    });

 cmder
    .command('add <name>')
    .description('Add a input to a form')
    .option('-type', 'type of input')
    .action(function(name) {
      inputName = name;
      action = 'add';
  });

    cmder.parse(args);

  var res = {
    'params': {
      'name': formName,
      'action': action
    }
  };

  return res;
};

gun.execute(parse(process.argv));
