'use strict'

const IOU = require('./lib/iou')
const Keypair = require('./lib/keypair')
const Address = require('./lib/address')

module.exports = {
  iou: {
    write: (claims) => new IOU(claims)
  },
  keypair: Keypair,
  address: {
    generate: (params) => new Address(params),
    decode: Address.decode,
    check: Address.check
  }
}
