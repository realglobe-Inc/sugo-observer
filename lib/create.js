/**
 * Create an observer instance
 * @function create
 * @returns {Object}
 */
'use strict'

const SugoObserver = require('./sugo_observer')

/** @lends create */
function create (...args) {
  return new SugoObserver(...args)
}

module.exports = create
