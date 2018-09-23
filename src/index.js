'use strict'

const iou = require('./iou')
const Address = require('./address')
const keypair = require('@webwallet/cryptools').keypair

module.exports = {
  iou: iou,
  keypair: keypair,
  address: {
    generate: (params) => new Address(params),
    decode: Address.decode,
    check: Address.check
  }
}
