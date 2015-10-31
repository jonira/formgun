var fs = require('fs');
var path = require('path');

var assert = require('assert');
var chai = require('chai');
var rimraf = require('rimraf');

var expect = chai.expect;
var should = chai.should();

var fg = require('./../src/generator.js');

describe('FormGun', function() {
  /*
  describe('parsing parameters', function() {
    it('should throw if no parameters', function() {
        expect(fg.parse).to.throw('invalid');
    });

    it('should read name as first param', function() {
        var r = fg.parse(['node', 'fake-path/index.js', 'create', 'myForm']);
        r.should.have.property("params").and
        .have.property("name", "myForm");
    });
  });
  */

  describe('creating forms', function() {

    it('should create directory and files', function(done) {
        var r = fg({action: 'create', name: 'myForm'});

        r.finally(function() {
            var dirExists = fs.existsSync('myForm');
            var jsonExists = fs.existsSync('myForm/formgun.json');
            var indexExists = fs.existsSync('myForm/index.html');

            assert.equal(dirExists, true, "Directory created");
            assert.equal(jsonExists, true, "formgun.json created");
            assert.equal(indexExists, true, "index.html created");
            done();
        });
    });

  });
});
