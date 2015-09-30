var assert = require('assert');
var chai = require('chai');
var fs = require('fs');

var expect = chai.expect;
var should = chai.should();

var fg = require('./../index.js');

describe('FormGun', function() {
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

  describe('creating forms', function() {

    beforeEach(function() {
      try {
        fs.rmdirSync('myForm');
      }
      catch(e) {}
    });

    it('should create directory named after the name', function() {
        var r = fg.execute(['node', 'fake-path/index.js', 'create', 'myForm']);

        var dirExists = fs.existsSync(r.params.name);

        assert.equal(dirExists, true, "Directory created");
    });

    it('should fail if directory already exists', function() {
        fs.mkdirSync('myForm');
        expect(fg.execute.bind(this, ['node', 'fake-path/index.js', 'create', 'myForm']))
        .to.throw('Cannot create directory "myForm", directory already exists.');
    });
  });
});
