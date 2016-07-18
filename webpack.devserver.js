/* eslint-env node */
/* eslint-disable no-console */
'use strict'

const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const WebpackDevServer = require('webpack-dev-server')

const port = 3000
const config = require('./webpack.config.js')
config.entry.unshift(`webpack-dev-server/client?http://localhost:${port}/`, 'webpack/hot/dev-server')
config.plugins.unshift(new webpack.HotModuleReplacementPlugin())

const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(compiler, {
  hot: true,
  inline: true,
  historyApiFallback: true,
  // reduce the console noise
  stats: {
    assets: false,
    colors: true,
    version: false,
    modules: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    reasons: false,
    cached: true,
    chunkOrigins: true,
    children: false
  }
})

server.listen(port, (err) => {
  if (err) return console.err(err)
  console.log(`Now listening on http://localhost:${port}`)
})
