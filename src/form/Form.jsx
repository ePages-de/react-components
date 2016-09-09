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
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
  }

  static defaultProps = {
    value: new Immutable.Map(),
    onSubmit: () => null,
    onChange: () => null,
    prepare: (value) => value,
    validate: () => null,
    normalize: (value) => value
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
      errors: new Immutable.Map()
    }

    this.onSubmit = this.onSubmit.bind(this)
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
      return value ? value.get(name) : undefined
    } else {
      return this.state.value.get(name)
    }
  }

  setValue = (name, value) => {
    const newValue1 = this.state.value.set(name, value)
    const newValue2 = this.props.onChange(newValue1)

    // validate while typing - second parameter (isOnSubmit) set to false
    const errors = this.props.validate(newValue2 || newValue1, false)
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

    const errors = this.props.validate(this.state.value)

    if (containsError(errors)) {
      this.setState({errors})
    } else {
      this.setState({errors: new Immutable.Map()})
      this.props.onSubmit(this.props.normalize(this.state.value))
    }
  }

  render () {
    const {name, value, onSubmit, onChange, prepare, validate, normalize, children, ...other} = this.props // eslint-disable-line no-unused-vars
    return (
      <form {...other} name={name} onSubmit={this.onSubmit} autoComplete="off">
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
