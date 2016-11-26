var fs = require('fs');
var spawn;

try {
  spawn = require('child-killer').spawn;
} catch(e) {
  spawn = require('child_process').spawn;
}

function findFreeServernum(servernum, callback) {
  fs.exists('/tmp/.X' + servernum + '-lock', function(exists) {
    if(exists) {
      servernum++;
      findFreeServernum(servernum, callback);
      return;
    }
    callback(servernum);
  });
}

module.exports = function headless(options, startnum, callback) {
  // arg1 in headless(arg1, arg2) will be interpreted as startnum or options depending on the type of the parameter
  if (!callback && !startnum) { 
    callback = options;
    options = null;
    startnum = 99;
  }
  else if (!callback && startnum){
    callback = startnum;
    if (typeof options === 'object') {
      startnum = 99;
    }
    else if (typeof options === 'number') {
      startnum = options;
      options = null;
    }
  }

  options = options || {}

  var display = []
  if (options.display) {
    display = ['-screen', '0', options.display.width + 'x' + options.display.height + 'x' + (options.display.depth || 16)]
  }

  findFreeServernum(startnum, function(servernum) {
    var args = [':' + servernum].concat(display).concat(options.args || []);
    var childProcess = spawn('Xvfb', args, {stdio: options.stdio});

    // assume starting Xvfb takes less than 500 ms and continue if it hasn't
    // exited during that time
    var timeout = setTimeout(function() {
      cleanUpListeners();
      callback(null, childProcess, servernum);
    }, 500);

    function onExit() {
      clearTimeout(timeout);
      cleanUpListeners();

      servernum++;
      headless(servernum, callback);
    }

    function onError (err) {
      clearTimeout(timeout);
      cleanUpListeners();

      if (~err.message.indexOf('ENOENT')) {
        callback(new Error('Xvfb is not installed or is not in your $PATH'));
      } else {
        callback(err);
      }
    }

    // if Xvfb exits prematurely the servernum wasn't valid.
    // Happens if there's already an X-server running on @servernum but no file was created in /tmp
    childProcess.once('exit', onExit);
    // if Xvfb is not installed, the childProcess will emit an ENOENT error
    childProcess.once('error', onError);

    function cleanUpListeners() {
      childProcess.removeListener('exit', onExit);
      childProcess.removeListener('error', onError);
    }
  });
}
