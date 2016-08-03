#!/usr/bin/env node

/**
 * This is an example to use observer to observe cloud
 */
'use strict'

const co = require('co')
const sugoObserver = require('sugo-observer')

const HUB_URL = 'my-sugo-hub.example.com/observers'

co(function * () {
  let observer = sugoObserver(HUB_URL, (data) => {
    console.log('Data changed:', data)
    /* ... */
  })

  yield observer.start() // Start observing
  /* ... */
  yield new Promise((resolve) => setTimeout(resolve, 80000))
  yield observer.stop() // Stop observing
}).catch((err) => console.error(err))

