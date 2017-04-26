#!/usr/bin/env node

/**
 * This is an example to use observer to observe hub
 */
'use strict'

const sugoObserver = require('sugo-observer')

async function tryExample () {
  let observer = sugoObserver((data) => {
    console.log('Data changed:', data)
    /* ... */
  }, {
    host: 'my-sugo-hub.example.com'
  })

  await observer.start() // Start observing
  /* ... */
  await new Promise((resolve) => setTimeout(resolve, 80000))
  await observer.stop() // Stop observing
}

tryExample().catch((err) => console.error(err))

