'use strict'

const crypto = require('crypto')
const ripemd160 = require('ripemd160')
const bs58check = require('bs58check')
const stringify = require('json-stable-stringify')

const hashing = {
  sha256(data, encoding = 'hex') {
    return crypto.createHash('sha256')
      .update(new Buffer(data, encoding)).digest('hex')
  },
  ripemd160(data, encoding = 'hex') {
    return new ripemd160().update(new Buffer(data, encoding)).digest('hex')
  }
}

class Address {
  constructor({ data, hash, value, hashalgs = ['sha256', 'ripemd160'] } = {}) {
    let encodings = []
    if (typeof data === 'object') {
      this.data = stringify(data)
      encodings.unshift('utf8')
    } else this.data = data

    this.hash = hash || createHash(this.data, hashalgs.reverse(), encodings)
    this.value = value
  }
  encode({ prefix, encoding } = {}) {
    this.value = encodeAddress(this.hash, prefix, encoding)
    return this.value
  }
  static decode(value, { prefix, encoding } = {}) {
    return decodeAddress(value, prefix, encoding)
  }
  static check(address, { prefix, encoding } = {}) {
    let valid = false

    try { valid = !!decodeAddress(address, prefix, encoding)}
    catch(e) { /*invalid address*/ }

    return valid
  }
}

function createHash(data, hashalgs = [], encodings = []) {
  if (!hashalgs.length) return data
  let hash = hashing[hashalgs.pop()](data, encodings.pop())
  return createHash(hash, hashalgs, encodings)
}

function encodeAddress(hash, prefix = '87', encoding = 'base58check') {
  let encoded

  switch (encoding) {
  case 'base58check': default:
    encoded = bs58check.encode(new Buffer(prefix + hash, 'hex'))
    break
  }

  return encoded
}

function decodeAddress(value, prefix = '87', encoding = 'base58check') {
  let decoded

  switch (encoding) {
  case 'base58check': default:
    decoded = bs58check.decode(value).toString('hex')//.replace(prefix, '')
    break
  }

  return decoded
}

module.exports = Address
