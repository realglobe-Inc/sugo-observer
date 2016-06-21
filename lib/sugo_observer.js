/**
 * Observer for cloud
 * @class SugoObserver
 * @param {string} URL - Cloud url to connect
 * @param {function} handler - Handler for change
 */
'use strict'

const sgSocketClient = require('sg-socket-client')
const {
  ObservingEvents
} = require('sg-socket-constants')

const { START, STOP, CHANGE } = ObservingEvents

const { EventEmitter } = require('events')

const co = require('co')
const assert = require('assert')

/** @lends SugoObserver */
class SugoObserver extends EventEmitter {
  constructor (url, handler, options) {
    assert.ok(url, 'URL is required.')
    super()
    const s = this
    s.url = url
    s.handler = handler

    s.socket = null
    s.onError = (err) => s.emit(err) || Promise.reject(err)
  }

  /**
   * Start observing
   */
  start () {
    const s = this
    return co(function * () {
      let socket = sgSocketClient(s.url)
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
}

module.exports = SugoObserver
