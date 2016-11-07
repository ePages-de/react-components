import FormValueScope from './FormValueScope'
import Immutable from 'immutable'
import React, {PropTypes} from 'react'

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
    const outerScope = this.context.formValueScope
    const ownName = this.props.name
    if (outerScope) {
      return `${outerScope.name}.${ownName}`
    } else {
      return ownName
    }
  }

  constructor (props) {
    super()

    this.state = {
      value: props.prepare(props.value),
      errors: new Immutable.Map(),
      triedToSubmit: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({value: nextProps.prepare(nextProps.value)})
    }
  }

  getValue = (name) => {
    const outerScope = this.context.formValueScope
    if (outerScope) {
      const ownName = this.props.name
      const value = outerScope.getValue(ownName)

      if (name !== undefined && name !== null) {
        return value ? value.getIn(parseName(name)) : undefined
      } else {
        return value
      }
    } else {
      if (name !== undefined && name !== null) {
        return this.state.value.getIn(parseName(name))
      } else {
        return this.state.value
      }
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

  getError = (name) => {
    const outerScope = this.context.formValueScope
    if (outerScope) {
      const ownName = this.props.name
      const error = outerScope.getError(ownName)
      return error ? error.get(name) : undefined
    } else {
      return this.state.errors.get(name)
    }
  }

  submit = () => this.onSubmit({preventDefault: () => {}})

  onSubmit = (event) => {
    event.preventDefault()

    if (!this.props.disabled) {
      const errors = this.props.validate(this.state.value, true)

      if (containsError(errors)) {
        this.setState({errors, triedToSubmit: true})
      } else {
        this.setState({errors: new Immutable.Map()})
        this.props.onSubmit(this.props.normalize(this.state.value))
      }
    }
  }

  render () {
    const {name, value, onSubmit, onChange, prepare, validate, normalize, disabled, children, ...other} = this.props // eslint-disable-line no-unused-vars
    return (
      <form autoComplete="off" {...other} name={name} onSubmit={this.onSubmit}>
        {typeof children === 'function' ? children(this.state.value) : children}
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
