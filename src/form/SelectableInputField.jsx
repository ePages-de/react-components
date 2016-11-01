import formField from './formField'
import InputField from './InputField'
import React, {PropTypes} from 'react'

class SelectableInputField extends React.Component {
  static contextTypes = {
    formValueScope: PropTypes.any.isRequired
  }

  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    fullName: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    type: 'text'
  }

  render () {
    const {formValueScope} = this.context
    const {value, onChange, name, fullName, type, title, label, placeholder, ...other} = this.props // eslint-disable-line no-unused-vars
    const checkboxName = `${name}Selected`
    const checkboxFullName = `${fullName}Selected`

    return <div {...other}>
      <label title={title}>
        <input
          name={checkboxFullName}
          type="checkbox"
          checked={formValueScope.getValue(checkboxName)}
          onChange={(event) => {
            formValueScope.setValue(checkboxName, event.target.checked)
            if (event.target.checked) {
              // give time for the input field to be enabled
              window.setTimeout(() => this.inputField && this.inputField.focus(), 0)
            }
          }}/>
        {label}
      </label>
      <InputField
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={!this.context.formValueScope.getValue(checkboxName)}
        ref={(component) => { this.inputField = component }}/>
    </div>
  }
}

export default formField()(SelectableInputField)
