/*
 * grunt-util
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-util/blob/master/LICENSE-MIT
 */

'use strict';

var spawn = require('child_process').spawn;

// Spawn a child process, capturing its stdout and stderr.
module.exports = spawn = function(opts, done) {
  // Build a result object and pass it (among other things) into the
  // done function.
  var callDone = function(code, stdout, stderr) {
    // Remove trailing whitespace (newline)
    stdout = _.rtrim(stdout);
    stderr = _.rtrim(stderr);
    // Create the result object.
    var result = {
      stdout: stdout,
      stderr: stderr,
      code: code,
      toString: function() {
        return code === 0 ? stdout : 'fallback' in opts ? opts.fallback : stderr;
      }
    };
    // On error (and no fallback) pass an error object, otherwise pass null.
    done(code === 0 || 'fallback' in opts ? null : new Error(stderr), result, code);
  };

  var cmd, args;
  if (opts.grunt) {
    cmd = process.argv[0];
    args = [process.argv[1]].concat(opts.args);
  } else {
    // On Windows, child_process.spawn will only file .exe files in the PATH,
    // not other executable types (grunt issue #155).
    try {
      cmd = which(opts.cmd);
    } catch (err) {
      callDone(127, '', String(err));
      return;
    }
    args = opts.args;
  }

  var child = spawn(cmd, args, opts.opts);
  var stdout = '';
  var stderr = '';
  child.stdout.on('data', function(buf) { stdout += buf; });
  child.stderr.on('data', function(buf) { stderr += buf; });
  child.on('close', function(code) {
    callDone(code, stdout, stderr);
  });
  return child;
};
