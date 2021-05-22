'use strict'

const utils = require('../lib/utils')

const getQuery = (fieldName, operation, value) => {
  let query = {}
  query[fieldName] = {}
  query[fieldName][operation] = value
  return query
}

const getQueryWithoutOp = (fieldName, value) => {
  let query = {}
  query[fieldName] = value
  return query
}

const getMatchedResult = (query) => {
  let queryToBeExecuted = {}
  queryToBeExecuted[utils.dbOperationCons.FIELD_MATCH] = query
  return queryToBeExecuted
}

const getProjectedField = (projectedField) => {
  let projection = {}
  projection[utils.dbOperationCons.FIELD_PROJECTION] = projectedField
  return projection
}

const getQueryArrayForOperation = (operation, query) => {
  let operatedQuery = {}
  operatedQuery[operation] = query
  return operatedQuery
}

const getLookup = (from, localField, foreignField, as) => {
  let json = {}
  json[utils.dbOperationCons.FIELD_LOOKUP] = {}
  json[utils.dbOperationCons.FIELD_LOOKUP][utils.dbOperationCons.FIELD_FROM] = from
  json[utils.dbOperationCons.FIELD_LOOKUP][utils.dbOperationCons.FIELD_LOCAL_FIELD] = localField
  json[utils.dbOperationCons.FIELD_LOOKUP][utils.dbOperationCons.FIELD_FOREIGN_FIELD] = foreignField
  json[utils.dbOperationCons.FIELD_LOOKUP][utils.dbOperationCons.FIELD_AS] = as
  return json
}

const getUnwindedResponse = (unwindObject) => {
  let json = {}
  json[utils.dbOperationCons.FIELD_UNWIND] = unwindObject
  return json
}

const getGroupObject = (groupObject) => {
  let json = {}
  json[utils.dbOperationCons.FIELD_GROUP] = groupObject
  return json
}

const getOrderedJson = (value) => {
  let json = {}
  json[utils.dbOperationCons.FIELD_ORDERED] = value
  return json
}

const getUpdatedJsonInResponse = (value) => {
  let json = {}
  json[utils.dbOperationCons.FIELD_NEW] = value
  return json
}

const getUpdateJsonFormat = (updateJson) => {
  let json = {}
  json[utils.dbOperationCons.OP_SET] = updateJson
  return json
}

const updateAllValues = (value) => {
  let json = {}
  json[utils.dbOperationCons.FIELD_MULTI] = value
  return json
}

const getQueryJsonForElementMatch = (parameter, elemMatchValue) => {
  let query = {}
  query[parameter] = {}
  query[parameter][utils.dbOperationCons.OP_ELEM_MATCH] = elemMatchValue
  return query
}

const getQueryJsonForRegexOp = (value, caseSensitive) => {
  let query = {}
  query = {}
  query[utils.dbOperationCons.OP_REGEX] = value
  if (caseSensitive) {
    query[utils.dbOperationCons.FIELD_OPTIONS] = utils.dbOperationCons.FIELD_CASE_INSENSITIVE
  }
  return query
}

const getCommonProjection = () => {
  let projection = {}
  projection[utils.dbCons.COMMON_CREATED_BY] = false
  projection[utils.dbCons.COMMON_UPDATED_BY] = false
  projection[utils.dbCons.COMMON_CREATED_ON] = false
  projection[utils.dbCons.COMMON_UPDATED_ON] = false
  projection[utils.dbCons.FIELD__ID] = false
  projection[utils.dbCons.FIELD_OBJECTTYPE] = false
  return projection
}

const getSortJson = (json) => {
  let sortJson = {}
  sortJson[utils.dbOperationCons.OP_SORT] = json
  return sortJson
}

const getSkipJson = (skipValue) => {
  let skipJson = {}
  skipJson[utils.dbOperationCons.OP_SKIP] = skipValue
  return skipJson
}

const getLimitJson = (limit) => {
  let limitJson = {}
  limitJson[utils.dbOperationCons.OP_LIMIT] = limit
  return limitJson
}

const getMapReduceOutputJson = () => {
  let outputJson = {}
  outputJson[utils.dbOperationCons.FIELD_INLINE] = 1
  return outputJson
}

const getMapReduceJson = (query, regexMapfunction, reduceFunction, outputJson, extraParams) => {
  let mapReduceJson = {}
  mapReduceJson[utils.dbOperationCons.FIELD_QUERY] = query
  mapReduceJson[utils.dbOperationCons.FIELD_OUT] = outputJson
  mapReduceJson[utils.dbOperationCons.FIELD_MAP] = regexMapfunction
  mapReduceJson[utils.dbOperationCons.FIELD_REDUCE] = reduceFunction
  if (extraParams !== undefined) {
    mapReduceJson = utils.mergeJsons(mapReduceJson, extraParams)
  }

  return mapReduceJson
}

const getUpdatePushJson = (updateJson) => {
  let pushJson = {}
  pushJson[utils.dbOperationCons.FIELD_PUSH] = updateJson
  return pushJson
}

const getTextSearchQuery = (textSearch) => {
  let textJson = {}
  textJson[utils.dbOperationCons.FIELD_TEXT] = {}
  textJson[utils.dbOperationCons.FIELD_TEXT][utils.dbOperationCons.FIELD_SEARCH] = textSearch
  return textJson
}

const getEachOperationJson = (updateArray) => {
  let json = {}
  json[utils.dbOperationCons.OP_EACH] = updateArray
  return json
}

const getCountJson = (count) => {
  let json = {}
  json[utils.dbOperationCons.OP_COUNT] = count
  return json
}

const getFacetQuery = (facetJson) => {
  let json = {}
  json[utils.dbOperationCons.FIELD_FACET] = facetJson
  return json
}

const getJsonForUnwind = (path, preserveNullAndEmptyArrays) => {
  let json = {}
  json[utils.dbOperationCons.FIELD_PATH] = '$' + path
  json[utils.dbOperationCons.FIELD_PRESERVE_NULL_AND_EMPTY_ARRAYS] = preserveNullAndEmptyArrays
  return json
}

const getFinalQueryJson = (query) => {
  const isDeleteQueryJson = {}
  isDeleteQueryJson[utils.dbCons.COMMON_IS_DELETED] = utils.dbCons.VALUE_DEFAULT_IS_DELETED
  const queryJson = {}
  queryJson[utils.dbOperationCons.OP_AND] = [query]
  queryJson[utils.dbOperationCons.OP_AND].push(isDeleteQueryJson)
  return queryJson
}
module.exports = {
  getQuery,
  getGroupObject,
  getMatchedResult,
  getProjectedField,
  getQueryArrayForOperation,
  getLookup,
  getUnwindedResponse,
  getOrderedJson,
  getUpdatedJsonInResponse,
  getUpdateJsonFormat,
  updateAllValues,
  getQueryJsonForElementMatch,
  getQueryJsonForRegexOp,
  getCommonProjection,
  getSortJson,
  getSkipJson,
  getLimitJson,
  getMapReduceOutputJson,
  getMapReduceJson,
  getUpdatePushJson,
  getTextSearchQuery,
  getEachOperationJson,
  getCountJson,
  getFacetQuery,
  getQueryWithoutOp,
  getJsonForUnwind,
  getFinalQueryJson
}
