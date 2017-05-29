'use strict'

const joi = require('joi')
const stringify = require('json-stable-stringify')

const createHash = require('./hashing').create
const iouParamsSchema = require('./schemas/iou-data-aliased')

class IOU {
  constructor(params = {}) {
    let {hashalgs = ['sha256', 'sha256']} = params
    let {error, value} = joi.validate(params, iouParamsSchema)
    if (error) throw error

    this.hash = {}
    this.data = value
    this.sigs = []

    this.hash.value = createHash(stringify(this.data), hashalgs, ['utf8'])
  }
  sign(keys = []) {

  }
  verify(keys = []) {

  }
}

module.exports = IOU
