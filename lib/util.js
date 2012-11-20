/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

 'use strict';

var util = module.exports = {};

// External libs.
util.hooker = require('hooker'); // is this needed?  it only seems to be used by the log module
util.async = require('async');
util._ = require('lodash');
util._.mixin(require('underscore.string'));
util.which = require('which').sync;

// Utilities
util.toArray = Function.call.bind(Array.prototype.slice);
util.namespace = require('./util/namespace');
util.recurse = require('./util/recurse');
util.spawn = require('./util/spawn');
util.callbackify = require('./util/callbackify');
util.error = require('./util/error');

// Use instead of process.exit to ensure stdout/stderr are flushed
// before exiting in Windows (Tested in Node.js v0.8.7)
util.exit = require('./util/exit');

util.kindOf = require('./util/kindof');
util.findup = require('./util/findup');

var stringHelpers = require('./util/strings');
Object.keys(stringHelpers).forEach(function (method) {
  util[method] = stringHelpers[method];
});
