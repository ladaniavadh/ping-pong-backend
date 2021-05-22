'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const config = require('config')
const httpContext = require('express-http-context')
const utils = require('./lib/utils')

const app = express()

app.use(cors(config.cors))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(httpContext.middleware)
console.log('Game Management Service is running on port ' + utils.config.get('port'))

// Initialize database connection
const dbUtil = require('./lib/db')(config.database)
dbUtil.connect()
// Make db utils globally available
global.db = dbUtil

const gameRoute = require('./routes/game')

app.use(utils.urlCons.PARAM_API_PREFIX, gameRoute)

module.exports = app
