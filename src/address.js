'use strict'

const bs58check = require('bs58check')
const stringify = require('json-stable-stringify')
const createHash = require('@webwallet/cryptools').hashing.create

function encode(hash, { prefix = '87', encoding = 'base58check' } = {}) {
  let encoded

  switch (encoding) {
  case 'base58check': default:
    encoded = bs58check.encode(new Buffer(prefix + hash, 'hex'))
    break
  }

  return encoded
}

const generate = ((encode, { data, hashing, format = {} } = {}) => {
  let hashTypes = (hashing instanceof Array) ? hashing : ['sha256', 'ripemd160']
  let hashInput = data
  let encodings = []

  if (typeof data === 'object') {
    hashInput = stringify(data)
    encodings.unshift('utf8')
  }

  let hash = createHash(hashInput, hashTypes, encodings)
  let address = (format) ? encode(hash, format) : hash
  return address
}).bind(null, encode)

function decode(address, { prefix = '87', encoding = 'base58check' } = {}) {
  let decoded

  switch (encoding) {
  case 'base58check': default:
    decoded = bs58check.decode(address).toString('hex')
    if (decoded.indexOf(prefix) === 0) {
      decoded = decoded.replace(prefix, '')
    }
    break
  }

  return decoded
}

const validate = ((decode, address, { prefix, encoding } = {}) => {
  let valid = false
  try { valid = !!decode(address, {prefix, encoding}) }
  catch(e) { /*invalid address*/ }

  return valid
}).bind(null, decode)

module.exports = {
  generate,
  validate,
  encode,
  decode
}
