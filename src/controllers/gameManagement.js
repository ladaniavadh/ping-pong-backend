'use strict'

const responsesGenerator = require('../lib/utils')
const httpStatusCode = require('http-status-codes')
const utils = require('../lib/utils')
const gameManagementService = require('../services/gameMgmtService')
const Joi = require('joi')
const CONTROLLER_CONS = 'GMS_CG_'

const createGame = async (req, res, next) => {
  try {
    await validateRequestJson(req.body, schemaForGame)
    const response = await gameManagementService.saveGamesDetails(req.body)
    if (response[utils.msgCons.RESPONSE_STATUS_CODE] !== undefined && utils.getStatusCode(response[utils.msgCons.RESPONSE_STATUS_CODE]) !== undefined) {
      res.status(utils.getStatusCode(response[utils.msgCons.RESPONSE_STATUS_CODE])).json(response)
    } else {
      res.status(httpStatusCode.OK).json(responsesGenerator.responseGenerators(response[utils.msCons.FIELD_RESULTS], utils.msgCons.CODE_SERVER_OK, utils.msgCons.MSG_SUCCESS_INSERT_DATA, response[utils.msCons.FIELD_ERROR_DATA]))
    }
  } catch (error) {
    if (utils.getStatusCode(error[utils.msgCons.RESPONSE_STATUS_CODE]) !== String(httpStatusCode.INTERNAL_SERVER_ERROR)) {
      res.status(utils.getStatusCode(error[utils.msgCons.RESPONSE_STATUS_CODE])).send(error)
    } else {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responsesGenerator.errorsArrayGenrator(error, utils.msgCons.CODE_INTERNAL_ERROR, utils.msgCons.MSG_ERROR_SERVER_ERROR))
    }
  }
}

const updateGame = async (req, res, next) => {
  try {
    await validateRequestJson(req.body, schemaForScore)
    const response = await gameManagementService.updateGamesDetails(req.body)
    if (response[utils.msgCons.RESPONSE_STATUS_CODE] !== undefined && utils.getStatusCode(response[utils.msgCons.RESPONSE_STATUS_CODE]) !== undefined) {
      res.status(utils.getStatusCode(response[utils.msgCons.RESPONSE_STATUS_CODE])).json(response)
    } else {
      res.status(httpStatusCode.OK).json(responsesGenerator.responseGenerators(response[utils.msCons.FIELD_RESULTS], utils.msgCons.CODE_SERVER_OK, utils.msgCons.MSG_SUCCESS_UPDATED_DATA, response[utils.msCons.FIELD_ERROR_DATA]))
    }
  } catch (error) {
    if (utils.getStatusCode(error[utils.msgCons.RESPONSE_STATUS_CODE]) !== String(httpStatusCode.INTERNAL_SERVER_ERROR)) {
      res.status(utils.getStatusCode(error[utils.msgCons.RESPONSE_STATUS_CODE])).send(error)
    } else {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responsesGenerator.errorsArrayGenrator(error, utils.msgCons.CODE_INTERNAL_ERROR, utils.msgCons.MSG_ERROR_SERVER_ERROR))
    }
  }
}

const getAllGames = async (req, res, next) => {
  try {
    const response = await gameManagementService.fetchAllGames()
    if (response[utils.msgCons.RESPONSE_STATUS_CODE] !== undefined && utils.getStatusCode(response[utils.msgCons.RESPONSE_STATUS_CODE]) !== undefined) {
      res.status(utils.getStatusCode(response[utils.msgCons.RESPONSE_STATUS_CODE])).json(response)
    } else {
      res.status(httpStatusCode.OK).json(responsesGenerator.responseGenerators(response, utils.msgCons.CODE_SERVER_OK, utils.msgCons.MSG_SUCCESS_FETCHED_DATA, response[utils.msCons.FIELD_ERROR_DATA]))
    }
  } catch (error) {
    if (utils.getStatusCode(error[utils.msgCons.RESPONSE_STATUS_CODE]) !== String(httpStatusCode.INTERNAL_SERVER_ERROR)) {
      res.status(utils.getStatusCode(error[utils.msgCons.RESPONSE_STATUS_CODE])).send(error)
    } else {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responsesGenerator.errorsArrayGenrator(error, utils.msgCons.CODE_INTERNAL_ERROR, utils.msgCons.MSG_ERROR_SERVER_ERROR))
    }
  }
}

const getPendingGames = async (req, res, next) => {
  try {
    const response = await gameManagementService.fetchPendingGames()
    if (response[utils.msgCons.RESPONSE_STATUS_CODE] !== undefined && utils.getStatusCode(response[utils.msgCons.RESPONSE_STATUS_CODE]) !== undefined) {
      res.status(utils.getStatusCode(response[utils.msgCons.RESPONSE_STATUS_CODE])).json(response)
    } else {
      res.status(httpStatusCode.OK).json(responsesGenerator.responseGenerators(response, utils.msgCons.CODE_SERVER_OK, utils.msgCons.MSG_SUCCESS_FETCHED_DATA, response[utils.msCons.FIELD_ERROR_DATA]))
    }
  } catch (error) {
    if (utils.getStatusCode(error[utils.msgCons.RESPONSE_STATUS_CODE]) !== String(httpStatusCode.INTERNAL_SERVER_ERROR)) {
      res.status(utils.getStatusCode(error[utils.msgCons.RESPONSE_STATUS_CODE])).send(error)
    } else {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responsesGenerator.errorsArrayGenrator(error, utils.msgCons.CODE_INTERNAL_ERROR, utils.msgCons.MSG_ERROR_SERVER_ERROR))
    }
  }
}

/**
 * [validateRequestJson function which validates user input for invitation]
 * @param  {[Object]} requestJson [user input for invitation]
 * @return {[Object/Array]}             [returns whether input is valid or not]
 */
function validateRequestJson (requestJson, schema) {
  return new Promise(async (resolve, reject) => {
    let joiResponse = Joi.validate(requestJson, schema)
    if (joiResponse[utils.msgCons.PARAM_ERROR] !== null) {
      return reject(utils.errorsArrayGenrator(utils.errorObjectGenrator(CONTROLLER_CONS + utils.msgCons.CODE_BAD_REQUEST, joiResponse[utils.msgCons.PARAM_ERROR]['details'][0]['message']), CONTROLLER_CONS + utils.msgCons.CODE_BAD_REQUEST, joiResponse[utils.msgCons.PARAM_ERROR]['details'][0]['message']))
    }
    return resolve([])
  })
}

const schemaForGame = Joi.object().keys({
  player_one: Joi.string().required(),
  player_two: Joi.string().required(),
})

const schemaForScore = Joi.object().keys({
  id: Joi.number().required(),
  score_one: Joi.number().required(),
  score_two: Joi.number().required(),
})

module.exports = {
  createGame,
  updateGame,
  getAllGames,
  getPendingGames
}
