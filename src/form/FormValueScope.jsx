import React, {PropTypes} from 'react'

export default class FormValueScope extends React.Component {
  static contextTypes = {
    formValueScope: PropTypes.object
  }

  static propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    children: PropTypes.element.isRequired
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

  render () {
    return this.props.children
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
    const outerScope = this.context.formValueScope
    if (outerScope) {
      const ownName = this.props.name
      return outerScope.setValue(ownName, outerScope.getValue(ownName).set(name, value))
    } else {
      const newValue = this.state.value.set(name, value)
      this.setState({value: newValue})
      return newValue
    }
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

  static childContextTypes = {
    formValueScope: PropTypes.object
  }

  getChildContext () {
    return {
      formValueScope: this
    }
  }
}
