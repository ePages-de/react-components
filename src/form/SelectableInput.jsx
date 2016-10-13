import BaseField from './BaseField'
import CheckboxField from './CheckboxField'
import InputField from './InputField'
import React, {PropTypes} from 'react'

export default class SelectableInput extends React.Component {
  static contextTypes = {
    ...BaseField.contextTypes
  }

  static propTypes = {
    ...BaseField.propTypes,
    type: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    ...BaseField.defaultProps,
    type: 'text'
  }

  get value () {
    return this.context.formValueScope.getValue(this.props.name)
  }

  set value (newValue) {
    this.context.formValueScope.setValue(this.props.name, newValue)
  }

  render () {
    const {name, type, title, label, placeholder, ...other} = this.props
    const checkboxName = `${name}Selected`

    return <div {...other}>
      <label
        title={title}
      >
        <CheckboxField name={checkboxName}/>{label}
      </label>
      <InputField
        name={name}
        type={type}
        placeholder={placeholder}
        ref={(node) => { this.input = node }}
        disabled={!this.context.formValueScope.getValue(checkboxName)}/>
    </div>
  }

  componentDidUpdate () {
    this.input.focus()
  }
}
