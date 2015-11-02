var gun = require('./generator.js');
var host = require('./host.js');

var util = require('util');

 exports.execute = function(argv) {
     var handlerName = getHandlerName(argv);

     if(handlerName === 'generator') {
         gun.execute(parseGenerator(argv));
     }
     else if(handlerName === 'host') {
         host.execute(parseHost(argv));
     }
     else {
         console.warn('Exiting. Unknown handler: ' + handlerName);
     }
};

var getHandlerName = exports.getConfigName = function(argv) {
    var cmd = argv._[0];

    switch (cmd) {
        case 'update':
        case 'create':
            return 'generator';
        case 'host':
            return 'host';
        default:
            return null;
    }
};

var parseHost = function(argv) {

    return {
        formName: argv._[1],
        store: 'mongo'
    };

};

var parseGenerator = function(argv) {
  if(!argv) {
    throw new Error('invalid arguments');
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

  return res;
};
