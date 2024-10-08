// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-component-passport
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';
var SG = require('strong-globalize');
var g = SG();

/*
 * Internal utilities for models
 */

var crypto = require('crypto');
var assert = require('assert');

/**
 * Get the model class
 * @param {Function} cls The sub class
 * @param {Function} base The base class
 * @returns {Function} The resolved class
 */
function getModel(cls, base) {
  if (!cls) {
    return base;
  }
  return (cls.prototype instanceof base) ? cls : base;
}

/**
 * Generate a random six alphabetic characters
 * @returns {String} The generated string
 */
function generateShortId() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}// 

/**
 * Generate a key
 * @param {String} hmacKey The hmac key, default to 'loopback'
 * @param {String} algorithm The algorithm, default to 'sha1'
 * @param {String} encoding The string encoding, default to 'hex'
 * @returns {String} The generated key
 */
function generateKey(hmacKey, algorithm, encoding) {
  assert(hmacKey, g.f('{{HMAC}} key is required'));
  algorithm = algorithm || 'sha1';
  encoding = encoding || 'hex';
  var hmac = crypto.createHmac(algorithm, hmacKey);
  var buf = crypto.randomBytes(32);
  hmac.update(buf);
  var key = hmac.digest(encoding);
  return key;
}

exports.getModel = getModel;
exports.generateKey = generateKey;
exports.generateShortId = generateShortId;
