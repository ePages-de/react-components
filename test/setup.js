// mute some warnings and make everything else an error
console.error = function (message) { // eslint-disable-line no-console
  throw new Error(message)
}
console.warn = function (message) { // eslint-disable-line no-console
  throw new Error(message)
}
process.on('unhandledRejection', error => {
  throw new Error('unhandledRejection: ' + error.message)
})
// mock unavailable window stuff
if (typeof window !== 'undefined') {
  window.requestAnimationFrame = function (fn) {
    window.setTimeout(fn, 1000 / 60)
  }
}

// This require is necessary because `unexpected-react` must be required before `react`.
// See: https://github.com/bruderstein/unexpected-react/tree/6be72d34ae571d1b095a1701a1181837d9d89b5a#with-the-full-virtual-dom-all-custom-components-and-the-dom-elements
// Otherwise, tests would fail with an error: "The global rendering hook is not attached".
require('unexpected-react')
