/* eslint-env node */
'use strict'

const webpackConfig = require('./webpack.config')

module.exports = function (karmaConfig) {
  const config = {
    basePath: '.',
    frameworks: [
      'mocha',
      'es6-shim'
    ],
    webpack: {
      module: {
        loaders: webpackConfig.module.loaders.concat([
          {
            test: /\.json$/,
            loader: 'json'
          }
        ])
      },
      resolve: {
        extensions: ['', '.js', '.jsx']
      },
      devtool: 'inline-source-map'
    },
    webpackMiddleware: {
      noInfo: true
    },
    files: [
      'test/test.js'
    ],
    preprocessors: {
      'test/test.js': ['webpack', 'sourcemap']
    },
    reporters: ['spec', 'coverage'],
    browsers: ['PhantomJS'],
    reportSlowerThan: 250,
    singleRun: true,
    client: {
      mocha: {
        timeout: 5000
      }
    }
  }

  config.coverageReporter = {
    reporters: [
      {type: 'lcov', dir: 'report/'},
      {type: 'json', dir: 'report/', file: 'coverage.json'},
      {type: 'text-summary'}
    ]
  }

  karmaConfig.set(config)
}
