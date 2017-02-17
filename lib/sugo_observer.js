/**
 * Observer for cloud
 * @class SugoObserver
 * @param {string} URL - Cloud url to connect
 * @param {function} handler - Handler for change
 */
'use strict'

const sgSocketClient = require('sg-socket-client')
const {
  ReservedEvents,
  AuthEvents,
  ObservingEvents
} = require('sg-socket-constants')

const { ERROR } = ReservedEvents
const { AUTHENTICATION, AUTHENTICATED, UNAUTHORIZED } = AuthEvents

const argx = require('argx')
const { parseObserverUrl } = require('./parsing')

const { START, STOP, CHANGE } = ObservingEvents
const { EventEmitter } = require('events')

const co = require('co')
const assert = require('assert')

/** @lends SugoObserver */
class SugoObserver extends EventEmitter {
  constructor (url, handler, options = {}) {
    let args = argx(arguments)
    url = args.shift('string')
    handler = args.shift('function')
    options = args.shift('object') || {}

    if (!url) {
      url = parseObserverUrl(options)
    }

    assert.ok(url, 'URL is required.')
    assert.ok(handler, 'handler is required')
    super()
    const s = this
    s.url = url
    s.handler = handler
    s.auth = options.auth || false
    s.path = options.path || '/socket.io'
    s.socket = null
    s.onError = (err) => s.emit(err) || Promise.reject(err)
  }

  /**
   * Start observing
   */
  start () {
    const s = this
    let { auth, path } = s
    return co(function * () {
      let socket = sgSocketClient(s.url, { path })
      socket.on(ERROR, (err) => s.emit(ERROR, err))
      if (auth) {
        yield new Promise((resolve, reject) => {
          socket.emit(AUTHENTICATION, auth)
          socket.once(UNAUTHORIZED, (err) =>
            reject(new Error(`[SUGO-Observer] Authentication failed: ${err.message}`))
          )
          socket.once(AUTHENTICATED, () => resolve())
        })
      }

      yield socket.waitToConnect()
      yield socket.call(START)

      socket.on(CHANGE, s.handler)
      s.socket = socket
      return socket
    })
  }

  /**
   * Stop observing
   */
  stop () {
    const s = this
    return co(function * () {
      let { socket } = s
      socket.off(CHANGE, s.handler)
      yield socket.call(STOP)
      socket.close()
      yield socket.waitToDisconnect()
      delete s.socket
    })
  }

  static urlFromConfig (config) {
    console.warn('`SugoObserver.urlFromConfig` is now deprecated. Use `SugoObserver.parseActorUrl` instead')
    return this.parseObserverUrl(...arguments)
  }

  static parseObserverUrl () {
    return parseObserverUrl(...arguments)
  }
}

module.exports = SugoObserver
