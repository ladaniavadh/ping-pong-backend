'use strict'
const { dbCons, convertIntoArray } = require('../lib/utils')
const SERVICE_CONS = 'GMS'
const _ = require('lodash')
const { getUpdateJsonFormat } = require('../repository/db-operation')

const { insertGameData, findAndModifyGameDetails, fetchGamesData } = require('../repository/game')

const saveGamesDetails = async (requestJson) => {
  return new Promise(async (resolve, reject) => {
    try {
      const gameName = requestJson[dbCons.FIELD_PLAYER_ONE] + ' Vs ' + requestJson[dbCons.FIELD_PLAYER_TWO]
      const insertJson = { ...requestJson, game_name: gameName, is_deleted: false }
      const response = await insertGameData(insertJson)
      return resolve(response)
    } catch (error) {
      return reject(error)
    }
  })
}

function generateQuerryForUpdateGame (id) {
  const queryJson = {}
  queryJson[dbCons.FIELD_GAME_ID] = id
  return queryJson
}

function getGameScoreUpdateJson (data) {
  let updateJson = {}
  updateJson[dbCons.FIELD_SCORE_ONE] = data[dbCons.FIELD_SCORE_ONE]
  updateJson[dbCons.FIELD_SCORE_TWO] = data[dbCons.FIELD_SCORE_TWO]
  updateJson[dbCons.FIELD_STATUS] = 1
  return getUpdateJsonFormat(updateJson)
}

const updateGamesDetails = async (requestJson) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updateQueryJson = generateQuerryForUpdateGame(requestJson.id)
      const updateJson = getGameScoreUpdateJson(requestJson)
      const response = await findAndModifyGameDetails(updateQueryJson, updateJson)
      return resolve(response)
    } catch (error) {
      return reject(error)
    }
  })
}

const fetchAllGames = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetchGamesData({})
      return resolve(convertIntoArray(response))
    } catch (error) {
      return reject(error)
    }
  })
}

const fetchPendingGames = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryJson = getQueryForPendingGames()
      const response = await fetchGamesData(queryJson)
      return resolve(convertIntoArray(response))
    } catch (error) {
      return reject(error)
    }
  })
}

function getQueryForPendingGames () {
  const queryJson = {}
  queryJson[dbCons.PARAM_STATUS] = 0
  return queryJson
}

module.exports = {
  saveGamesDetails,
  updateGamesDetails,
  fetchAllGames,
  fetchPendingGames
}
