// mute some warnings and make everything else an error
console.error = function (message) { // eslint-disable-line no-console
  throw new Error(message)
}
console.warning = function (message) { // eslint-disable-line no-console
  throw new Error(message)
}

// configure test suite
const unexpected = require('unexpected')
const unexpectedImmutable = require('unexpected-immutable')
const unexpectedReact = require('unexpected-react')
const unexpectedSinon = require('unexpected-sinon')
unexpected.use(unexpectedImmutable)
unexpected.use(unexpectedReact)
unexpected.use(unexpectedSinon)
