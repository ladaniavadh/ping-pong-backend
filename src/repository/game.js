'use strict'

require('../models/game-v_1_0_0')
const { dbCons } = require('../lib/utils')
const { getOrderedJson, getUpdatedJsonInResponse, getFinalQueryJson } = require('./db-operation')
const _ = require('lodash')
const { result } = require('lodash')

const insertGameData = async (insertionJson, orderValue) => {
  try {
    const db = await global.db.connect('pingpong')
    const GameDetails = db.model(dbCons.COLLECTION_GAMES)
    const newGame = new GameDetails(insertionJson)
    const response = await newGame.save()
    return response
  } catch (error) {
    return error
  }
}

const fetchGamesData = async (query) => {
  try {
    const db = await global.db.connect('pingpong')
    const gameModel = db.model(dbCons.COLLECTION_GAMES)
    let gameDetails = gameModel.find(
      await getFinalQueryJson(query)
    ).lean()
    return gameDetails
  } catch (error) {
    throw error
  }
}

const findAndModifyGameDetails = async (query, updateJson) => {
  return new Promise(async (resolve, reject) => {
    const db = await global.db.connect('pingpong')
    const gameModel = db.model(dbCons.COLLECTION_GAMES)
    gameModel.findOneAndUpdate(await getFinalQueryJson(query), updateJson)
      .then(results => {
        return resolve(results)
      })
  })
}

module.exports = {
  insertGameData,
  findAndModifyGameDetails,
  fetchGamesData
}
