'use strict'

const joi = require('joi')
const stringify = require('json-stable-stringify')

const signature = require('./signature')
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
  sign(privateKeys = []) {
    let signatures = privateKeys.map(key => {
      if (typeof key !== 'object' || !key.scheme || !key.wallet || !key.secret) {
        return {error: 'missing-key-properties'}
      }

      return signature.generate(this.hash.value, key)
    })

    this.sigs.push(...signatures)
    return this
  }
  verify(keys = []) {

  }
}

module.exports = IOU
