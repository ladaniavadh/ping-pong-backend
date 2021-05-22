'use strict'

const express = require('express')
const router = express.Router()
const {urlCons} = require('../lib/utils')

const gameManagementController = require('../controllers/gameManagement')

router.post(urlCons.URL_CREATE_GAME, gameManagementController.createGame)
router.post(urlCons.URL_UPDATE_GAME, gameManagementController.updateGame)
router.get(urlCons.URL_GET_GAMES, gameManagementController.getAllGames)
router.get(urlCons.URL_PENDING_GAMES, gameManagementController.getPendingGames)

module.exports = router
