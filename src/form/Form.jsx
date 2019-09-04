import Immutable, { is as isEqual } from 'immutable'
import diff from 'immutablediff'
import PropTypes from 'prop-types'
import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

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
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    externalErrors: ImmutablePropTypes.map,
    handleUnmappedErrors: PropTypes.func,
    onError: PropTypes.func
  };

  static defaultProps = {
    value: new Immutable.Map(),
    onSubmit: () => null,
    onChange: () => null,
    prepare: (value) => value,
    validate: () => null,
    validateWaitMs: null,
    normalize: (value) => value,
    disabled: false,
    externalErrors: null,
    handleUnmappedErrors: () => null,
    onError: () => null
  };

  get name () {
    return this.props.name
  }

  updatedExternalErrors = false;

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

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps (nextProps) {
    const serverErrors =
      nextProps.externalErrors &&
      nextProps.externalErrors.size > 0
        ? { errors: nextProps.externalErrors }
        : null

    if (!isEqual(this.props.value, nextProps.value)) {
      this.setState(
        {
          value: nextProps.prepare(nextProps.value),
          errors: (serverErrors && serverErrors.errors) || new Immutable.Map(),
          triedToSubmit: false,
          pristine: true,
          submitting: false
        },
        () => {
          this.handleUnmappedServerErrors(serverErrors)
          this.props.onError(nextProps.externalErrors, true)
        }
      )
    } else {
      this.setState(serverErrors, () => {
        this.handleUnmappedServerErrors(serverErrors)
        this.props.onError(nextProps.externalErrors, true)
      })
    }
  }

  componentWillUnmount () {
    this.willUnmount = true
  }

  getValue = (name) => {
    if (name !== undefined && name !== null) {
      return this.state.value.getIn(parseName(name))
    } else {
      return this.state.value
    }
  }

  // in case if we have validation error with property which is not in form (or can't be mapped to form due to response)
  handleUnmappedServerErrors = (serverErrors) => {
    if (serverErrors && serverErrors.errors && serverErrors.errors.size > 0) {
      const formFieldsStructure = this.getFormFieldsStructure()
      const [...serverErrorKeys] = serverErrors.errors.keys()

      // we getting only first one
      const unmappedErrorKey = serverErrorKeys.find(
        (el) => !formFieldsStructure.includes(el)
      )

      if (unmappedErrorKey) {
        const unmappedOutputObject = {
          field: unmappedErrorKey,
          message: serverErrors.errors.get(unmappedErrorKey)
        }

        this.props.handleUnmappedErrors(unmappedOutputObject)
      }
    }
  }

  getFormValuesFirstDifference = (currentValue, newValue) => {
    const differences = diff(currentValue, newValue)
    const replaceOperation = 'replace'

    if (differences) {
      const firstDifference = differences
        .filter((entry) => entry.get('op') === replaceOperation)
        .first()

      if (firstDifference && firstDifference.size > 0) {
        return firstDifference
          .get('path')
          .split('/')
          .filter(Boolean)
      }
    }
  }

  getChangedCompleteErrorList = (currentValue, newValue, serverErrors) => {
    const path = this.getFormValuesFirstDifference(currentValue, newValue)

    if (path && serverErrors.hasIn(path)) {
      return serverErrors.setIn(path, false)
    }

    return serverErrors
  }

  setValue = (name, value) => {
    const newValue1 = name !== undefined && name !== null
      ? this.state.value.setIn(parseName(name), value)
      : value

    const newValue2 = this.props.onChange(newValue1)
    const newValue = newValue2 || newValue1

    const externalErrors =
      this.updatedExternalErrors || this.props.externalErrors

    // because only one field value could be change at the time
    const updatedErrorList =
      externalErrors &&
      externalErrors.size > 0 &&
      this.getChangedCompleteErrorList(
        this.state.value,
        newValue,
        externalErrors
      )

    this.setState({
      value: newValue
    })

    this.validate(
      [newValue, this.state.triedToSubmit, name],
      validationResult => {
        // in case we have errors in server and client at the same time we merging it
        if (updatedErrorList && updatedErrorList.size > 0) {
          validationResult = validationResult
            ? validationResult.mergeDeepWith((oldVal, newVal) => {
              return oldVal && oldVal !== false ? oldVal : newVal
            }, updatedErrorList)
            : updatedErrorList
        }

        this.updatedExternalErrors = updatedErrorList

        const hasErrors = containsError(validationResult)

        if (hasErrors) {
          this.props.onError(validationResult, false)
        }

        this.setState({
          errors: hasErrors ? validationResult : new Immutable.Map()
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

  getFormFieldsStructure = () => {
    if (this.props.value && this.props.value.size > 0) {
      return [...this.props.value.keys()]
    }
  }

  getError = (name) => {
    return this.state.errors.getIn(parseName(name))
  }

  submit = () => this.handleSubmit({ preventDefault: () => {} })

  handleSubmit = (event) => {
    event.preventDefault()

    if (!this.props.disabled && !this.state.submitting) {
      this.validate(
        [this.state.value, true, null],

        validationResult => {
          if (containsError(validationResult)) {
            this.props.onError(validationResult, true)
            this.setState({ errors: validationResult, triedToSubmit: true })
          } else {
            this.setState({ errors: new Immutable.Map() })

            const result = this.props.onSubmit(this.props.normalize(this.state.value))
            if (result && typeof result.then === 'function') {
              this.setState({ submitting: true })
              result.catch(() => {}).then(() => this.willUnmount || this.setState({ submitting: false }))
            }
          }

          this.updatedExternalErrors = false
        },
        true
      )
    }
  }

  render () {
    const {
      name,
      value,
      onSubmit,
      onChange,
      prepare,
      validate,
      validateWaitMs,
      normalize,
      disabled,
      children,
      externalErrors,
      handleUnmappedErrors,
      onError,
      ...other
    } = this.props

    return (
      <form autoComplete="off" {...other} name={name} onSubmit={this.handleSubmit}>
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
