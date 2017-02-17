/**
 * Parsing modules
 * @module parsing
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get parseObserverUrl () { return d(require('./parse_observer_url')) }
}
