var assert = require('assert');
var chai = require('chai');

var expect = chai.expect;
var should = chai.should;

var fg = require('./../index.js');

describe('Create', function() {
  describe('handling parameters', function() {
    it('should throw if no parameters', function() {
        expect(fg.create).to.throw('invalid');
    });

    it('should read name as first param', function() {
        var r = fg.create("myForm");
        r.should.have.property("params");
    });
  });
});
