'use strict'

const elliptic = require('elliptic')
const ecdsaEd25519 = new elliptic.ec('ed25519')
const eddsaEd25519 = new elliptic.eddsa('ed25519')

const schemes = {
  'ecdsa-ed25519': {
    generate: ({ encoding = 'hex', compressed = false } = {}) => {
      let keypair = ecdsaEd25519.genKeyPair()

      return {
        scheme: 'ecdsa-ed25519',
        public: keypair.getPublic(compressed, encoding),
        secret: keypair.getPrivate(encoding)
      }
    }
  },
  'eddsa-ed25519': {
    generate: ({ encoding = 'hex' } = {}) => {
      let ecdsaPrivate = ecdsaEd25519.genKeyPair().getPrivate(encoding)
      let eddsaKeypair = eddsaEd25519.keyFromSecret(ecdsaPrivate)

      return {
        scheme: 'eddsa-ed25519',
        public: eddsaKeypair.getPublic(encoding),
        secret: eddsaKeypair.getSecret(encoding)
      }
    }
  }
}

class KeyPair {
  static generate(options = {}) {
    let {scheme = 'ecdsa-ed25519'} = options
    if (!schemes[scheme]) throw new Error('invalid-scheme')

    return schemes[scheme].generate(options)
  }
}

module.exports = KeyPair
