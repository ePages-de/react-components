import PropTypes from 'prop-types'
import React from 'react'

import BaseField from './BaseField'
import InputField from './InputField'
import formField from './formField'

class SelectableInputFieldRaw extends React.Component {
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
    const formValueScope = this.context.instance
    const { value, onChange, name, scopedName, type, title, label, placeholder, ...other } = this.props
    const checkboxName = `${name}Selected`
    const scopedCheckboxName = `${scopedName}Selected`

    return (
      <div {...other}>
        <label title={title}>
          <input
            name={scopedCheckboxName}
            type="checkbox"
            checked={formValueScope.getValue(checkboxName)}
            onChange={(event) => {
              formValueScope.setValue(checkboxName, event.target.checked)

              if (event.target.checked) {
                // Defer so that the browser can enable the input field before trying to focus it.
                window.setTimeout(() => this.inputField.focus(), 0)
              }
            }}
          />
          {label}
        </label>
        <InputField
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={!formValueScope.getValue(checkboxName)}
          ref={(component) => { this.inputField = component }}
        />
      </div>
    )
  }
}

SelectableInputFieldRaw.contextType = BaseField.contextType

export default formField()(SelectableInputFieldRaw)
