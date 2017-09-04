import PropTypes from 'prop-types'
import React from 'react'

export class PropsSetter extends React.Component {
  static propTypes = {
    component: PropTypes.any.isRequired
  }

  constructor (props) {
    super(props)
    const {component, ...other} = props
    this.state = other
  }

  setProps (props) {
    this.setState(props)
  }

  render () {
    const {component: Component} = this.props
    return <Component {...this.state} />
  }
}
