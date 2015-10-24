#! /usr/bin/env node
var fs = require('fs');

var dots = require('dot').process({path: './templates'});

var Promise = require('bluebird');
var fs = Promise.promisifyAll(fs);

var execute = exports.execute = function(command) {

  var params = command;
  var form = params.name;
  var createFormData;

  if(params.action === 'create') {
      createFormData = createDir(form).then(function () {
          return createJSON(form);
      });
  }
  if(params.action === "add") { // adding of new data
      createFormData = readJSON(form).then(function(formData){
          return generateJson(formData, newData);
      });
  }

  if(!createFormData) {
      console.warn('no action');
      return;
  }

  return createFormData.then(function (form) {
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
    var json = {
        name: form,
        inputs: {

        },
        actions: ['submit']
    };

    var wpromise = fs.writeFileAsync('./' + form + '/formgun.json', JSON.stringify(json, null, 4));

    return wpromise.then(function () {
        return json;
    });
};

var readJSON = function(form) {
    var rpromise = fs.readFileAsync('./' + form + '/formmgun.json', {encoding: 'UTF-8'});
    rpromise.then(function (content) {
        return JSON.parse(content);
    });

    return rpromise;
};

var generateJson = function(formData, newData) {
    formData.inputs[newData.name] = {
        name: newData.name,
        type: newData.type
    };
    return formData;
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
