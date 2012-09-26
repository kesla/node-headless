var assert = require('assert');
var headless = require('../index');

headless(function(err, child, servernum) {
	assert.equal(err, null);
	assert.equal(typeof(child), 'object');
	assert.equal(typeof(child.kill), 'function');
	assert.equal(typeof(servernum), 'number');
});