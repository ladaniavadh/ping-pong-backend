'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('config')
require('mongoose-long')(mongoose)
const { dbCons } = require('../lib/utils')
var SchemaTypes = mongoose.Schema.Types

const invitationsSchema = new Schema({
  id: SchemaTypes.Long,
  player_one: {
    type: String
  },
  player_two: {
    type: String
  },
  score_one: {
    type: Number
  },
  score_two: {
    type: Number
  },
  game_name: {
    type: String
  },
  status: {
    type: Number,
    default: 0
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  updated_on: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: String,
    default: config.database.defaults.createdBy
  },
  updated_by: {
    type: String,
    default: config.database.defaults.updatedBy
  },
  is_deleted: {
    type: Boolean,
    required: true
  },
  additional_attributes: [{
    name: {
      type: String
    },
    value: {
      type: String
    }
  }]
}, {
  collection: 'games'
})

invitationsSchema.plugin(global.db.autoIncrement, {
  model: 'games',
  field: 'id',
  startAt: 1
})

module.exports = mongoose.model(dbCons.COLLECTION_GAMES, invitationsSchema)
