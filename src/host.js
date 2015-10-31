
var path = require('path');
var fs = require('fs');
var util = require('util');

var express = require('express');
var bodyParser = require('body-parser');
var json2csv = require('json2csv');

var generator = require('./generator.js');

var port = 3000;

module.exports = {};
module.exports.execute = function(hostParams) {

    var app = express();
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    var formPath = path.join(process.cwd(), hostParams.formName);
    var dataFile = path.join(formPath, 'formData.csv');
    var storeCSV = function(err, csv) {
        if (err) console.log(err);
        fs.appendFile(dataFile, csv+'\n', function(err) {
            if(err) {
                console.error('failed to append data file');
                return;
            }
                console.log(util.format('data file update'));
        });
    };

    generator.readJSON(formPath).then(function(formJson){

        var fields = [];
        Object.keys(formJson.inputs).forEach(function(input) {
            fields.push(input);
        });
        json2csv({fields: fields, data: {}, eol: '\n'}, storeCSV);

        app.get('/', function (req, res) {
            res.sendFile(path.join(formPath, 'index.html'));
        });
        app.post('/', function (req, res) {
            var body = req.body;
            console.log(util.format('new form entry received %s', JSON.stringify(body)));

            json2csv({ data: body, hasCSVColumnTitle: false}, storeCSV);

            res.end();
        });

        app.listen(port);

        console.log(util.format('Started hosting form %s at http://localhost:%s', hostParams.formName, port));
    });
};
