#!/usr/bin/env node

/**
 * This is an example to use observer to observe cloud
 */
'use strict'

const co = require('co')
const sugoObserver = require('sugo-observer')

co(function * () {
  let observer = sugoObserver((data) => {
    console.log('Data changed:', data)
    /* ... */
  }, {
    host: 'my-sugo-hub.example.com'
  })

  yield observer.start() // Start observing
  /* ... */
  yield new Promise((resolve) => setTimeout(resolve, 80000))
  yield observer.stop() // Stop observing
}).catch((err) => console.error(err))

