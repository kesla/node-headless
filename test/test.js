var assert = require('assert');
var headless = require('../index');

setTimeout(function() {
  throw new Error('Timeout 2 seconds. You don\'t have xvfb installed or something else is seriously wrong.');
}, 2000);

var options = {
  display: {width: 1024, height: 980},
  stdio: 'inherit'
};

headless(options, function(err, child, servernum) {
  assert.equal(err, null);
  assert.equal(typeof(child), 'object');
  assert.equal(typeof(child.kill), 'function');
  assert.equal(typeof(servernum), 'number');
  assert.equal(child.listeners('exit').length, 0);
  child.kill();
  child.on('exit', process.exit);
});
