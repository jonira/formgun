#! /usr/bin/env node
var fs = require('fs');

var dots = require('dot').process({path: './templates'});

var Promise = require('bluebird');
var fs = Promise.promisifyAll(fs);

var execute = exports.execute = function(command) {

  var form = command.name;
  var createFormData;

  if(command.action === 'create') {
      createFormData = createDir(form).then(function () {
          return createJSON(form);
      });
  }
  if(command.action === "update") { // adding of new data
      createFormData = readJSON(form).then(function(fileData){
          var newData = {
              name: command.input.name,
              type: command.input.type
          }
          return generateJson(fileData, newData);
      });
  }

  if(!createFormData) {
      console.warn('no action');
      return;
  }

  return createFormData.then(function(json) {
      return storeJson(json);
  }).then(function (form) {
      return generateHtml(form);
  }).then(function(form) {
      return writeHtml(form);
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

var readJSON = function(form) {
    var rpromise = fs.readFileAsync('./' + form + '/formgun.json', {encoding: 'UTF-8'});
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
    var wpromise = fs.writeFileAsync('./' + json.name + '/formgun.json', JSON.stringify(json, null, 4));

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
    return fs.writeFileAsync('./' + formJson.name + '/index.html', formJson.html);
};

exports.add = function (argument) {
  // body...
};

exports.host = function (argument) {
  // body...
};
