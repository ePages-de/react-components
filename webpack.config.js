/* eslint-env node */
'use strict'

const path = require('path')

module.exports = {
  context: path.resolve('./src'),
  entry: [
    '../public/index.html',
    '../public/index.js'
  ],
  output: {
    filename: 'app.js',
    path: path.resolve('./build'),
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /index\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
