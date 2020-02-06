import PropTypes from 'prop-types'
import React from 'react'

import { FormScopeValueContext } from './Form'

class ErrorMessage extends React.Component {
  static propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    Component: PropTypes.any
  }

  static defaultProps = {
    Component: 'div'
  }

  render () {
    const { name, Component, ...other } = this.props
    const errorMessage = this.context.instance.getError(name)
    return errorMessage ? <Component {...other}>{errorMessage}</Component> : null
  }
}

ErrorMessage.contextType = FormScopeValueContext

export default ErrorMessage
