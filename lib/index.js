/**
 * Rmote observer for SUGOS
 * @module sugo-observer
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get sugoObserver () { return d(require('./sugo_observer')) }
}
