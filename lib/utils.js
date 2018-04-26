'use strict'

const chalk = require('chalk')

exports.handleFatalError = function handleFatalError (err) {
  console.log(`${chalk.red('[fatal error]')} ${err.message}`)
  console.log(err.stack)
  process.exit(0)
}