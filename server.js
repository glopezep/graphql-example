'use strict'

const http = require('http')
const express = require('express')
const next = require('next')
const chalk = require('chalk')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schema')
const utils = require('./lib/utils')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production';

const app = express()
const nextApp = next({ dev })
const server = http.createServer(app)
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(_ => {
  app.use(express.json())
  app.use('/graphql', graphqlExpress({ schema }))
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

  app.get('*', (req, res) => {
    return handle(req, res);
  })

  if (!module.parent) {
    process.on('uncaughtException', utils.handleFatalError)
    process.on('unhandledRejection', utils.handleFatalError)

    server.listen(port, () => {
      console.log(`${chalk.green('[graphql-example]')} Server listening on port ${port}`)
    })
  }
})

module.exports = server