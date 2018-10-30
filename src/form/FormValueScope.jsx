import PropTypes from 'prop-types'
import React from 'react'

function parseName(name) {
  // only split string names by dots, but keep non string names (for example number names
  // like in IteratorField) as they are
  return typeof name === 'string' ? name.split(/\./g) : [name]
}

// is kind of inherited by Form
// make sure to mirror changes in here also in Form
export default class FormValueScope extends React.Component {
  static contextTypes = {
    formValueScope: PropTypes.object.isRequired
  }

  static propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    children: PropTypes.element.isRequired
  }

  get name() {
    const outerScope = this.context.formValueScope
    const ownName = this.props.name
    return `${outerScope.name}.${ownName}`
  }

  render() {
    return this.props.children
  }

  getValue = name => {
    const outerScope = this.context.formValueScope
    const ownName = this.props.name
    const value = outerScope.getValue(ownName)

    if (name !== undefined && name !== null) {
      return value ? value.getIn(parseName(name)) : undefined
    } else {
      return value
    }
  }

  setValue = (name, value) => {
    const outerScope = this.context.formValueScope
    const ownName = this.props.name

    if (name !== undefined && name !== null) {
      return outerScope.setValue(
        ownName,
        outerScope.getValue(ownName).setIn(parseName(name), value)
      )
    } else {
      return outerScope.setValue(ownName, value)
    }
  }

  getError = name => {
    const outerScope = this.context.formValueScope
    const ownName = this.props.name
    const error = outerScope.getError(ownName)
    return error ? error.getIn(parseName(name)) : undefined
  }

  static childContextTypes = {
    formValueScope: PropTypes.object
  }

  getChildContext() {
    return {
      formValueScope: this
    }
  }
}
