/*
 * grunt-util
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-util/blob/master/LICENSE-MIT
 */

'use strict';

var string = module.exports = {};

// The line feed char for the current system.
string.linefeed = process.platform === 'win32' ? '\r\n' : '\n';

// Normalize linefeeds in a string.
string.normalizelf = function(str) {
  return str.replace(/\r\n|\n/g, this.linefeed);
};

// Return the string `str` repeated `n` times.
string.repeat = function(n, str) {
  return new Array(n + 1).join(str || ' ');
};

// Given str of "a/b", If n is 1, return "a" otherwise "b".
string.pluralize = function(n, str, separator) {
  var parts = str.split(separator || '/');
  return n === 1 ? (parts[0] || '') : (parts[1] || '');
};
