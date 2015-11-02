
var path = require('path');
var fs = require('fs');
var util = require('util');
var MongoClient = require('mongodb').MongoClient;

var express = require('express');
var bodyParser = require('body-parser');
var json2csv = require('json2csv');

var generator = require('./generator.js');

var port = 3100;

module.exports = {};
var writeCSV = function(err, csv) {
    if (err) console.log(err);
    fs.appendFile(dataFile, csv+'\n', function(err) {
        if(err) {
            console.error('failed to append data file');
            return;
        }
            console.log(util.format('data file update'));
    });
};

var storeCsv = function(config, data) {
    console.log(util.format('new form entry received %s', JSON.stringify(data)));

    json2csv({ data: data, hasCSVColumnTitle: false}, function() {
        var cb = writeCSV.bind(this, config);
        cb.call(this, arguments);
    });
};

var storeMongo = function(config, data) {
    var url = 'mongodb://localhost:27017/test';
    var insertDocument = function(db, callback) {
        db.collection('submits').insertOne(data, function(err, result) {
        if(err) {
            console.log('error occured');
        }
        console.log('insert succ to submits');
        callback(result);
        });
    };
    MongoClient.connect(url, function(err, db) {
        if(err) {
            console.log('error occured while connecting..');
            console.log(JSON.stringify(err));
            return;
        }

        insertDocument(db, function() {
          db.close();
          console.log('db closed');
        });
    }); 
};

var storeData = function(config, data) {
    if(config.type === 'csv') {
        return storeCsv(config, data);
    }
    else if(config.type === 'mongo') {
        return storeMongo(config, data);
    }
};

module.exports.execute = function(hostParams) {

    var app = express();
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    var formPath = path.join(process.cwd(), hostParams.formName);
    var dataFile = path.join(formPath, 'formData.csv');


    generator.readJSON(formPath).then(function(formJson){

        var fields = [];
        Object.keys(formJson.inputs).forEach(function(input) {
            fields.push(input);
        });
        // todo: move to csv handling
        //json2csv({fields: fields, data: {}, eol: '\n'}, writeCSV);

        app.get('/', function (req, res) {
            res.sendFile(path.join(formPath, 'index.html'));
        });
        app.post('/', function (req, res) {

            var storeType = 'csv';

            if(formJson.store) {
                storeType = formJson.store;
            }

            var body = req.body;

            storeData(
                { type: storeType}, body);


            res.end();
        });

        app.listen(port);

        console.log(util.format('Started hosting form %s at http://localhost:%s', hostParams.formName, port));
    });
};
