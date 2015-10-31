
var path = require('path');

var express = require('express');
var urlgen = require('password-generator');

module.exports = function(hostParams) {

    var express = require('express');
    var app = express();

    app.use(express.static(path.join(process.cwd(), hostParams.formName)));

    app.listen(process.env.PORT || 3000);

};
