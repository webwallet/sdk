# sdk
WebWallet SDK for Node

## Usage
```
npm install @webwallet/sdk
```

``` js
const sdk = require('@webwallet/sdk')

/* Generate cryptographic keys and addresses */
let source = sdk.keypair.generate()
let target = sdk.keypair.generate()

/* Generate wallet addresses from public keys */
source.signer = sdk.address.generate({data: source.public}).encode()
target.signer = sdk.address.generate({data: source.public}).encode()

/* Prepare IOU claims */
let claims = {
  domain: 'wallet.example.com',
  source: source.signer,
  target: target.signer,
  amount: '100', // must be a big-number string
  symbol: source.signer, // source === issuer
  expiry: (/*some date*/).toISOString()
}

/* Write and sign IOU */
let signers = [source]
let iou = sdk.iou.write(claims).sign(signers)

/* Build transaction request body */
let body = {
  data: {
    inputs: [iou]
  }
}

/* Send transaction request */
//...

```
