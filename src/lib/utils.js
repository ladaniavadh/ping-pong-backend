'use strict'
const config = require('config')

const self = module.exports = {
  urlCons: require('../constants/url-constants'),
  configCons: require('../constants/config-constants'),
  dbCons: require('../constants/db-constants'),
  msCons: require('../constants/ms-constants'),
  msgCons: require('../constants/msg-constants'),
  httpStatusCode: require('http-status-codes'),
  dbOperationCons: require('../constants/db-operation-constants'),
  config: require('config'),
  checkListContainsUrl: function (exclusionUrl, reqPath) {
    const requestUrlArray = reqPath.split('/')
    const originalUrlArray = exclusionUrl.split('/')
    if (requestUrlArray.length !== originalUrlArray.length) {
      return false
    }
    return this.compareUrlArrays(requestUrlArray, originalUrlArray)
  },

  getAllowHeader: function () {
    var json = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'Authorization, File-Name',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization,token,orgName,user_code,File-Name',
      'Access-Control-Request-Methods': 'POST, GET, PUT, DELETE, OPTIONS'
    }
    return json
  },

  compareUrlArrays: function (requestUrlArray, originalUrlArray) {
    const l = requestUrlArray.length
    let comparisonFlag = true
    let urlParamsJson = {}
    for (let i = 0; i < l; i++) {
      if (requestUrlArray[i] !== originalUrlArray[i]) {
        if (originalUrlArray[i][0] === ':') {
          urlParamsJson[originalUrlArray[i]] = requestUrlArray[i]
        } else {
          comparisonFlag = false
        }
      }
    }
    return {
      comparisonFlag: comparisonFlag,
      urlParamsJson: urlParamsJson
    }
  },

  responseGenerators: function (responseData, responseStatusCode, responseStatusMsg, responseErrors) {
    var responseJson = {}
    responseJson['data'] = responseData
    responseJson['status_code'] = responseStatusCode
    responseJson['status_message'] = responseStatusMsg

    // errors
    if (responseErrors === undefined) {
      responseJson['response_error'] = []
    } else {
      responseJson['response_error'] = responseErrors
    }

    return responseJson
  },

  errorsArrayGenrator: function (errorArray, code, msg, data) {
    var responseJson = {}
    if (typeof errorArray !== 'undefined' || errorArray.length > 0) {
      responseJson['errors'] = errorArray
    } else {
      responseJson['errors'] = []
    }

    // CODE
    if (typeof code === 'undefined') {
      responseJson['status_code'] = '500'
    } else {
      responseJson['status_code'] = code
    }

    // MSG
    if (typeof msg === 'undefined') {
      responseJson['status_message'] = 'server error'
    } else {
      responseJson['status_message'] = msg
    }

    // DATA
    if (typeof data === 'undefined') {
      responseJson['data'] = {}
    } else {
      responseJson['data'] = data
    }
    return responseJson
  },

  /**
   * verify the IP is valid
   **/
  validateIPAddress: (ipaddress) => {
    if (ipaddress.indexOf('localhost') === 0 || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
      return (true)
    }
    return (false)
  },
  /**
   * this method will check jsonObject is array or not.
   * @param {JSON} jsonObject
   */
  convertIntoArray: function (jsonObject) {
    if (!Array.isArray(jsonObject)) {
      return [jsonObject]
    }
    return jsonObject
  },
  /**
   * this method will return given field value array from json
   *
   *
   * @param {String} field
   * @return {Json} json
   */
  getValuesArrayFromJson: (field, json) => {
    var arrayJson = !Array.isArray(json) ? [json] : json
    var valueArray = []
    arrayJson.forEach(function (resultObject) {
      valueArray.push(resultObject[field])
    })
    return valueArray
  },

  /**
   * this method will return given field value array from json
   *
   *
   * @param {String} field
   * @return {Json} json
   */
  getNestedValuesArrayFromJson: (field, nestedField, json) => {
    var arrayJson = !Array.isArray(json) ? [json] : json
    var valueArray = []
    arrayJson.forEach(function (resultObject) {
      valueArray.push(resultObject[field][nestedField])
    })
    return valueArray
  },

  toTitleCase: (string) => {
    return string.replace(
      /\w\S*/g,
      function (text) {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
      }
    )
  },

  isEmpty (object) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  },

  /**
   * filter from array
   **/
  filterBasedOnValue: function filterBasedOnValue (inputArray, field, value) {
    var filteredValue = inputArray.filter(function (item) {
      return item[field] === value
    })
    return filteredValue
  },

  /**
   * filter from nested array
   **/
  filterBasedOnNestedValue: function filterBasedOnNestedValue (inputNestedArray, field, nestedField, value) {
    var filteredNestedValues = inputNestedArray.filter(function (item) {
      return item[field][nestedField] === value
    })
    return filteredNestedValues
  },

  /**
   * response json payload
   *
   * @param {String} code error code
   * @param {String} msg error msg
   *
   */
  errorObjectGenrator: function (code, msg) {
    var responseJson = {}
    // CODE
    if (typeof code === 'undefined') {
      responseJson[self.msgCons.PARAM_ERROR_CODE] = self.msgCons.CODE_INTERNAL_ERROR
    } else {
      responseJson[self.msgCons.PARAM_ERROR_CODE] = code
    }

    // MSG
    if (msg === undefined) {
      responseJson[self.msgCons.PARAM_ERROR_MSG] = self.msgCons.MSG_ERROR_SERVER_ERROR
    } else {
      responseJson[self.msgCons.PARAM_ERROR_MSG] = msg
    }

    return responseJson
  },

  /**
 * get Status Code
 */
  getStatusCode: function getStatusCode (statusCode) {
    if (statusCode === undefined) {
      statusCode = 'DF_ER_500'
    }
    var status = statusCode.split('_')
    return status[status.length - 1]
  },

  /**
 * Merge object b with object a.
 *
 * var a = { z: '123' } , b = { y: '456' }; => { z: '123', y: '456' }
 *
 * @param {Json} a
 * @param {Json} b
 * @return {Json}
 */
  mergeJsons: function (a, b) {
    if (a && b) {
      for (var key in b) {
        a[key] = b[key]
      }
    }
    return a
  },

  /**
   *  useful for doing average of the number
   **/
  averageOfNumber: function (element) {
    var sum = 0
    for (var i = 0; i < element.length; i++) {
      sum += parseFloat(element[i], 10) // don't forget to add the base
    }
    var avg = sum / element.length
    return avg
  },

  /**
   *  useful for converting array of numbers into array of string
   **/
  convertIntoStringArray: function (ids) {
    let json = []
    for (let id of ids) {
      json.push(String(id))
    }
    return json
  },

  /**
   * Concat Two Arrays
   * @param  {Array} array1 []
   * @param  {Array} array2 []
   * @return {Array}        []
   */
  concatArrays: function (array1, array2) {
    let temp = array2.concat(array1)
    array2 = temp
    return array2
  },

  replaceKey: function (data, fieldToReplace, newField) {
    let json = []
    for (let object of data) {
      let value = object[fieldToReplace]
      delete object[fieldToReplace]
      object[newField] = value
      json.push(object)
    }
    return json
  }
}