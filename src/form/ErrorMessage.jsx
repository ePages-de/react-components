import PropTypes from 'prop-types'
import React from 'react'

export default class ErrorMessage extends React.Component {
  static contextTypes = {
    formValueScope: PropTypes.object.isRequired
  }

  static propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    Component: PropTypes.any
  }

  static defaultProps = {
    Component: 'div'
  }

  render () {
    const {name, Component, ...other} = this.props
    const errorMessage = this.context.formValueScope.getError(name)
    return errorMessage ? <Component {...other}>{errorMessage}</Component> : null
  }
}
