'use strict'

const express = require('express')
const cors = require('cors')
const vhost = require('vhost')

// NOTE: This works as wanted
const app1 = require('./next/app1/app1')

// NOTE: This does not work as wanted
// const app1 = require('./sites/app1')
// Error: Invalid hook call. Hooks can only be called inside of the body of a function component.

// const app2 = require('./sites/app2')

const port = 3030;

const server = express()

server.use(express.json())
server.use(
  express.urlencoded({
    extended: true,
    type: '*/x-www-form-urlencoded',
  }),
)

server.use(cors())

// In reallity this would be example1.com
server.use(vhost(`app1.localhost`, app1))

// Only running app1 as example to show requested behavior
// In reallity this would be example2.com
// server.use(vhost(`app2.localhost`, app2))

server.listen(port, (err) => {
  if (err) throw err
  console.log(`Listening on post ${port}`)
})
