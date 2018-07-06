'use strict'

const elliptic = require('elliptic')
const ed25519 = new elliptic.ec('ed25519')

const schemes = {
  ed25519: {
    sign: (hash, key) => {
      return ed25519.sign(hash, key).toDER('hex')
    },
    verify: () => {

    }
  }
}

class Signature {
  static generate(hash, key) {
    let scheme = schemes[key.scheme]
    if (!scheme) {return {error: 'invalid-signature-scheme'}}

    let signature = scheme.sign(hash, key.secret)

    return {
      scheme: key.scheme,
      signer: key.signer,
      public: key.public,
      string: signature
    }
  }
  static verify() {

  }
}

module.exports = Signature
