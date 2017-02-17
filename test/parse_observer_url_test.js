/**
 * Test case for parseObserverUrl.
 * Runs with mocha.
 */
'use strict'

const parseObserverUrl = require('../lib/parsing/parse_observer_url.js')
const assert = require('assert')
const co = require('co')

describe('parse-observer-url', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Parse observer url', () => co(function * () {
    assert.equal(
      parseObserverUrl('http://localhost:3000/observers'),
      'http://localhost:3000/observers'
    )

    assert.equal(
      parseObserverUrl('http://localhost:3000'),
      'http://localhost:3000'
    )

    assert.equal(
      parseObserverUrl({
        port: 3001,
        hostname: 'example.com'
      }),
      'http://example.com:3001/observers'
    )
  }))
})

/* global describe, before, after, it */
