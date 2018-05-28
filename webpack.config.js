var path = require('path')
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'webwallet.js',
    library: 'webwallet'
    ,libraryTarget: 'umd'
  }
  ,module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015']
        },
        exclude: [/node_modules/, /joi-browser/ ]
      }
    ]
  },
  resolve: {
    alias: {
        joi: 'joi-browser'
    }
  },
  externals: {

  },
  // devtool: 'source-map',
  plugins: [
      new UglifyJsPlugin({
          test: /\.js($|\?)/i,
          // sourceMap: true
      })
  ]
}
