
var assert = require('assert');

var cli = require('./../src/cli.js');

describe("CLI", function () {
    it("should resolve generator from action", function () {

        var create = cli.getConfigName({'_': ['create']});
        var update = cli.getConfigName({'_': ['update']});

        assert.equal(create, 'generator');
        assert.equal(update, 'generator');
    });
    it("should resolve host from action", function () {

        var host= cli.getConfigName({'_': ['host']});

        assert.equal(host, 'host');
    });
});
