'use strict'

const _ = require('lodash')
const mongoose = require('mongoose')
const { autoIncrement } = require('mongoose-plugin-autoinc')
const { auditLog } = require('mongoose-audit-log').plugin
const utils = require('./utils')
mongoose.Promise = global.Promise

// Object holding all your connection strings
const connections = {}

/**
 * Return a middleware that generates Request ID and
 * sets in a header.
 *
 * @return {function} Express middleware.
 */
module.exports = (opts) => {
  this.opts = _.cloneDeep(opts)
  this.opts.host = this.opts.host || 'localhost:27017'

  const connect = async (dbName) => {
    // If db name is not provided, connect to default db
    dbName = dbName || this.opts.default_db_name
    if (connections[dbName]) {
      // database connection already exist. Return connection object
      console.log('connect() connection exists')
      return connections[dbName]
    }

    // Get new connection
    connections[dbName] = await createNewConnection(this.opts, dbName)

    connections[dbName].once('open', function callback () {
    })
    return connections[dbName]
  }

  return { connect, autoIncrement, auditLog }
}

async function createNewConnection (opts, dbName) {
  let url = `mongodb://${opts.host}/${dbName}`
  if (opts.replica_set) {
    url = url + `?replicaSet=${opts.replica_set}`
  }
  console.log('connect() url=%s', url)

  // Get mongo options
  const mongoOptions = await getMongoOptions(opts)

  // Create & return new connection
  return mongoose.createConnection(url, mongoOptions)
}

async function getMongoOptions (opts) {
  const mongoOptions = opts.mongo_options
  if (opts.authentication) {
    let user = opts.user
    let pass = opts.pass
    if (!user || !pass) {
      throw new Error('DB user or password is missing')
    }
    if (opts.fetch_secrets) {
      // Fetch secrets
      [user, pass] = await Promise.all([
        secretService.getSecretValue(user),
        secretService.getSecretValue(pass)
      ])
    }
    mongoOptions.user = user
    mongoOptions.pass = pass
    mongoOptions.authSource = opts.auth_source
  }

  return mongoOptions
}
