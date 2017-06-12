import Immutable from 'immutable'
import PropTypes from 'prop-types'
import React from 'react'

import FormValueScope from './FormValueScope'

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
    normalize: (value) => value,
    disabled: false
  }

  get name () {
    return this.props.name
  }

  constructor (props) {
    super()

    this.state = {
      value: props.prepare(props.value),
      errors: new Immutable.Map(),
      triedToSubmit: false,
      pristine: true,
      submitting: false
    }
  }

  componentDidReceiveProps (prevProps) {
    if (prevProps.value !== this.props.value) {
      this.reset()
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

    const errors = this.props.validate(newValue2 || newValue1, this.state.triedToSubmit)
    this.setState({
      errors: containsError(errors) ? errors : new Immutable.Map(),
      value: newValue2 || newValue1
    })
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
      const errors = this.props.validate(this.state.value, true)

      if (containsError(errors)) {
        this.setState({errors, triedToSubmit: true})
      } else {
        this.setState({errors: new Immutable.Map()})
        const result = this.props.onSubmit(this.props.normalize(this.state.value))

        if (result && typeof result.then === 'function') {
          this.setState({submitting: true})
          result.catch(() => {}).then(() => this.setState({submitting: false}))
        }
      }
    }
  }

  render () {
    const {name, value, onSubmit, onChange, prepare, validate, normalize, disabled, children, ...other} = this.props // eslint-disable-line no-unused-vars
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
