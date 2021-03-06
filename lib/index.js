/**
 * 
 * @module sugo-observer
 */

'use strict'

const SugoObserver = require('./sugo_observer')
const create = require('./create')

let lib = create.bind(this)

Object.assign(lib, SugoObserver, {
  create,
  SugoObserver
})

module.exports = lib
