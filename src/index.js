'use strict'

const IOU = require('./iou')
const Keypair = require('./keypair')
const Address = require('./address')

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
