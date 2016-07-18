import unexpected from 'unexpected'
import unexpectedImmutable from 'unexpected-immutable'
import unexpectedReact from 'unexpected-react'
import unexpectedSinon from 'unexpected-sinon'

// configure test suite
unexpected.use(unexpectedImmutable)
unexpected.use(unexpectedReact)
unexpected.use(unexpectedSinon)

// require source files
const sourceContext = require.context('../src', true, /\.jsx?$/)
sourceContext.keys().forEach(sourceContext)

// require tests
const testContext = require.context('.', true, /\.spec\.jsx?$/)
testContext.keys().forEach(testContext)
