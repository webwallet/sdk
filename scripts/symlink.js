'use strict'

const fs = require('fs')
const path = require('path')
const [,, lib = 'lib'] = process.argv

let target = path.resolve(__dirname, '../', lib)
let symlink = path.resolve(__dirname, '../', 'node_modules', '*' + lib)
let nodeModules = `${__dirname}\/..\/node_modules`

if(!fs.existsSync(nodeModules)) fs.mkdirSync(nodeModules)
if(!fs.existsSync(symlink)) fs.symlinkSync(target, symlink)
