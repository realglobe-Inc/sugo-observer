#!/usr/bin/env node

/**
 * This is an example to use observer to observe cloud
 */
'use strict'

const co = require('co')
const sugoObserver = require('sugo-observer')

const CLOUD_URL = 'my-sugo-cloud.example.com/observers'

co(function * () {
  let observer = sugoObserver(CLOUD_URL, (data) => {
    console.log('Data changed:', data)
    /* ... */
  })

  yield observer.start()
  /* ... */
  yield new Promise((resolve) => setTimeout(resolve, 80000))
  yield observer.stop()
}).catch((err) => console.error(err))

