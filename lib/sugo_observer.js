/**
 * Observer for cloud
 * @class SugoObserver
 * @augments {SugoClient}
 * @param {string} URL - Cloud url to connect
 * @param {function} handler - Handler for change
 */
'use strict'

const { SugoClient } = require('sugo-client')
const sgSocketClient = require('sg-socket-client')
const {
  ReservedEvents,
  AuthEvents,
  ObservingEvents
} = require('sg-socket-constants')
const { ClientTypes, HubUrls } = require('sugo-constants')

const { ERROR } = ReservedEvents
const { OBSERVER } = ClientTypes
const { AUTHENTICATION, AUTHENTICATED, UNAUTHORIZED } = AuthEvents

const formatUrl = require('url').format
const argx = require('argx')
const { get } = require('bwindow')

const { START, STOP, CHANGE } = ObservingEvents

const co = require('co')
const assert = require('assert')

/** @lends SugoObserver */
class SugoObserver extends SugoClient {
  constructor (url, handler, options = {}) {
    let args = argx(arguments)
    url = args.shift('string')
    handler = args.shift('function')
    options = args.shift('object') || {}

    if (!url) {
      url = SugoObserver.urlFromConfig(options)
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

  /** @override */
  get clientType () {
    return OBSERVER
  }

  static urlFromConfig (config) {
    let {
      protocol = get('location.protocol') || 'http',
      host = undefined,
      port = get('location.port') || 80,
      hostname = get('location.hostname') || 'localhost',
      pathname = HubUrls.OBSERVER_URL
    } = config
    return formatUrl({ protocol, host, port, hostname, pathname })
  }
}

module.exports = SugoObserver
