'use strict'

const joi = require('joi')
const crypto = require('crypto')
const stringify = require('json-stable-stringify')
const iouSchemas = require('@webwallet/schemas').joi.transaction.iou

const signature = require('./signature')
const createHash = require('./hashing').create

function random(length = 10) {
  return crypto.randomBytes(length).toString('hex')
}

class IOU {
  constructor(params = {}) {
    let {hashalgs = 'sha256:sha256'} = params
    params.random = params.random || random()
    let {error, value} = joi.validate(params, iouSchemas.data)
    if (error) throw error

    this.hash = {}
    this.data = value
    this.meta = {}

    let data = stringify(this.data)
    let encodings = ['utf8']

    this.hash.types = hashalgs
    this.hash.steps = 'stringify:data'
    this.hash.value = createHash(data, hashalgs, encodings)

    this.meta.signatures = []
  }
  sign(privateKeys = []) {
    let signatures = privateKeys.map(key => {
      if (typeof key !== 'object' || !key.scheme || !key.signer || !key.secret) {
        return {error: 'missing-key-properties'}
      }

      return signature.generate(this.hash.value, key)
    })

    this.meta.signatures.push(...signatures)
    return this
  }
  verify(keys = []) {

  }
}

module.exports = IOU
