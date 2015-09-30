var assert = require('assert');
var chai = require('chai');
var fs = require('fs');

var expect = chai.expect;
var should = chai.should();

var fg = require('./../index.js');

describe('Execute', function() {
  describe('handling parameters', function() {
    it('should throw if no parameters', function() {
        expect(fg.execute).to.throw('invalid');
    });

    it('should read name as first param', function() {
        var r = fg.execute(['node', 'fake-path/index.js', 'create', 'myForm']);
        r.should.have.property("params").and
        .have.property("name", "myForm");
    });

    it('should create directory named after the name', function() {
        var r = fg.execute("create myForm");

        var dirExists = fs.existsSync(r.params.name);

        expect(dirExists);
    });
  });
});
