import Bluebird from 'bluebird'
import sinon from 'sinon'
import expect from 'unexpected'

import createPromiseLinearizer from '../../src/utils/createPromiseLinearizer'

describe('createPromiseLinearizer', function () {
  it('does not interfere with non parallel promises', function () {
    const spy1 = sinon.spy(() => Bluebird.delay(10).return(1))
    const spy2 = sinon.spy(() => Bluebird.delay(10).return(2))
    const spy3 = sinon.spy(() => Bluebird.delay(10).return(3))
    const linearizer = createPromiseLinearizer()

    return expect(linearizer(() => spy1()), 'when fulfilled', 'to equal', 1)
      .then(() =>
        expect(linearizer(() => spy2()), 'when fulfilled', 'to equal', 2).then(() =>
          expect(linearizer(() => spy3()), 'when fulfilled', 'to equal', 3)
        )
      )
      .then(() => {
        expect(spy1, 'was called once')
        expect(spy2, 'was called once')
        expect(spy3, 'was called once')
      })
  })

  it('ensures only one promise at a time when parallel', function () {
    const spy1 = sinon.spy(() => Bluebird.delay(10).return(1))
    const spy2 = sinon.spy(() => Bluebird.delay(10).return(2))
    const spy3 = sinon.spy(() => Bluebird.delay(10).return(3))
    const spy4 = sinon.spy(() => Bluebird.delay(10).return(4))
    const linearizer = createPromiseLinearizer()

    return expect.promise
      .all([
        expect(linearizer(() => spy1()), 'when fulfilled', 'to equal', 1),
        expect(linearizer(() => spy2()), 'when fulfilled', 'to equal', 1),
        expect(linearizer(() => spy3()), 'when fulfilled', 'to equal', 1),
        expect(linearizer(() => spy4()), 'when fulfilled', 'to equal', 4),
      ])
      .then(() => {
        expect(spy1, 'was called once')
        expect(spy2, 'was not called')
        expect(spy3, 'was not called')
        expect(spy4, 'was called once')
      })
  })
})
