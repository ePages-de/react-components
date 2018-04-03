/**
 * Ensures that at most one promise is running at a time.
 * Might discard promises that come in while another promise is running.
 * Ensures that the last promise is executed after the one slot is free again.
 *
 * @returns {linearizer} Linearizing function
 */
export default function createPromiseLinearizer () {
  let waiting = []
  let next = null
  let running = null

  function clear (keepLastWaiting = false) {
    waiting = keepLastWaiting ? waiting.slice(waiting.length - 1, waiting.length) : []
    next = null
    running = null
  }

  function end (waiter, err, res) {
    if (!err) {
      waiter.resolve(res)
    } else {
      waiter.reject(err)
    }
  }

  function done (err, res) {
    if (!next) {
      end(waiting[0], err, res)
      clear()
    } else {
      const allButLast = waiting.slice(0, waiting.length - 1)
      const last = next
      clear(true)

      allButLast.forEach(waiter => end(waiter, err, res))

      running = last()
        .then(res => done(null, res))
        .catch(err => done(err))
    }

    return null
  }

  return function linearizer (promiseCreator) {
    if (!running) {
      running = promiseCreator()
        .then(res => done(null, res))
        .catch(err => done(err))
      return new Promise((resolve, reject) => waiting.push({ resolve, reject }))
    }

    next = promiseCreator
    return new Promise((resolve, reject) => waiting.push({ resolve, reject }))
  }
}
