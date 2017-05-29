'use strict'

const elliptic = require('elliptic')
const ed25519 = new elliptic.ec('ed25519')

const schemes = {
  ed25519: {
    generate: ({ compressed = false } = {}) => {
      let keypair = ed25519.genKeyPair()

      return {
        scheme: 'ed25519',
        public: keypair.getPublic(compressed, 'hex'),
        private: keypair.getPrivate('hex')
      }
    }
  }
}

class KeyPair {
  static generate(options = {}) {
    let {scheme = 'ed25519'} = options
    if (!schemes[scheme]) throw new Error('invalid-scheme')

    return schemes[scheme].generate(options)
  }
}

module.exports = KeyPair
