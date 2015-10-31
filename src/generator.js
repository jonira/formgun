#! /usr/bin/env node
var fs = require('fs');
var path = require('path');

var dots = require('dot').process({'path': path.join(__dirname, '../', 'templates')});

var Promise = require('bluebird');
var fs = Promise.promisifyAll(fs);

module.exports = {};
module.exports.execute = function(command) {

    var base_path = process.cwd();

    var form = command.name;
    var createFormData;

    var fullpath = path.join(base_path, form);

    if(command.action === 'create') {
        createFormData = createDir(fullpath).then(function () {
          return createJSON(form);
        });
    }
    if(command.action === "update") { // adding of new data
        createFormData = readJSON(fullpath).then(function(fileData){
          var newData = {
              name: command.input.name,
              type: command.input.type
          };
          return generateJson(fileData, newData);
        });
    }

    if(!createFormData) {
        console.warn('no action');
        return;
    }

    return createFormData.then(function(json) {
        return storeJson(json);
    }).then(function (fullpath) {
        return generateHtml(fullpath);
    }).then(function(fullpath) {
        return writeHtml(fullpath);
    }).then(function (result) {
        return command;
    });

};

var createDir = function(form) {
    return fs.mkdirAsync(form).catch(function (ex) {
        console.error(ex);
    });
};

var createJSON = function(form) {
    return {
        name: form,
        inputs: {

        },
        actions: ['submit']
    };
};

var readJSON = module.exports.readJSON = function(form) {
    var rpromise = fs.readFileAsync(path.join(form, 'formgun.json'), {encoding: 'UTF-8'});
    return rpromise.then(function (content) {
        return JSON.parse(content);
    });
};

var generateJson = function(formData, newData) {

    var input = {
        'name': newData.name,
        'type': newData.type
    };

    formData.inputs[newData.name]= input;

    return formData;
};

var storeJson = function(json) {
    var wpromise = fs.writeFileAsync(path.join(json.name, 'formgun.json'), JSON.stringify(json, null, 4));

    return wpromise.then(function () {
        return json;
    });
};

var generateHtml = function(formJson) {
    var htmlTemplate = dots.default(formJson);
    formJson.html = htmlTemplate;
    return formJson;
};

var writeHtml = function(formJson) {
    return fs.writeFileAsync(path.join(formJson.name, 'index.html'), formJson.html);
};
