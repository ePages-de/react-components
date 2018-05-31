import Immutable from 'immutable'
import PropTypes from 'prop-types'
import React from 'react'

import FormValueScope from './FormValueScope'

// Creates a debounced version of `func` that receives its arguments as first,
// and a callback function as second argument. When invoked multiple times, the
// callback function is only called for the last invocation of `func`.
function createValidateFunc (func, waitMs = 0) {
  let timer = null
  let lastPendingId = 0

  function run (args, doneFunc) {
    const currentPendingId = lastPendingId + 1
    const result = func(...args)

    lastPendingId = currentPendingId
    timer = null

    if (result && typeof result.then === 'function') {
      result.then((...args) => {
        if (lastPendingId === currentPendingId) {
          doneFunc(...args)
        }
      })
    } else {
      doneFunc(result)
    }
  }

  return (args, doneFunc, runImmediately = false) => {
    if (timer) window.clearTimeout(timer)

    if (waitMs === null || runImmediately) {
      run(args, doneFunc)
    } else {
      timer = window.setTimeout(() => run(args, doneFunc), waitMs)
    }
  }
}

function containsError (errors) {
  if (!errors) {
    return false
  } else if (Immutable.Iterable.isIterable(errors)) {
    return errors.reduce((res, item) => {
      if (res) {
        return true
      } else if (!item) {
        return false
      } else if (typeof item === 'string') {
        return true
      } else {
        return containsError(item)
      }
    }, false)
  } else {
    throw new Error()
  }
}

function parseName (name) {
  // only split string names by dots, but keep non string names (for example number names
  // like in IteratorField) as they are
  return typeof name === 'string' ? name.split(/\./g) : [name]
}

// kind of inherits from FormValueScope
// make sure to mirror changes in FormValueScope here
export default class Form extends React.Component {
  static propTypes = {
    ...FormValueScope.propTypes,
    value: PropTypes.any,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    prepare: PropTypes.func,
    validate: PropTypes.func,
    validateWaitMs: PropTypes.number,
    normalize: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
  }

  static defaultProps = {
    value: new Immutable.Map(),
    onSubmit: () => null,
    onChange: () => null,
    prepare: (value) => value,
    validate: () => null,
    validateWaitMs: null,
    normalize: (value) => value,
    disabled: false
  }

  get name () {
    return this.props.name
  }

  constructor (props) {
    super(props)

    this.state = {
      value: props.prepare(props.value),
      errors: new Immutable.Map(),
      triedToSubmit: false,
      pristine: true,
      submitting: false
    }

    this.validate = createValidateFunc(props.validate, props.validateWaitMs)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.prepare(nextProps.value),
        errors: new Immutable.Map(),
        triedToSubmit: false,
        pristine: true,
        submitting: false
      })
    }
  }

  getValue = (name) => {
    if (name !== undefined && name !== null) {
      return this.state.value.getIn(parseName(name))
    } else {
      return this.state.value
    }
  }

  setValue = (name, value) => {
    const newValue1 = name !== undefined && name !== null
      ? this.state.value.setIn(parseName(name), value)
      : value
    const newValue2 = this.props.onChange(newValue1)
    const newValue = newValue2 || newValue1

    this.setState({
      value: newValue
    })

    this.validate(
      [newValue, this.state.triedToSubmit, name],
      validationResult => {
        this.setState({
          errors: containsError(validationResult) ? validationResult : new Immutable.Map()
        })
      }
    )
  }

  reset = () => {
    this.setState({
      value: this.props.prepare(this.props.value),
      errors: new Immutable.Map(),
      triedToSubmit: false,
      pristine: true,
      submitting: false
    })
  }

  getError = (name) => {
    return this.state.errors.getIn(parseName(name))
  }

  submit = () => this.onSubmit({preventDefault: () => {}})

  onSubmit = (event) => {
    event.preventDefault()
    if (!this.props.disabled && !this.state.submitting) {
      this.validate(
        [this.state.value, true, null],
        validationResult => {
          if (containsError(validationResult)) {
            this.setState({errors: validationResult, triedToSubmit: true})
          } else {
            this.setState({errors: new Immutable.Map()})

            const result = this.props.onSubmit(this.props.normalize(this.state.value))
            if (result && typeof result.then === 'function') {
              this.setState({submitting: true})
              result.catch(() => {}).then(() => this.setState({submitting: false}))
            }
          }
        },
        true
      )
    }
  }

  render () {
    const {name, value, onSubmit, onChange, prepare, validate, validateWaitMs, normalize, disabled, children, ...other} = this.props // eslint-disable-line no-unused-vars
    return (
      <form autoComplete="off" {...other} name={name} onSubmit={this.onSubmit}>
        {typeof children === 'function' ? children({
          value: this.state.value,
          pristine: Immutable.is(value, this.state.value),
          submitting: this.state.submitting,
          reset: () => this.reset()
        }) : children}
      </form>
    )
  }

  static childContextTypes = {
    formValueScope: PropTypes.object
  }

  getChildContext () {
    return {
      formValueScope: this
    }
  }
}
