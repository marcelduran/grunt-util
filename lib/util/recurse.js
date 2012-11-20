/*
 * grunt-util
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-util/blob/master/LICENSE-MIT
 */

 'use strict';

// Recurse through objects and arrays, executing fn for each non-object.
var recurse = module.exports = function recurse(value, fn, fnContinue) {

  var obj;
  if (fnContinue && fnContinue(value) === false) {
    // Skip value if necessary.
    return value;
  } else if (this.kindOf(value) === 'array') {
    // If value is an array, recurse.
    return value.map(function(value) {
      return recurse(value, fn, fnContinue);
    });
  } else if (this.kindOf(value) === 'object') {
    // If value is an object, recurse.
    obj = {};
    Object.keys(value).forEach(function(key) {
      obj[key] = this.recurse(value[key], fn, fnContinue);
    }, this);
    return obj;
  } else {
    // Otherwise pass value into fn and return.
    return fn(value);
  }
};
