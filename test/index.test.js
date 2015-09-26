var assert = require('assert');
var chai = require('chai');

var expect = chai.expect;

var fg = require('./../index.js');

describe('Create', function() {
  describe('Parameters', function() {
    it('should throw if non', function() {
        expect(fg.create).to.throw('invalid');
    });
  });
});
