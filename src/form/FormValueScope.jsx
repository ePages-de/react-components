import PropTypes from 'prop-types'
import React from 'react'

import { FormScopeValueContext } from './Form'

function parseName (name) {
  // only split string names by dots, but keep non string names (for example number names
  // like in IteratorField) as they are
  return typeof name === 'string' ? name.split(/\./g) : [name]
}

// is kind of inherited by Form
// make sure to mirror changes in here also in Form
class FormValueScope extends React.Component {
  static contextType = FormScopeValueContext

  static propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    children: PropTypes.element.isRequired
  }

  get name () {
    const outerScope = this.context
    const ownName = this.props.name
    return `${outerScope.name}.${ownName}`
  }

  render () {
    console.log('rerendering FormValueScope')
    return (
      <FormScopeValueContext.Provider value={this}>
        {this.props.children}
      </FormScopeValueContext.Provider>
    )
  }

  getValue = (name) => {
    const outerScope = this.context
    const ownName = this.props.name
    const value = outerScope.getValue(ownName)

    let result
    if (name !== undefined && name !== null) {
      result = value ? value.getIn(parseName(name)) : undefined
    } else {
      result = value
    }

    console.log('formValueScope result:')
    console.log(result)
    return result
  }

  setValue = (name, value) => {
    const outerScope = this.context
    const ownName = this.props.name
    console.log('formValueScope setValue')
    console.log(`ownName=${ownName}`)

    if (name !== undefined && name !== null) {
      return outerScope.setValue(ownName, outerScope.getValue(ownName).setIn(parseName(name), value))
    } else {
      console.log('else setValue')
      return outerScope.setValue(ownName, value)
    }
  }

  getError = (name) => {
    const outerScope = this.context
    const ownName = this.props.name
    const error = outerScope.getError(ownName)
    return error ? error.getIn(parseName(name)) : undefined
  }
}

export default FormValueScope
