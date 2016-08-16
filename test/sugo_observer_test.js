/**
 * Test case for sugoObserver.
 * Runs with mocha.
 */
'use strict'

const SugoObserver = require('../lib/sugo_observer.js')
const assert = require('assert')
const sgSocket = require('sg-socket')
const aport = require('aport')
const socketIOAuth = require('socketio-auth')
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
    let handle = (socket) => {
      socket.on(START, (data, callback) => {
        callback({ status: OK, payload: {} })

        setTimeout(() => {
          socket.emit(CHANGE, { foo: 'bar' })
        }, 100)
      })
      socket.on(STOP, (data, callback) => {
        callback({ status: OK })
      })
    }
    let observerIO = server.of('/observers')
    observerIO.on('connection', handle)
    let authObserverIO = server.of('auth/observers')
    socketIOAuth(authObserverIO, {
      authenticate (socket, data, callback) {
        let valid = data.token === 'mytoken'
        callback(null, valid)
      }
    })
    authObserverIO.on('connection', handle)
  }))

  after(() => co(function * () {
    yield asleep(200)
    server.close()
  }))

  it('Sugo observer', () => co(function * () {
    let changed = null
    let observer = new SugoObserver((data) => {
      changed = data
    }, { port })

    yield observer.start()
    yield asleep(300)
    yield observer.stop()

    assert.deepEqual(changed, { foo: 'bar' })
  }))

  it('With auth', () => co(function * () {
    // Success
    let pathname = '/auth/observers'
    {
      let observer = new SugoObserver((data) => {
      }, { port, pathname, auth: { token: 'mytoken' } })
      yield observer.start()
      yield asleep(1)
      yield observer.stop()
    }
    // Fail
    {
      let caught
      try {
        let observer = new SugoObserver((data) => {
        }, { port, pathname, auth: { token: '__invalid_token__' } })
        yield observer.start()
        yield asleep(1)
        yield observer.stop()
      } catch (e) {
        caught = e
      }
      assert.ok(caught)
    }
  }))
})

/* global describe, before, after, it */
