'use strict'

const joi = require('joi')
const crypto = require('crypto')

const schema = joi.object().keys({
  iss: joi.string().label('domain').default('www'),
  sub: joi.string().label('source').required(),
  aud: joi.string().label('target').required(),
  amt: joi.string().label('amount').required(),
  cru: joi.string().label('symbol').required(),
  nce: joi.string().label('random').default(random(), 'nonce'),
  nbf: joi.date().iso().label('notBefore'),
  exp: joi.date().iso().label('expires')
})
  .rename('domain', 'iss')
  .rename('source', 'sub')
  .rename('target', 'aud')
  .rename('amount', 'amt')
  .rename('symbol', 'cru')
  .rename('random', 'nce')
  .rename('notBefore', 'nbf')
  .rename('expires', 'exp')

function random(length = 10) {
  return () => crypto.randomBytes(length).toString('hex')
}

module.exports = schema
