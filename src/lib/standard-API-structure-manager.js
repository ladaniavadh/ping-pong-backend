const utils = require('../lib/utils')
const qs = require('qs')

const standardStructureStringToJson = (queryString) => {
  return qs.parse(queryString)
}

const standardStructureJsonToString = (standardJson) => {
  return qs.stringify(standardJson)
}

const getStandardAPIStructureJson = (request) => {
  let requestPath = request.route.path
  let queryString = request.query
  let queryStringJson = standardStructureStringToJson(queryString)
  queryStringJson[utils.urlCons.PARAM_REQUEST_PATH] = requestPath
  return queryStringJson
}

/**
 * [getPaginationJson description]
 * @param  {[type]} offset [description]
 * @param  {[type]} limit  [description]
 * @return {[type]}        [description]
 */

/* var pagination = {
*  'limit':'5',
*  'offset':'1'
* }
**/

const getPaginationJson = (offset, limit) => {
  let pagination = {}
  pagination[utils.urlCons.PARAM_OFFSET] = offset
  pagination[utils.urlCons.PARAM_LIMIT] = limit
  return pagination
}

const getFilterQueryJson = (field, op, value) => {
  let query = {}
  let opValueJson = {}
  opValueJson[op] = value
  query[field] = opValueJson
  return query
}

const getFilterJsonForContainsOp = (array, op, values) => {
  let query = {}
  query[utils.urlCons.PARAM_ARRAY] = array
  query[utils.urlCons.PARAM_CONTAINS] = op
  query[utils.urlCons.PARAM_VALUES] = values
  return query
}

const getFilterJsonForElemMatchOp = (array, queryJson) => {
  let query = {}
  query[utils.urlCons.PARAM_ARRAY] = array
  query[utils.urlCons.PARAM_ELEM_MATCH] = queryJson
  return query
}

const getArrayOpFilterJson = (op, queryJsonArray) => {
  let arrayOpQueryJson = {}
  arrayOpQueryJson[op] = queryJsonArray
  return arrayOpQueryJson
}

const getProjectionJson = (fields) => {
  return fields.toString()
}

const getSortJson = (field, sortType) => {
  let sortJson = {}
  sortJson[field] = sortType
  return sortJson
}

const getStandardStructureForDBOp = (requestRoutePath, pagination, filter, projection, sort) => {
  let standardApiStructure = {}
  if (pagination) {
    standardApiStructure = pagination
  }
  if (filter) {
    standardApiStructure[utils.urlCons.PARAM_FILTER] = filter
  }
  if (projection) {
    standardApiStructure[utils.urlCons.PARAM_FIELDS] = projection
  }
  if (sort) {
    standardApiStructure[utils.urlCons.PARAM_SORT] = sort
  }
  if (requestRoutePath) {
    standardApiStructure[utils.urlCons.PARAM_REQUEST_PATH] = requestRoutePath
  }
  return standardApiStructure
}

module.exports = {
  standardStructureStringToJson,
  standardStructureJsonToString,
  getStandardAPIStructureJson,
  getPaginationJson,
  getFilterQueryJson,
  getFilterJsonForContainsOp,
  getFilterJsonForElemMatchOp,
  getArrayOpFilterJson,
  getProjectionJson,
  getSortJson,
  getStandardStructureForDBOp
}
