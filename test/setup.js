// mute some warnings and make everything else an error
console.error = function(message) {
  // eslint-disable-line no-console
  throw new Error(message)
}
console.warn = function(message) {
  // eslint-disable-line no-console
  throw new Error(message)
}
process.on('unhandledRejection', error => {
  throw new Error('unhandledRejection: ' + error.message)
})
// mock unavailable window stuff
if (typeof window !== 'undefined') {
  window.requestAnimationFrame = function(fn) {
    window.setTimeout(fn, 1000 / 60)
  }
}

// configure test suite
const unexpected = require('unexpected')
const unexpectedImmutable = require('unexpected-immutable')
const unexpectedReact = require('unexpected-react')
const unexpectedSinon = require('unexpected-sinon')
unexpected.use(unexpectedImmutable)
unexpected.use(unexpectedReact)
unexpected.use(unexpectedSinon)
