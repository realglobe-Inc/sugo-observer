#!/usr/bin/env node

/**
 * Commit empty and push to sugos
 */

process.chdir(`${__dirname}/../..`)

const { pushOtherRepository } = require('sugos-travis')

pushOtherRepository({
  repository: 'sugos'
})
