[![build status](https://secure.travis-ci.org/kesla/node-headless.png)](http://travis-ci.org/kesla/node-headless)
node-headless
=========

node-headless makes it easy to start and use Xvfb in node.
headless is inspired by xvfb-run - it searches for a free X display number and starts Xvfb on that.

API
=======

````javascript
var headless = require('headless');

var options = {
	display: {width: 1024, height: 980}
};

headless(options, function(err, childProcess, servernum) {
  // childProcess is a ChildProcess, as returned from child_process.spawn()
  console.log('Xvfb running on server number', servernum);
  console.log('Xvfb pid', childProcess.pid);
  console.log('err should be null', err);
});
````

headless also support an optional number to start searching from.

````javascript
var headless = require('headless');

var options = {
	display : {width: 1024, height: 980}
};

headless(options, 200, function(err, childProcess, servernum) {
  // servernum will be at least 200
  console.log('Xvfb running on server number', servernum);
  console.log('Xvfb pid', childProcess.pid);
});
````

install
=======

With [npm](http://npmjs.org), do:

    npm install headless

If you're having problems with Xvfb-instances not getting killed correctly, and is running on a platform that the posix-module supports, install [child-killer](https://npmjs.org/package/child-killer) (`npm install child-killer`) and headless will automatically use it.

Licence
=======

Copyright (c) 2014 David Björklund

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
