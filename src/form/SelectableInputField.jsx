import PropTypes from 'prop-types'
import React from 'react'

import InputField from './InputField'
import formField from './formField'

class SelectableInputFieldRaw extends React.Component {
  static contextTypes = {
    formValueScope: PropTypes.any.isRequired
  }

  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    type: 'text'
  }

  render () {
    const { formValueScope } = this.context
    const { value, onChange, name, scopedName, type, title, label, placeholder, ...other } = this.props
    const checkboxName = `${name}Selected`
    const scopedCheckboxName = `${scopedName}Selected`

    return <div {...other}>
      <label title={title}>
        <input
          name={scopedCheckboxName}
          type="checkbox"
          checked={formValueScope.getValue(checkboxName)}
          onChange={(event) => {
            formValueScope.setValue(checkboxName, event.target.checked)
            if (event.target.checked) {
              // give time for the input field to be enabled
              window.setTimeout(() => this.inputField.focus(), 0)
            }
          }} />
        {label}
      </label>
      <InputField
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={!this.context.formValueScope.getValue(checkboxName)}
        ref={(component) => { this.inputField = component }} />
    </div>
  }
}

export default formField()(SelectableInputFieldRaw)
