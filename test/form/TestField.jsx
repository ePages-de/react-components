import BaseField from '../../src/form/BaseField'
import React, {PropTypes} from 'react'

export default class TestField extends React.Component {
  static contextTypes = {
    ...BaseField.contextTypes
  }

  static propTypes = {
    name: PropTypes.string.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    this.context.formValueScope.setValue(this.props.name, event.target.value)
  }

  render () {
    const {name, ...other} = this.props
    return <input {...other}
      name={`${this.context.formValueScope.name}.${name}`}
      type="text"
      value={this.context.formValueScope.getValue(name)}
      onChange={this.onChange}/>
  }
}
