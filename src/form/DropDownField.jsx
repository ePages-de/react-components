import BaseField from './BaseField'
import React, {PropTypes} from 'react'

export default class DropDownField extends React.Component {
  static contextTypes = {
    ...BaseField.contextTypes
  }

  static propTypes = {
    ...BaseField.propTypes,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired
  }

  static defaultProps = {
    ...BaseField.defaultProps
  }

  get value () {
    return this.context.formValueScope.getValue(this.props.name)
  }

  set value (newValue) {
    this.context.formValueScope.setValue(this.props.name, newValue)
  }

  render () {
    const {name, options, ...other} = this.props // eslint-disable-line no-unused-vars

    return (
      <select
        {...other}
        name={`${this.context.formValueScope.name}.${name}`}
        value={this.value}
        onChange={this.onChange}>
        {options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
      </select>
    )
  }

  onChange = (event) => {
    this.value = event.target.value
  }
}
