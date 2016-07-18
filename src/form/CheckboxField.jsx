import BaseField from './BaseField'
import React, {PropTypes} from 'react'

export default class CheckboxField extends React.Component {
  static contextTypes = {
    ...BaseField.contextTypes
  }

  static propTypes = {
    ...BaseField.propTypes,
    negate: PropTypes.bool
  }

  static defaultProps = {
    ...BaseField.defaultProps,
    negate: false
  }

  render () {
    const {name, negate, ...other} = this.props // eslint-disable-line no-unused-vars
    return <input {...other}
      name={`${this.context.formValueScope.name}.${name}`}
      type="checkbox"
      checked={this.transformValue(this.context.formValueScope.getValue(name))}
      onChange={this.onChange}/>
  }

  onChange = (event) => {
    this.context.formValueScope.setValue(this.props.name, this.transformValue(event.target.checked))
  }

  transformValue = (value) => {
    return this.props.negate ? !value : value
  }
}
