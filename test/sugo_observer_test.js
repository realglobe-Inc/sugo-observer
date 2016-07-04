/**
 * Test case for sugoObserver.
 * Runs with mocha.
 */
'use strict'

const SugoObserver = require('../lib/sugo_observer.js')
const assert = require('assert')
const sgSocket = require('sg-socket')
const aport = require('aport')
const asleep = require('asleep')
const co = require('co')

const { ObservingEvents, AcknowledgeStatus } = require('sg-socket-constants')
const { OK, NG } = AcknowledgeStatus
const { START, STOP, CHANGE } = ObservingEvents

describe('sugo-observer', function () {
  this.timeout(4000)

  let port, server

  before(() => co(function * () {
    port = yield aport()
    server = sgSocket(port)
    server.of('observers').on('connection', (socket) => {
      socket.on(START, (data, callback) => {
        callback({ status: OK, payload: {} })

        setTimeout(() => {
          socket.emit(CHANGE, { foo: 'bar' })
        }, 100)
      })
      socket.on(STOP, (data, callback) => {
        callback({ status: OK })
      })
    })
  }))

  after(() => co(function * () {
    yield asleep(200)
    server.close()
  }))

  it('Sugo observer', () => co(function * () {
    let url = `http://localhost:${port}/observers`

    let changed = null
    let observer = new SugoObserver(url, (data) => {
      changed = data
    })

    yield observer.start()
    yield asleep(300)
    yield observer.stop()

    assert.deepEqual(changed, { foo: 'bar' })
  }))
})

/* global describe, before, after, it */
