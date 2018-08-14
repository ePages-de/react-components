/* eslint-env node */
'use strict'

const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV,
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
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /index\.html$/,
        use: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
