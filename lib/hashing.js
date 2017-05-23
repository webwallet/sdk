'use strict'

const crypto = require('crypto')
const ripemd160 = require('ripemd160')

const hashFunction = {
  sha256(data, encoding = 'hex') {
    return crypto.createHash('sha256')
      .update(new Buffer(data, encoding)).digest('hex')
  },
  ripemd160(data, encoding = 'hex') {
    return new ripemd160().update(new Buffer(data, encoding)).digest('hex')
  }
}

function createHash(data, algorithms = [], encodings = []) {
  if (!algorithms.length) return data
  let hash = hashFunction[algorithms.pop()](data, encodings.pop())
  return createHash(hash, algorithms, encodings)
}

class Hash {
  static create(data, algorithms, encodings) {
    return createHash(data, algorithms.reverse(), encodings)
  }
}

module.exports = Hash
