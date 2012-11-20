/*
 * grunt-util
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-util/blob/master/LICENSE-MIT
 */

'use strict';

var nodeUtil = require('util');

// Create a new Error object, with an origError property that will be dumped
// if grunt was run with the --debug=9 option.
module.exports = function(err, origError) {
  if (!nodeUtil.isError(err)) { err = new Error(err); }
  if (origError) { err.origError = origError; }
  return err;
};
